import { useState } from "react";

import { CiChat2 } from "react-icons/ci";
import { MdOutlineGroup } from "react-icons/md";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";

const Sidebar = ({ setAdjust }) => {
  const list = [
    { icon: CiChat2, name: "Chats" },
    { icon: MdOutlineGroup, name: "Groups" },
    { icon: MdOutlineGroup, name: "Friends" },
    { icon: IoNotificationsOutline, name: "Notifications" },
    { icon: IoSettingsOutline, name: "Settings" },
  ];
  const [open, setOpen] = useState(true);
  const [tab, setTab] = useState("Chats");
  return (
    <>
      {open && (
        <>
          <div className="h-[90%] bg-black w-full flex flex-col gap-4 px-2 py-1 border-r border-gray-800">
            <div className="flex justify-between items-center w-full h-20 px-2">
              <div className="w-fit flex ">
                <img src="logo.png" className="size-10 bg-cover"></img>
                <p className="text-white text-2xl">NexTalk</p>
              </div>
              <button
                className="cursor-pointer"
                onClick={(e) => {
                  (setOpen(false), setAdjust(true));
                }}
              >
                <IoIosArrowBack size={20} />
              </button>
            </div>
            <button className="bg-[#5d31ef] h-10 w-full flex justify-center items-center rounded-lg">
              <span className="text-xl px-1 text-center mb-1 font-bold">+</span><p className="font-bold" >New Chat</p>
            </button>
            {list.map((tabs) => {
              const Icons = tabs.icon;
              return (
                <div
                  key={tabs.name}
                  className="rounded-lg  w-full h-12 flex justify-start px-2 items-center transform duration-300 cursor-pointer hover:bg-[#1b073b]"
                >
                  <Icons className="mr-1" />
                  <p>{tabs.name}</p>
                </div>
              );
            })}
          </div>
          <div className="h-[10%] w-full flex flex-col px-4 border-r border-t  py-4 border-gray-800">
            <p>Hamsaraj V C</p>
            <div className="flex justify-start items-center">
              <GoDotFill
                size={15}
                className="text-green-400 animate-ping mr-2"
              />
              <p>Online</p>
            </div>
          </div>
        </>
      )}
      {!open && (
        <>
          <div className="bg-black flex flex-col group gap-4 w-full h-full items-center border-r border-gray-700">
            <div className=" mt-8 group-hover:hidden h-15">
              <img src="/logo.png" className="w-12 h-12 object-contain" />
            </div>
            <button className="hidden w-full h-15 mt-8 justify-center items-center cursor-pointer group-hover:flex " 
            onClick={()=>{
              setOpen(true);
              setAdjust(false)}
              } >
              <IoIosArrowForward size={20} /></button>
            <button className="bg-[#5d31ef] mb-2 h-8 text-center w-8 rounded-lg text-xl font-bold">
              + 
            </button>
            {list.map(({ icon: Icon, name }) => (
              <button
                key={name}
                onClick={() => setTab(name)}
                className={`
                  ${tab === name ? "bg-[#5d31ef]" : "hover:bg-[#220453]"}
                  w-12 h-12
                  rounded-2xl
                  flex items-center justify-center
                  text-gray-300
                  transition-all duration-300
                  hover:scale-110
                  active:scale-95
                `}
              >
                <Icon size={24} />
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
