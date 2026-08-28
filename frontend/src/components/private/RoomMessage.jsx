// internal modules

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FiUsers } from "react-icons/fi";

import socket from "./socket";

const RoomMessage = ({ setRoomSidebar }) => {
  const { roomId } = useParams();

  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);

  const messageContainerRef = useRef(null);

  // Join room
  useEffect(() => {
    socket.connect();

    const joinRoom = () => {
      console.log("Connected:", socket.id);
      console.log("Joining room:", roomId);

      socket.emit("joinRoom", roomId);
    };

    if (socket.connected) {
      joinRoom();
    } else {
      socket.once("connect", joinRoom);
    }

    return () => {
      socket.off("connect", joinRoom);
      socket.disconnect();
    };
  }, [roomId]);

  // Receive room messages
  useEffect(() => {
    const receiveMessage = (msg) => {
      setData((prev) => [...prev, msg]);
    };

    socket.on("roomMessage", receiveMessage);

    return () => {
      socket.off("roomMessage", receiveMessage);
    };
  }, []);

  // Auto scroll
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [data]);

  const sendMessage = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    socket.emit("roomMessage", roomId, trimmedMessage);

    setMessage("");
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#090912] text-white">

      {/* Header */}
      <div className="h-20 shrink-0 px-4 sm:px-6 flex items-center justify-between border-b border-white/10">

        <div className="flex items-center min-w-0">

          {/* Group avatar */}
          <div
            className="
              w-11 h-11 sm:w-12 sm:h-12
              shrink-0
              rounded-full
              bg-gradient-to-br from-purple-600 to-indigo-600
              flex items-center justify-center
              text-lg font-semibold
            "
          >
            G
          </div>

          <div className="ml-3 sm:ml-4 min-w-0">
            <h2 className="text-base sm:text-lg font-semibold truncate">
              Group Name
            </h2>

            <p className="text-xs sm:text-sm text-gray-400">
              5 members
            </p>
          </div>

        </div>

        {/* Members button */}
        <button
          type="button"
          onClick={() => setRoomSidebar(true)}
          className="
            md:hidden
            shrink-0
            ml-3
            p-2.5
            rounded-lg
            text-gray-400
            hover:text-white
            hover:bg-white/10
            transition
            cursor-pointer
          "
        >
          <FiUsers size={21} />
        </button>

      </div>

      {/* Messages */}
      <div
        ref={messageContainerRef}
        className="
          flex-1
          min-h-0
          overflow-y-auto
          scrollbar-none
          px-4 sm:px-6
          py-5
        "
      >

        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            No messages yet
          </div>
        ) : (
          <div className="flex flex-col gap-3">

            {data.map((msg, index) => {

              // Change this according to your actual logged-in user ID
              const isMine = msg.userId === "currentUserId";

              return (
                <div
                  key={index}
                  className={`flex ${
                    isMine ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`
                      max-w-[75%]
                      sm:max-w-[65%]
                      rounded-2xl
                      px-4 py-2.5
                      ${
                        isMine
                          ? "bg-purple-600 rounded-br-md"
                          : "bg-[#151522] border border-white/10 rounded-bl-md"
                      }
                    `}
                  >

                    {/* Sender */}
                    {!isMine && (
                      <p className="text-xs text-purple-400 mb-1">
                        {msg.userName || msg.userId}
                      </p>
                    )}

                    {/* Message */}
                    <p className="text-sm sm:text-base break-words">
                      {msg.message}
                    </p>

                    {/* Time */}
                    {msg.time && (
                      <p className="text-[10px] text-gray-400 mt-1 text-right">
                        {msg.time}
                      </p>
                    )}

                  </div>
                </div>
              );
            })}

          </div>
        )}

      </div>

      {/* Input */}
      <div className="shrink-0 px-3 sm:px-5 py-3 sm:py-4 border-t border-white/10">

        <div className="flex items-center gap-2 sm:gap-3">

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Type a message..."
            className="
              flex-1
              min-w-0
              bg-[#151522]
              border border-white/10
              rounded-xl
              px-4
              py-3
              text-sm sm:text-base
              outline-none
              focus:border-purple-500
              transition
            "
          />

          <button
            type="button"
            onClick={sendMessage}
            className="
              shrink-0
              px-4 sm:px-5
              py-3
              rounded-xl
              bg-purple-600
              hover:bg-purple-700
              transition
              cursor-pointer
              text-sm sm:text-base
            "
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
};

export default RoomMessage;