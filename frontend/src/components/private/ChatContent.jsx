import {useState,useEffect} from "react"

import Friends from "./Friends";
import Messages from "./Messages";
import socket from "./socket";

const ChatContent = ({tab,userDetails})=>{
  const [friend,setFriend] = useState(null);
  const [onlineUser,setOnlineUser] = useState([]);

  useEffect(() => {
    socket.on("onlineUser", (data) => {
      setOnlineUser(data);
    });
    return () => {
      socket.off("onlineUser");
    };
  }, []);

  return(
    <>
    <div className="flex w-full h-full">
      <div className="w-[30%] h-full">
        <Friends tab={tab} setFriend={setFriend} onlineUser={onlineUser} friend={friend} />
      </div>
      <div className="w-[70%] h-full">
        <Messages userDetails={userDetails} friend={friend} setFriend={setFriend} onlineUser={onlineUser} />
      </div>
    </div>
    </>
  )
}

export default ChatContent;