import { CiChat2 } from "react-icons/ci";
import { MdOutlineGroup } from "react-icons/md";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";

const Sidebar = () => {
  const list = [
    { icon: CiChat2, name: "Chats" },
    { icon: MdOutlineGroup, name: "Groups" },
    { icon: MdOutlineGroup, name: "Friends" },
    { icon: IoNotificationsOutline, name: "Notifications" },
    { icon: IoSettingsOutline, name: "Settings" },
  ];
  return (
    <>
      <div className="h-[90%] w-full flex flex-col gap-4 px-2 py-1 border-r border-gray-800">
        <div className="text-left flex justify-start items-center w-full h-20 px-6">
          <img src="logo.png" className="size-10 bg-cover"></img>
          <p className="text-white text-2xl">NexTalk</p>
        </div>
        <button className="bg-[#5d31ef] h-10 w-full rounded-lg ">
          + New Chat
        </button>
        {list.map((tabs) => {
          const Icons = tabs.icon;
          return (
            <div
              key={tabs.name}
              className="rounded-lg  w-full h-12 flex justify-start px-2 items-center transform duration-200 cursor-pointer hover:bg-[#1b073b]"
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
          <GoDotFill size={15} className="text-green-400 animate-ping mr-2" />
          <p>Online</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
