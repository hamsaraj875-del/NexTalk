//external modules
import { useState, useEffect } from "react";
import socket from "../private/socket";

//react icons
import { BsFillSendFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { IoArrowBackOutline } from "react-icons/io5";

//internal modules
import Loader from "../common/Loader";

const RoomMessage = ({userData,roomData,roomId}) => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoader(true);
    const fetcher = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_LINK}/chat/room/messages/?roomId=${encodeURIComponent(roomId)}`, {
          signal,
          method: "POST",
          credentials: "include",
        });
        const result = await response.json();
        console.log(result);
        if (result.success) {
          setData(result.message);
          setLoader(false);
        }
      } catch (err) {
        console.log(err);
        setLoader(false);
      } finally {
        setLoader(false);
      }
    };
    fetcher();
    return () => {
      setLoader(false);
      controller.abort();
    };
  }, []);

  useEffect(() => {
    socket.on("roomMessage", (senderId,senderName, message, time) => {
      setData((prevData) => [
        ...prevData,
        {
          senderId: senderId,
          senderName:senderName,
          message: message,
          time: time,
        },
      ]);
    });

    return () => {
      socket.off("roomMessage");
    };
  }, []);
  console.log(data);

  const messageSend = () => {
    if (message.length == 0) {
      console.log("empty");
      return;
    }
    console.log(message);
    socket.emit("roomMessage", {
      senderId:userData.userId,
      roomId:roomId,
      message,
    });

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    setData([
      ...data,
      {
        senderId: userData.userId,
        senderName:userData.userName,
        message: message,
        time: time,
      },
    ]);

    setMessage("");
  };

  return (
    <>
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
            <p className="text-xl">{roomData.name}</p>
          </div>
          
        </div>
        <div className="w-full flex-1 min-h-0 flex bg-cover bg-center ">
          {loader ? (
            <Loader />
          ) : (
            <div className="w-full  h-full overflow-y-scroll scrollbar-none flex flex-col gap-4 px-6 py-6">
              {data
                .map(({ senderId,senderName,  message, time },index) => (
                  <div
                  key={index}
                    className={`${senderId == userData.userId ? "right-1 bg-gradient-to-r from-indigo-800 to-indigo-700 self-end rounded-t-2xl rounded-l-2xl" : "left-1 bg-gray-900 self-start rounded-r-2xl rounded-t-2xl"} max-w-140 px-4 py-2 flex flex-col `}
                  >
                    {senderId != userData.userId && <p className="text-[15px]" >{senderName}</p>}
                    <p className="text-white text-[16px]">{message}</p>
                    <p className="text-xs text-gray-500 right-1 self-end">
                      {time}
                    </p>
                  </div>
                ))}
            </div>
          )}
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
              className="w-full h-full placeholder-gray-700 text-white outline-0"
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
    </>
  );
};

export default RoomMessage;
