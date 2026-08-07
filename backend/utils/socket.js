//external modules

const { Server } = require("socket.io");

//internal modules

const messages = require("../models/messages");
const friends = require("../models/friends");

let onlineUser = new Map();
let onlineSocket = new Map();

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
    });

    socket.on("message", async (data) => {
      const recieverSocketId = onlineUser.get(data.receiverId);
      const senderId = onlineSocket.get(socket.id);
      const receiverId = data.receiverId;
      const message = data.message;

      const connection = await friends.findOne({
        $or: [
          { user1: senderId, user2: receiverId },
          { user1: receiverId, user2: senderId },
        ],
      });
      if (connection && connection.status === "accepted") {
        const time = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
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
