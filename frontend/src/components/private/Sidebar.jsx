//external modules
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//react icons
import { CiChat2 } from "react-icons/ci";
import { MdOutlineGroup } from "react-icons/md";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdLogout } from "react-icons/md";

//react files
import Confirmation from "../common/Confirmation";

const Sidebar = ({ selectTab, setAdjust, setLoader, setNotify }) => {
  const navigate = useNavigate();
  const list = [
    { icon: CiChat2, name: "Chats" },
    { icon: MdOutlineGroup, name: "Friends" },
    { icon: IoNotificationsOutline, name: "Notifications" },
    { icon: IoSettingsOutline, name: "Settings" },
  ];
  const [open, setOpen] = useState(true);
  const [tab, setTab] = useState("Chats");
  const [confirm, setConfirm] = useState(false);

  //logout

  const confirmLogout = () => {
    setConfirm(true);
  };

  const logout = async (confirmation) => {
    setConfirm(false);
    if (confirmation) {
      try {
        setLoader(true);
        const response = await fetch(
          `${import.meta.env.VITE_LINK}/auth/logout`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          },
        );
        const result = await response.json();
        if (result.success) {
          sessionStorage.removeItem("user");
          navigate("/auth/login");
        } else {
          setNotify("Logout is unsuccessfull please try again !");
        }
      } catch (err) {
        setNotify("Server error occurred please try again !");
      } finally {
        setLoader(false);
      }
    }
  };

  return (
    <>
      {confirm && (
        <Confirmation
          message={"Are you sure you want to log out?"}
          logout={logout}
        />
      )}
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
            <button className="bg-[#5d31ef] h-10 w-full flex justify-center cursor-pointer items-center rounded-lg">
              <span className="text-xl px-1 text-center mb-1 font-bold">+</span>
              <p className="font-bold">New Chat</p>
            </button>
            {list.map(({ icon: Icon, name }) => {
              return (
                <div
                  onClick={() => {
                    setTab(name);
                    selectTab(name);
                  }}
                  key={name}
                  className={`rounded-lg 
                  ${tab === name ? "bg-[#5d31ef]" : "hover:bg-[#120428]"}  w-full h-12 flex justify-start px-2 items-center transform duration-300 cursor-pointer`}
                >
                  <Icon className="mr-1" />
                  <p>{name}</p>
                </div>
              );
            })}
            <button
              onClick={confirmLogout}
              className="hover:bg-[#1d0303] text-red-300 rounded-lg w-full h-12 flex justify-start px-2 items-center transform duration-300 cursor-pointer"
            >
              <MdLogout className="mr-1" />
              <p>Logout</p>
            </button>
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
            <button
              className="hidden w-full h-fit mt-8 justify-center items-center cursor-pointer group-hover:flex "
              onClick={() => {
                setOpen(true);
                setAdjust(false);
              }}
            >
              <IoIosArrowForward size={20} />
            </button>
            <button className="bg-[#5d31ef] h-8 flex items-center justify-center text-center w-8 rounded-lg text-xl font-bold">
              <span>+</span>
            </button>
            {list.map(({ icon: Icon, name }) => (
              <button
                key={name}
                onClick={() => {
                  setTab(name);
                  selectTab(name);
                }}
                className={`
                  ${tab === name ? "bg-[#5d31ef]" : "hover:bg-[#120428"}
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
