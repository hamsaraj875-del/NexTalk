//external modules
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//internal modules
import Friends from "./Friends";
import Sidebar from "./Sidebar";
import Messages from "../private/Messages";
import ChatContent from "../private/ChatContent";
import Otp from "../public/Otp";
import MainLoader from "../common/MainLoader";
import PopNotification from "../common/PopNotification";
import socket from "../private/socket";
import CreateRoom from "../private/CreateRoom";

const Chat = () => {
  const navigate = useNavigate();
  const [adjust, setAdjust] = useState(false);
  const [notify, setNotify] = useState("");
  const [loader, setLoader] = useState(false);
  const [tab, selectTab] = useState("Search");
  const [userDetails, setUserDetails] = useState("");
  const [createRoom, setCreateRoom] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetcher = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_LINK}/auth/authenticate`,
          {
            signal,
            method: "POST",
            credentials: "include",
          },
        );
        const result = await response.json();
        if (!result.success) {
          navigate("../auth/login");
          return;
        }
        socket.connect();
        socket.once("connect", () => {
          socket.emit("register", result.userId);
        });
      } catch (err) {
        console.log(err);
        if (err.name != "AbortError") {
          navigate("../auth/login");
        }
      }
    };
    fetcher();
    return () => {
      controller.abort();
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div className="h-screen w-screen bg-[#0c021a] text-white">
        {createRoom && <CreateRoom setCreateRoom={setCreateRoom} />}
        <div className="w-full h-full flex ">
          <div
            className={`h-full ${adjust ? " w-[5%]" : "w-[18%]"} transition-all duration-400 ease-in-out flex flex-col justify-between`}
          >
            <Sidebar
              setAdjust={setAdjust}
              setNotify={setNotify}
              setCreateRoom={setCreateRoom}
              setLoader={setLoader}
              selectTab={selectTab}
              setUserDetails={setUserDetails}
              userDetails={userDetails}
            />
          </div>
          <ChatContent
            userDetails={userDetails}
            tab={tab}
            className={`h-full `}
          />
        </div>
        <PopNotification setNotify={setNotify} notify={notify} />
        {loader && <MainLoader />}
      </div>
    </>
  );
};

export default Chat;
