//react icons
import { MdBlock } from "react-icons/md";


//external modules 

import {useNavigate} from "react-router-dom";

const RoomSidebar = ({ roomData, groupList,userData }) => {
  const avatarColors = {
    A: "bg-[#155E75]",
    B: "bg-[#1E40AF]",
    C: "bg-[#5B21B6]",
    D: "bg-[#9D174D]",
    E: "bg-[#9A3412]",
    F: "bg-[#0F766E]",
    G: "bg-[#166534]",
    H: "bg-[#4338CA]",
    I: "bg-[#6B21A8]",
    J: "bg-[#BE123C]",
    K: "bg-[#0369A1]",
    L: "bg-[#4D7C0F]",
    M: "bg-[#86198F]",
    N: "bg-[#6D28D9]",
    O: "bg-[#B45309]",
    P: "bg-[#1D4ED8]",
    Q: "bg-[#9D174D]",
    R: "bg-[#7E22CE]",
    S: "bg-[#0E7490]",
    T: "bg-[#047857]",
    U: "bg-[#BE123C]",
    V: "bg-[#C2410C]",
    W: "bg-[#3730A3]",
    X: "bg-[#0E7490]",
    Y: "bg-[#86198F]",
    Z: "bg-[#15803D]",
  };
  const navigate = useNavigate();

  const blockHandler=async({userId})=>{
    const response = await fetch(`${import.meta.env.VITE_LINK}/block/id=${encodeURIComponent(userId)}`,{
      method:"POST",
      credentials:"include",
    });
    const result = await response.json();
    if(result){
      groupList.filter(user=>user.userId!=userId);
      if(userData.userId==userId){
        navigate("../../");
      }
    }
  }

  return (
    <div className="flex flex-col h-full gap-4 p-4 bg-[#0a0a12]">
      <div className="pb-4 border-b border-white/10">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Nex<span className="text-purple-500">Talk</span>
        </h1>
        <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">
          Room Members
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#11111b] p-5 shadow-xl shrink-0">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />

        <div className="relative mb-4">
          <h2 className="text-xl font-bold text-white truncate">
            {roomData?.name?.toUpperCase()}
          </h2>
        </div>

        <div className="relative space-y-2.5">
          <div className="rounded-xl border border-purple-500/20 bg-purple-500/10 px-3 py-2.5 flex items-center justify-between gap-2">
            <span className="text-[10px] font-semibold text-purple-400/80 uppercase tracking-wide shrink-0">
              Room Type
            </span>
            <span className="text-xs font-bold text-purple-300 truncate">
              {roomData?.type?.toUpperCase()}
            </span>
          </div>

          <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-3 py-2.5 flex items-start justify-between gap-2">
            <span className="text-[10px] font-semibold text-blue-400/80 uppercase tracking-wide shrink-0 pt-0.5">
              Description
            </span>
            <span className="text-xs text-blue-300 text-right leading-relaxed">
              {roomData?.description?.toUpperCase() ||
                "No description available"}
            </span>
          </div>

          <div className="rounded-xl border border-pink-500/20 bg-pink-500/10 px-3 py-2.5 flex items-center justify-between gap-2">
            <span className="text-[10px] font-semibold text-pink-400/80 uppercase tracking-wide shrink-0">
              Owner
            </span>
            <span className="text-xs font-bold text-pink-300 truncate">
              {roomData?.ownerName?.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
      {groupList.length !== 0 ? (
        <div className="flex flex-col overflow-y-auto scrollbar-none space-y-2 pr-1">
          {groupList.map(({ userId, userName, roomId }, index) => (
            <div
              key={userId ?? index}
              className={`group flex items-center gap-3 p-3 rounded-xl 
              ${
                userId == roomData.owner
                  ? "bg-gradient-to-r from-amber-950/70 to-amber-900 border border-amber-500/60 shadow-md shadow-amber-900/30"
                  : "bg-gradient-to-r from-indigo-950/70 to-indigo-950 border border-indigo-600/60 shadow-md shadow-indigo-900/30"
              }`}
            >
              <div className="relative shrink-0">
                <div
                  className={`${avatarColors[userName?.charAt(0)?.toUpperCase()] ?? "bg-gray-600"}
                  text-center flex rounded-xl w-10 h-10 font-bold
                  items-center justify-center text-white text-sm
                  ring-2 ring-white/10`}
                >
                  {userName?.charAt(0)?.toUpperCase() ?? "?"}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-[#0a0a12]" />
              </div>

              <div className="flex-1 overflow-hidden">
                <h2 className="font-semibold text-white text-sm flex items-center gap-2 truncate">
                  <span className="truncate">{userName}</span>
                  {userId == roomData.owner && (
                    <span className="shrink-0 text-[9px] font-bold uppercase tracking-wide bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">
                      Owner
                    </span>
                  )}
                  {userId != roomData.owner && (
                    <span className="cursor-pointer shrink-0 text-[9px] font-bold uppercase tracking-wide flex bg-red-800/20 text-amber-300 px-2 py-0.5 rounded-full items-center justify-center gap-1 text-red-400"><MdBlock className="" />
                      block
                    </span>
                  )}
                </h2>
                <p className="text-[10px] text-gray-500">Active now</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 py-10 px-4 text-center flex-1">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-indigo-950/70 border border-indigo-600/40 text-indigo-300 text-xl">
            🙁
          </div>
          <p className="text-sm text-white/60">No one's here right now</p>
          <p className="text-xs text-white/30">
            Users will show up here once they join the room
          </p>
        </div>
      )}
    </div>
  );
};

export default RoomSidebar;
