import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineGroup, MdLogout } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { FaSearchengin } from "react-icons/fa6";
import Confirmation from "../common/Confirmation";

const Sidebar = ({
  setCreateRoom,
  setJoinRoom,
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
    { icon: MdLogout, name: "Logout" },
  ];
  const [open, setOpen] = useState(true);
  const [tab, setTab] = useState("Search");
  const [message, setMessage] = useState("");
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
        } else setNotify("Logout is unsuccessfull please try again !");
      } catch (err) {
        setNotify("Server error occurred please try again !");
      } finally {
        setLoader(false);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetcher = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_LINK}/userDetails`,
          {
            signal: controller.signal,
            method: "POST",
            credentials: "include",
          },
        );
        const result = await response.json();
        if (result.success) setUserDetails(result.message);
      } catch (err) {
        console.log(err);
        setUserDetails("not found!");
      }
    };
    fetcher();
    return () => controller.abort();
  }, []);

  const handleTab = (name) => {
    setTab(name);
    selectTab(name);
    if (name === "Logout") confirmLogout();
  };

  return (
    <>
      {confirm && <Confirmation message={message} fact={fact} />}
      {open && (
        <div className="h-full w-full bg-black border-r border-gray-800 flex flex-col min-w-0">
          <div className="flex justify-between items-center w-full h-16 sm:h-20 px-3 sm:px-4">
            <p className="bg-gradient-to-r from-purple-700 to-blue-700 font-mono font-bold bg-clip-text text-transparent text-2xl sm:text-3xl truncate">
              NexTalk
            </p>
            <button
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center hover:bg-gray-800 cursor-pointer"
              onClick={() => {
                setOpen(false);
                setAdjust(true);
              }}
            >
              <IoIosArrowBack size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-none px-2 sm:px-3 py-2 space-y-2">
            <button
              onClick={() => setCreateRoom(true)}
              className="bg-[#5725f8] hover:bg-[#6838ff] h-10 w-full flex justify-center items-center rounded-lg cursor-pointer"
            >
              <p className="font-bold text-sm">Create Room</p>
            </button>
            <button
              onClick={() => setJoinRoom(true)}
              className="bg-transparent border border-gray-700 hover:border-indigo-700 hover:bg-indigo-600/10 h-10 w-full flex justify-center items-center rounded-lg cursor-pointer"
            >
              <p className="font-bold text-sm">Join Room</p>
            </button>
            <div className="space-y-1.5 pt-2">
              {list.map(({ icon: Icon, name }) => (
                <button
                  key={name}
                  onClick={() => handleTab(name)}
                  className={`group w-full h-11 sm:h-12 rounded-lg flex items-center gap-2 px-3 cursor-pointer transition-all duration-300 ${tab === name ? "bg-[#3a19a4]" : "hover:bg-[#120833]"} ${name === "Logout" ? "hover:bg-red-950/40" : ""}`}
                >
                  <Icon
                    size={21}
                    className={`${tab === name ? "text-yellow-400" : ""} ${name === "Logout" ? "group-hover:text-red-400" : ""}`}
                  />
                  <p
                    className={`text-sm sm:text-[15px] truncate ${name === "Logout" ? "group-hover:text-red-400" : ""}`}
                  >
                    {name}
                  </p>
                </button>
              ))}
            </div>
          </div>
          <div className="w-full p-2 sm:p-3 bg-black border-t border-gray-900">
            <div className="flex items-center gap-2 sm:gap-3 p-2 border border-gray-700 hover:border-indigo-700 hover:bg-[#120d20] rounded-xl min-w-0">
              <div className="bg-indigo-600 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-white font-semibold shrink-0">
                {userDetails.userName
                  ? userDetails.userName.charAt(0).toUpperCase()
                  : "?"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold truncate">
                  {userDetails.userName}
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs text-green-400">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!open && (
        <div className="bg-black flex flex-col w-full h-full items-center border-r border-gray-700">
          <button
            className="w-9 h-9 sm:w-10 sm:h-10 mt-3 sm:mt-5 rounded-lg flex items-center justify-center hover:bg-gray-800 cursor-pointer"
            onClick={() => {
              setOpen(true);
              setAdjust(false);
            }}
          >
            <IoIosArrowForward size={20} />
          </button>
          <div className="my-2">
            <img
              src="/logo.png"
              className="w-9 h-9 sm:w-11 sm:h-11 object-contain"
            />
          </div>
          <button
            onClick={() => setCreateRoom(true)}
            className="bg-[#5d31ef] mb-2 hover:bg-[#6d43ff] w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-xl font-bold cursor-pointer"
          >
            +
          </button>
          <button
            onClick={() => setJoinRoom(true)}
            className="bg-transparent border border-gray-700 hover:border-indigo-700 hover:bg-indigo-600/10 w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-gray-300 cursor-pointer"
          >
            <span className="text-lg">↗</span>
          </button>
          <div className="mt-2 flex-1 overflow-y-auto scrollbar-none flex flex-col items-center gap-2 w-full px-2">
            {list.map(({ icon: Icon, name }) => (
              <button
                key={name}
                title={name}
                onClick={() => handleTab(name)}
                className={`w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-xl flex items-center justify-center text-gray-300 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ${tab === name ? "bg-[#5d31ef]" : "hover:bg-[#120428]"} ${name === "Logout" ? "hover:text-red-400" : ""}`}
              >
                <Icon size={21} />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
