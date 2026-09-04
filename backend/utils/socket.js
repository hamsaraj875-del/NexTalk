//external modules

const { Server } = require("socket.io");

//internal modules

const messages = require("../models/messages");
const roomMessages = require("../models/roomMessages");
const friends = require("../models/friends");
const room = require("../models/room");
const database = require("../models/database");

let onlineUser = new Map();
let onlineSocket = new Map();
let onlineGroupUser = new Map();

//Live time shower

const timeSetter = () => {
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return time;
};

server = async (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
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
        const time = timeSetter();
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
        if (data.users.includes(userId)) {
          const userName = await database.findById(userId);
          onlineGroupUser.set(userId, { roomId, userName: userName.name });
          console.log("online group users are :", onlineGroupUser.keys());
          io.to(roomId).emit("onlineGroupUser", [...onlineGroupUser.values()]);
        }
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("roomMessage", async ({senderId, roomId, message}) => {
      try {
        console.log(message);
        const data = await room.findById(roomId);
        const groupUser = onlineGroupUser.get(senderId);
        if(!groupUser.userName){
          return;
        }
        if (data && data.users.includes(senderId)) {
          const time = timeSetter();
          const userName = groupUser.userName;
          const details = new roomMessages({roomId,senderId,senderName,message,time});
          await details.save();
          socket.to(roomId).emit("roomMessage", senderId,senderName,message,time);
        }
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUser) {
        if (socketId === socket.id) {
          onlineUser.delete(userId);
          break;
        }
      }
    });
  });
};

module.exports = server;
