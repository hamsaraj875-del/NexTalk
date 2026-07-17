import Friends from "./Friends";
import Sidebar from "./Sidebar";

const Chat = () => {
  return (
    <>
      <div className="h-screen w-screen bg-[#0c021a] text-white">
        <div className="w-full h-full flex">
          <div className="h-full w-[18%] flex flex-col justify-between">
            <Sidebar />
          </div>
          <div className="h-full w-[25%] flex flex-col">
            <Friends />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
