import {useState} from "react";
import Friends from "./Friends";
import Sidebar from "./Sidebar";
import Messages from "../private/Messages";
import ChatContent from "../private/ChatContent";
import Otp from "../public/Otp";

const Chat = () => {
  const [adjust,setAdjust] = useState(false);
  return (
    <>
      <div className="h-screen w-screen bg-[#0c021a] text-white">
        <div className="w-full h-full flex ">
          <div className={`h-full ${adjust?' w-[5%]':'w-[18%]'} transition-all duration-400 ease-in-out flex flex-col justify-between`}>
            <Sidebar setAdjust={setAdjust} />
          </div>
          <ChatContent className={`h-full `} />
        </div>
      </div>
    </>
  );
};

export default Chat;
