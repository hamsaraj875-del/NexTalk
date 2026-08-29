//internal modules
import RoomSidebar from "../private/RoomSidebar";
import RoomMessage from "../private/RoomMessage";
import socket from "../private/socket";
import MainLoader from "../common/MainLoader";


//external modules

import {useEffect,useState} from "react";
import {useNavigate,useParams} from "react-router-dom";

const ChatRoom = () => {
  
   const {roomId} = useParams();
  const [roomData,setRoomData] = useState({});
  const [groupList,setGroupList] = useState([]);
  const [loader,setLoader] = useState(true);
  
  const navigate = useNavigate();
  useEffect(()=>{
   const controller = new AbortController();
   const signal = controller.signal;
   const fetcher=async()=>{
    setLoader(true);
    try{
      const response = await fetch(`${import.meta.env.VITE_LINK}chat/room/auth/roomAuthenticate`,{
        signal,
        method:"POST",
        credentials:"include",
        body:JSON.stringify(roomId),
      })
      const result = await response.json();
      console.log(result);
      if(!result.success){
        navigate("../../");
      }else{
        setRoomData(result.message);
      }
      setLoader(false);
      socket.connect();
      socket.once("connect",()=>{
        socket.emit("joinRoom");
      })

      socket.on("roomOnline",(data)=>{
        setGroupList(data);
      })
      
    }catch(err){
      console.log(err);
      setLoader(false);
      if(err.name!="AbortError"){
        navigate("../../");
        controller.abort();
      }
    }finally{
      setLoader(false);
    }
   }
    fetcher();
  })
  return (
    <div className="w-full h-screen flex overflow-hidden bg-[#090912]">

      <div className="w-72 shrink-0 h-full border-r border-white/10">
        <RoomSidebar roomData={roomData} groupList={groupList} setGroupList={setGroupList} />
      </div>

      <div className="flex-1 min-w-0 h-full">
        <RoomMessage />
      </div>

    </div>
  );
};

export default ChatRoom;
