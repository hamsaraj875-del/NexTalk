import {useState} from "react";
import Friends from "./Friends";
import Sidebar from "./Sidebar";
import Messages from "../private/Messages"
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
          <div className="h-full w-[25%] flex flex-col">
            <Friends />
          </div>
          <div>
            <Messages />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
