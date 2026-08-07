//external modules
import { useState, useEffect } from "react";
import socket from "../private/socket";

//react icons
import { BsFillSendFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { IoArrowBackOutline } from "react-icons/io5";

const Messages = ({ userDetails,friend, setFriend }) => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    socket.on("message", (friendId,senderId,msg, time) => {
      setData([...data, {friendId:friendId,senderId:senderId, sender: false, message: msg, time: time }]);
      console.log(msg,time);
    });

    return () => {
      socket.off("message");
    };
  },[]);

  const messageSend = () => {
    socket.emit("message", {
      recieverId: friend.id,
      senderId:userDetails,
      message,
    });

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    setData([
      ...data,
      { friendId: friend.id,senderId:userDetails,sender: true, message: message, time: time },
    ]);

    setMessage("");
  };

  return (
    <>
      {!friend ? (
        <div className="w-full h-full flex flex-col">
          <div className="w-full] h-[100%] bg-gray-950 flex items-center justify-center overflow-hidden">
            <img
              src="/messageLogo.png"
              alt="Welcome"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      ) : (
        <div
          className="w-full h-full bg-cover flex flex-col"
          style={{
            backgroundImage: "url('/chatBackground.png')",
          }}
        >
          <div className="w-full  h-[8%] flex justify-between px-6 items-center bg-black border-b border-gray-800">
            <div className="flex  justify-center items-center">
              <IoArrowBackOutline
                className="mr-2 cursor-pointer"
                onClick={() => setFriend(null)}
              />
              <p className="text-xl">{friend.name}</p>
            </div>
            <p>Online</p>
          </div>
          <div className="w-full flex-1 min-h-0 flex bg-cover bg-center ">
            <div className="w-full h-full overflow-y-scroll scrollbar-none flex flex-col gap-4 px-6 py-6">
              {data
                .filter((msg) => msg.friendId === friend.id)
                .map(({ sender, message, time }) => (
                  <div
                    className={`${sender ? "right-1 bg-gradient-to-r from-indigo-800 to-indigo-700 self-end rounded-l-2xl rounded-b-2xl" : "left-1 bg-gray-900 self-start rounded-r-2xl rounded-b-2xl"} max-w-140 px-4 py-2 flex flex-col `}
                  >
                    <p className="text-white-400 text-lg font-mono">
                      {message}
                    </p>
                    <p className="text-xs text-gray-400 right-1 self-end">
                      {time}
                    </p>
                  </div>
                ))}
            </div>
          </div>
          <div className="w-full h-26 px-6 py-2">
            <div className=" h-15 px-4 py-2 bg-black border border-gray-800 rounded-2xl flex justify-center items-center">
              <FaPlus
                size={25}
                className=" cursor-pointer mr-4 text-gray-400 hover:text-white"
              />
              <input
                value={message}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    messageSend();
                  }
                }}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-full placeholder-gray-700 outline-0"
                placeholder="Messages"
              ></input>
              <button>
                <BsFillSendFill
                  onClick={messageSend}
                  size={25}
                  className="text-gray-400 cursor-pointer hover:text-white ml-4"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Messages;
