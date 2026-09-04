//internal modules
import RoomSidebar from "../private/RoomSidebar";
import RoomMessage from "../private/RoomMessage";
import socket from "../private/socket";
import MainLoader from "../common/MainLoader";

//external modules

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ChatRoom = () => {
  const { roomId } = useParams();
  const [roomData, setRoomData] = useState({});
  const [userData, setUserData] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [loader, setLoader] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetcher = async () => {
      setLoader(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_LINK}/chat/room/auth/roomAuthenticate`,
          {
            signal,
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ roomId: roomId }),
          },
        );
        const response1 = await fetch(
          `${import.meta.env.VITE_LINK}/chat/room/userDetails`,
          {
            signal,
            method: "POST",
            credentials: "include",
          },
        );
        const result = await response.json();
        const result1 = await response1.json();
        console.log(result1);
        if (result1.success) {
          setUserData(result1.message);
        }
        if (!result.success || !result1.success) {
          navigate("../../");
        } else {
          setRoomData(result.message);
          socket.connect();
          if (socket.connected) {
            socket.emit("joinRoom", roomId, result.message.userId);
          } else {
            socket.connect();
            socket.once("connect", () => {
              socket.emit("joinRoom", roomId, result.message.userId);
            });
          }
        }
        setLoader(false);

        socket.on("onlineGroupUser", (data) => {
          setGroupList(data);
          console.log(data);
        });
      } catch (err) {
        console.log(err);
        setLoader(false);
        if (err.name != "AbortError") {
          navigate("../../");
          controller.abort();
        }
      } finally {
        setLoader(false);
      }
    };
    fetcher();
  }, []);

  return (
    <div className="w-full h-screen flex overflow-hidden bg-[#090912]">
      <div className="w-72 shrink-0 h-full border-r border-white/10">
        <RoomSidebar
          roomData={roomData}
          groupList={groupList}
          setGroupList={setGroupList}
        />
      </div>

      <div className="flex-1 min-w-0 h-full">
        <RoomMessage userData={userData} roomData={roomData} roomId={roomId} />
      </div>
    </div>
  );
};

export default ChatRoom;
