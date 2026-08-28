//external modules
import { useState } from "react";
import {useNavigate} from "react-router-dom";

//react icons
import { FaLock } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

//internal modules
import PopNotification from "../common/PopNotification";
import MainLoader from "../common/MainLoader";

const CreateRoom = ({ setCreateRoom }) => {
  const navigate = useNavigate();
  const [loader,setLoader] = useState(false);
  const [form, setForm] = useState({
    "name": "",
    "password": "",
    "description": "",
    "type": "private",
  });
  const [err, setErr] = useState({});
  const [notify, setNotify] = useState("");

  const roomCreator = async (e) => {
    setLoader(true);
    e.preventDefault();
    console.log(form);
    try {
      const response = await fetch(`${import.meta.env.VITE_LINK}/room`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        method: "POST",
        body: JSON.stringify(form),
      });
      const result = await response.json();
      console.log(result);
      setLoader(false);
      if (result.success) {
        navigate(`room/${result.roomId}`);
      } else {
        setErr(result.message);
      }
    } catch (err) {
      setLoader(false);
      console.log(err);
      setNotify("Internal server error occured please try again");
    }finally{
      setLoader(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0  z-50  items-center justify-center bg-black/50 backdrop-blur-md">
        <div className="flex w-full h-full justify-center items-center">
          <form
            onSubmit={roomCreator}
            className="w-90 h-fit px-6 py-6 rounded-lg border border-gray-700 backdrop-blur-3xl"
          >
            <span className="fixed right-0 top-0 m-4 w-fit h-fit">
              <RxCross2
                onClick={() => setCreateRoom(false)}
                className="text-xl hover:bg-gray-800 px-1 py-1 rounded-sm"
              />
            </span>
            <div className="mb-1">
              <p className="text-white text-xl w-fit h-fit">Create Room</p>
            </div>
            <div className="mb-6">
              <p className="text-gray-600 text-xs">
                Create a space and invite your friends to chat
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-1" htmlFor="name">
                  Room Name
                </label>
                <input
                  id="name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value.trim() })
                  }
                  className="border w-full h-10 rounded-lg px-2 py-1 border-gray-800 placeholder-gray-500"
                  required
                  placeholder="eg:ram"
                ></input>
                {err && err.name && (
                  <p className="text-red-500 ">{err.name}</p>
                )}
              </div>
              {form.type === "private" && (
                <div className="flex flex-col">
                  <label
                    className=" text-sm mb-1 text-gray-300"
                    htmlFor="password"
                  >
                    Room Password
                  </label>
                  <input
                    id="password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value.trim() })
                    }
                    className="border w-full h-10 rounded-lg px-2 py-1 border-gray-800 placeholder-gray-500 "
                    required
                    placeholder="eg:kdjifda9898"
                  ></input>
                  {err && err.password && (
                    <p className="text-red-500 ">{err.name}</p>
                  )}
                </div>
              )}
              <div className="flex flex-col">
                <label className="text-sm mb-1 text-gray-300" id="description">
                  Desciption (optional)
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="min-w-full min-h-14 max-h-20 rounded-lg px-2 py-2 border border-gray-800 placeholder-gray-500 "
                  placeholder="Chat description"
                  required
                ></textarea>
                {err && err.description && (
                  <p className="text-red-500 ">{err.name}</p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <p className="mb-3">Room Type</p>
              <div className="flex justify-evenly items-center">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, type: "private" })}
                  className={`flex items-center justify-center w-36 px-4 py-2 gap-4 border-2 ${form.type == "private" ? "border-indigo-400  bg-gradient-to-br from-purple-800 to-blue-800" : "border-gray-700"}  rounded-xl cursor-pointer`}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#2f0661]">
                    <FaLock />
                  </div>
                  <div>
                    <p>Private</p>
                    <p className="text-xs text-gray-400">Invite only</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, type: "public" })}
                  className={`flex items-center justify-center w-36 px-4 py-2 gap-4 border-2 ${form.type == "public" ? "border-indigo-400  bg-gradient-to-br from-purple-800 to-blue-800" : "border-gray-700"}  rounded-xl cursor-pointer`}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#2f0661]">
                    <BiWorld />
                  </div>
                  <div>
                    <p>Public</p>
                    <p className="text-xs text-gray-400">Anyone</p>
                  </div>
                </button>
              </div>
              {err && err.type && (
                <p className="text-red-500 ">{err.name}</p>
              )}
            </div>
            <div className="flex items-center justify-evenly mt-8">
              <button
                onClick={() => setCreateRoom(false)}
                className="border border-gray-600 hover:bg-red-300/10 transform-color duration-300 cursor-pointer  px-6 py-2 rounded-xl"
              >
                Cancel
              </button>
              <button className=" px-6 py-2 rounded-xl bg-gradient-to-r hover:scale-105 transform-all cursor-pointer duration-300 from-purple-800 to-indigo-800">
                Create Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateRoom;
