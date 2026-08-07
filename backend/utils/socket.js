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
    console.log("User connected:", socket.id);

    socket.on("register", (userId) => {
      onlineUser.set(userId, socket.id);
      onlineSocket.set(socket.id, userId);
    });

    socket.on("message", async (data) => {
      const recieverSocketId = onlineUser.get(data.recieverId);
      const senderId = onlineSocket.get(socket.id);
      const recieverId = data.recieverId;
      const message = data.message;

      const connection = await friends.findOne({
        $or: [
          { user1: senderId, user2: recieverId },
          { user1: recieverId, user2: senderId },
        ],
      });
      if (connection && connection.status==="accepted") {
        const time = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        if (recieverSocketId) {
          io.to(recieverSocketId).emit("message",recieverId,senderId, message, time);
          const details = new messages({
            senderId,
            recieverId,
            message,
            time,
            status: "sent",
          });
          await details.save();
        } else {
          const details = new messages({
            senderId,
            recieverId,
            message,
            time,
            status: "pending",
          });
          await details.save();
        }
      }
    });

    console.log("online users are ", onlineUser);

    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUser) {
        if (socketId === socket.id) {
          onlineUser.delete(userId);
          break;
        }
      }

      console.log("online users are");
      console.log(onlineUser);

      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = server;
