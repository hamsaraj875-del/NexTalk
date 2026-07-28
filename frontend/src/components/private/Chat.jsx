//external modules
import { useState } from "react";

//internal modules
import Friends from "./Friends";
import Sidebar from "./Sidebar";
import Messages from "../private/Messages";
import ChatContent from "../private/ChatContent";
import Otp from "../public/Otp";
import MainLoader from "../common/MainLoader";
import PopNotification from "../common/PopNotification";

const Chat = () => {
  const [adjust, setAdjust] = useState(false);
  const [notify, setNotify] = useState("");
  const [loader, setLoader] = useState(false);
  const [tab, selectTab] = useState("Chats");
  const showNotification = () => {
    setTimeout(() => {
      setNotify("");
    }, 10000);
  };
  if (notify.length != 0) {
    showNotification();
  }
  return (
    <>
      <div className="h-screen w-screen bg-[#0c021a] text-white">
        <div className="w-full h-full flex ">
          <div
            className={`h-full ${adjust ? " w-[5%]" : "w-[18%]"} transition-all duration-400 ease-in-out flex flex-col justify-between`}
          >
            <Sidebar
              setAdjust={setAdjust}
              setNotify={setNotify}
              setLoader={setLoader}
              selectTab={selectTab}
            />
          </div>
          <ChatContent tab={tab} className={`h-full `} />
        </div>
        <PopNotification notify={notify} />
        {loader && <MainLoader />}
      </div>
    </>
  );
};

export default Chat;
