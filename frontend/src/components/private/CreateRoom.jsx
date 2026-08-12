//react icons
import { FaLock } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";

const CreateRoom = () => {
  return (
    <>
      <div className="fixed inset-0  z-50  items-center justify-center bg-black/50 backdrop-blur-md">
        <div className="flex w-full h-full justify-center items-center">
          <div className="w-90 h-140 px-6 py-6 rounded-xl border border-gray-700 backdrop-blur-3xl">
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
                <label className="text-sm text-gray-300" htmlFor="name">
                  Room Name
                </label>
                <input
                  id="name"
                  className="border w-full h-10 rounded-xl px-2 py-1 border-gray-800 placeholder-gray-500"
                  placeholder="eg:ram"
                ></input>
              </div>
              <div className="flex flex-col">
                <label className=" text-sm text-gray-300" htmlFor="password">
                  Room Password
                </label>
                <input
                  id="password"
                  className="border w-full h-10 rounded-xl px-2 py-1 border-gray-800 placeholder-gray-500 "
                  placeholder="eg:kdjifda9898"
                ></input>
              </div>
              <div className="flex flex-col" >
                <label className="text-sm text-gray-300" id="description">Desciption</label>
                <textarea
                  className="min-w-full min-h-14 max-h-20 rounded-xl px-2 py-2 border border-gray-800 placeholder-gray-500 "
                  placeholder="Chat description"
                ></textarea>
              </div>
            </div>
            <div className="mt-4">
              <p className="mb-3">Room Type</p>
              <div className="flex justify-evenly items-center">
                <div className="flex items-center justify-center w-36 px-4 py-2 gap-4 border-2 border-gray-700 rounded-xl">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#2f0661]">
                    <FaLock />
                  </div>
                  <div>
                    <p>Private</p>
                    <p className="text-xs text-gray-400" >Invite only</p>
                  </div>
                </div>
                <div className="flex items-center w-36 justify-center px-4 py-2 gap-4 border-2 border-gray-700 rounded-xl">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#2f0661]">
                    <BiWorld />
                  </div>
                  <div>
                    <p>Public</p>
                    <p className="text-xs text-gray-400" >Anyone</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-evenly mt-8" >
              <button className="border border-gray-600 hover:bg-red-300/10 transform-color duration-300 cursor-pointer  px-6 py-2 rounded-xl" >Cancel</button>
              <button className=" px-6 py-2 rounded-xl bg-gradient-to-r hover:scale-105 transform-all cursor-pointer duration-300 from-purple-800 to-indigo-800" >Create Room</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateRoom;
