//internal modules
import RoomSidebar from "../private/RoomSidebar";
import RoomMessage from "../private/RoomMessage";
import socket from "../private/socket";


//external modules

import {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";

const ChatRoom = () => {

  const [room ,setRoomSidebar]=useState(false);
  const [groupList,setGroupList] = useState([]);
  
  const navigate = useNavigate();
  useEffect(()=>{
   const controller = new AbortController();
   const signal = controller.signal;
   const fetcher=async()=>{
    try{
      const response = await fetch(`${import.meta.env.VITE_LINK}/auth/roomAuthenticate`,{
        signal,
        method:"POST",
        credentials:"include",
      })
      const result = await response.json();
      if(!result.success){
        navigate("../../");
      }

      socket.connect();
      socket.once("connect",()=>{
        socket.emit("joinRoom");
      })
      
    }catch(err){
      console.log(err);
      if(err.name!="AbortError"){
        navigate("../../");
        controller.abort();
      }
    }
   }
  })
  return (
    <div className="w-full h-screen flex overflow-hidden bg-[#090912]">

      <div className="w-72 shrink-0 h-full border-r border-white/10">
        <RoomSidebar setGroupList={setGroupList} />
      </div>

      <div className="flex-1 min-w-0 h-full">
        <RoomMessage />
      </div>

    </div>
  );
};

export default ChatRoom;
