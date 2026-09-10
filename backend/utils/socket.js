//external modules
const { Server } = require("socket.io");

//internal modules
const messages = require("../models/messages");
const roomMessages = require("../models/roomMessages");
const friends = require("../models/friends");
const room = require("../models/room");
const database = require("../models/database");
const roomBlock = require("../models/roomBlock");

let onlineUser = new Map();
let onlineSocket = new Map();
let onlineGroupUser = new Map();
let onlineGroupSocket = new Map();

server = async (server) => {
  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://nextalk-6d1n.onrender.com",
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("register", (userId) => {
      onlineUser.set(userId, socket.id);
      onlineSocket.set(socket.id, userId);
      io.emit("onlineUser", [...onlineUser.keys()]);
    });

    socket.on("message", async (data) => {
      const recieverSocketId = onlineUser.get(data.receiverId);
      const senderId = onlineSocket.get(socket.id);
      const receiverId = data.receiverId;
      const message = data.message.trim();

      const connection = await friends.findOne({
        $or: [
          { user1: senderId, user2: receiverId },
          { user1: receiverId, user2: senderId },
        ],
      });

      if (connection && connection.status === "accepted") {
        const time = new Date();

        if (recieverSocketId) {
          io.to(recieverSocketId).emit(
            "message",
            senderId,
            receiverId,
            message,
            time,
          );

          const details = new messages({
            senderId,
            receiverId,
            message,
            time,
            status: "sent",
          });

          await details.save();
        } else {
          const details = new messages({
            senderId,
            receiverId,
            message,
            time,
            status: "pending",
          });

          await details.save();
        }
      }
    });

    socket.on("joinRoom", async (roomId, userId) => {
      socket.join(roomId);

      try {
        const data = await room.findById(roomId);

        if (!data) return;

        const blocked = await roomBlock.findOne({
          blocked: userId,
          room: roomId,
        });

        if (data.users.includes(userId) && !blocked) {
          const userName = await database.findById(userId);

          if (!userName) return;

          onlineGroupUser.set(userId, {
            roomId,
            userName: userName.name,
          });

          onlineGroupSocket.set(socket.id, userId);

          const groupUserList = Array.from(
            onlineGroupUser,
            ([userId, value]) => ({ userId, ...value }),
          );

          io.to(roomId).emit("onlineGroupUser", groupUserList);
        }
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("disconnectRoom", ({ roomId }) => {
      const userId = onlineGroupSocket.get(socket.id);

      if (userId && onlineGroupUser.has(userId)) {
        onlineGroupSocket.delete(socket.id);
        onlineGroupUser.delete(userId);

        const groupUserList = Array.from(
          onlineGroupUser,
          ([userId, value]) => ({ userId, ...value }),
        );

        io.to(roomId).emit("onlineGroupUser", groupUserList);
      }
    });

    socket.on("roomMessage", async ({ senderId, roomId, message }) => {
      try {
        const data = await room.findById(roomId);
        const groupUser = onlineGroupUser.get(senderId);

        if (!groupUser || !groupUser.userName) return;

        if (data && data.users.includes(senderId)) {
          const time = new Date();
          const userName = groupUser.userName;

          const details = new roomMessages({
            roomId,
            senderId,
            senderName: userName,
            message,
            time,
          });

          await details.save();

          socket
            .to(roomId)
            .emit("roomMessage", senderId, userName, message, time);
        }
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("disconnect", () => {
      const userId = onlineSocket.get(socket.id);

      if (userId) {
        if (onlineUser.get(userId) === socket.id) {
          onlineUser.delete(userId);
          io.emit("onlineUser", [...onlineUser.keys()]);
        }

        onlineSocket.delete(socket.id);
      }

      const groupUserId = onlineGroupSocket.get(socket.id);

      if (groupUserId && onlineGroupUser.has(groupUserId)) {
        const { roomId } = onlineGroupUser.get(groupUserId);

        onlineGroupSocket.delete(socket.id);
        onlineGroupUser.delete(groupUserId);

        const groupUserList = Array.from(
          onlineGroupUser,
          ([userId, value]) => ({
            userId,
            ...value,
          }),
        );

        io.to(roomId).emit("onlineGroupUser", groupUserList);
      }
    });
  });
};

module.exports = server;