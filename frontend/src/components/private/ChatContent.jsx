import {useState} from "react"

import Friends from "./Friends";
import Messages from "./Messages";

const ChatContent = ()=>{
  const [friend,setFriend] = useState(null);
  return(
    <>
    <div className="flex w-full h-full">
      <div className="w-[30%] h-full">
        <Friends setFriend={setFriend} />
      </div>
      <div className="w-[70%] h-full">
        <Messages friend={friend} setFriend={setFriend} />
      </div>
    </div>
    </>
  )
}

export default ChatContent;