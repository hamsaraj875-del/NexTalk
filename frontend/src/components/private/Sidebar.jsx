//external modules
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//react icons
import { MdOutlineGroup } from "react-icons/md";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { FaSearchengin } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdLogout } from "react-icons/md";

//react files
import Confirmation from "../common/Confirmation";

const Sidebar = ({
  setCreateRoom,
  setUserDetails,
  userDetails,
  selectTab,
  setAdjust,
  setLoader,
  setNotify,
}) => {
  const navigate = useNavigate();
  
  const list = [
    { icon: FaSearchengin, name: "Search" },
    { icon: MdOutlineGroup, name: "Friends" },
    { icon: IoNotificationsOutline, name: "Notifications" },
    { icon: IoSettingsOutline, name: "Settings" },
    {icon:MdLogout,name:"Logout"},
  ];
  const [open, setOpen] = useState(true);
  const [tab, setTab] = useState("Search");
  const [message,setMessage] = useState("");
  const [confirm, setConfirm] = useState(false);


  const confirmLogout = () => {
    setMessage("Are you sure you want to log out ?");
    setConfirm(true);
  };
  

  const fact = async (confirmation) => {
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
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetcher = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_LINK}/userDetails`,
          {
            signal,
            method: "POST",
            credentials: "include",
          },
        );
        const result = await response.json();
        if (result.success) {
          setUserDetails(result.message);
        }
      } catch (err) {
        console.log(err);
        setUserDetails("not found!");
      }
    };
    fetcher();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      {confirm && (
        <Confirmation
          message={message}
          fact={fact}
        />
      )}
      {open && (
        <>
          <div className="h-[90%] bg-black w-full flex flex-col gap-4 px-2 py-1 border-r border-gray-800">
            <div className="flex justify-between items-center w-full h-20 px-2">
              <div className="w-fit flex ">
                <p className="bg-gradient-to-r from-purple-700 to-blue-700 font-mono font-bold bg-clip-text text-transparent text-3xl">NexTalk</p>
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
              <button onClick={()=>setCreateRoom(true)} className="bg-[#5725f8] h-10 w-full flex justify-center cursor-pointer items-center rounded-lg">
                <p className="font-bold text-sm">Create Room</p>
              </button>
              <button className="bg-transparent border border-gray-700 hover:border-indigo-700 hover:bg-indigo-600/10 h-10 w-full flex justify-center cursor-pointer items-center rounded-lg">
                <p className="font-bold text-sm">Join Room</p>
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
                  ${tab === name ? "bg-[#3a19a4] group" : "hover:bg-[#120833]"} ${name=="Logout"?'hover:bg-red-950/40':''} w-full h-12 flex justify-start px-2 items-center transform duration-300 cursor-pointer`}
                >
                  <Icon
                    className={`mr-1 ${name=="Logout"?'group-hover:text-red-400':''} ${tab === name ? "text-yellow-400" : ""}`}
                  />
                  <p className={name=="Logout"?'group-hover:text-red-400':''}>{name}</p>
                </div>
              );
            })}
            
          </div>
          <div className="w-full p-6 bg-black border-r border-gray-800">
            <div className="flex items-center gap-3 p-2 border border-gray-700
                     hover:border-indigo-700 hover:bg-[#120d20] rounded-xl transition-all duration-300">
              <div
                className={`bg-indigo-600 w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold`}
              >
                {userDetails.userName?userDetails.userName.charAt(0).toUpperCase() : '?'}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold truncate">
                  {userDetails.userName}
                </p>

                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>

                  <span className="text-xs text-green-400">Online</span>
                </div>
              </div>
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
            <button className="bg-[#5d31ef] h-11 flex items-center justify-center text-center w-11 rounded-lg text-xl font-bold">
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
