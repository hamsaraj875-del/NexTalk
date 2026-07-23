import { BsFillSendFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { IoArrowBackOutline } from "react-icons/io5";

const Messages = ({ friend,setFriend }) => {
  return (
    <>
      {!friend ? (
        <div className="w-full h-full flex flex-col">
          <div className="w-full] h-[100%] bg-gray-950 flex items-center justify-center overflow-hidden">
            <img
              src="/messageLogo.png"
              alt="Welcome"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col" style={{
            backgroundImage: "url('/chatBackground.png')",
          }} >
          <div className="w-full  h-[8%] flex justify-between px-6 items-center bg-black border-b border-gray-800">
            <div className="flex  justify-center items-center" >
              <IoArrowBackOutline className="mr-2" onClick={()=>setFriend(null)} />
              <p className="text-xl">{friend}</p>
            </div>
            <p>Online</p>
          </div>
          <div className="w-full h-[90%] flex bg-cover bg-center " >
          </div>
          <div className="w-full h-26 px-6 py-2">
            <div className=" h-15 px-4 py-2 bg-black border border-gray-800 rounded-2xl flex justify-center items-center">
              <FaPlus size={25} className="mr-4 text-gray-400" />
              <input
                className="w-full h-full placeholder-gray-700 outline-0"
                placeholder="Messages"
              ></input>
              <BsFillSendFill size={25} className="text-gray-400 hover:cursor-pointer hover:text-white ml-4" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Messages;
