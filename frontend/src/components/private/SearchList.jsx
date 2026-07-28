//external modules
import {useState} from "react";


//internal files
import PopNotification from "../common/PopNotification";


const SearchList = ({ friendsList }) => {
  const [err,setErr] = useState("");
  const sendInvitation = async (userId, userName) => {
    try{

    const response = await fetch(`${import.meta.env.VITE_LINK}/invite`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, userName }),
      credentials: "include",
    });
    const result = await response.json();
    setErr(result.message);
    }catch(err){
      console.log(err);
      setErr("Internal server error please try  again later");
    }
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto scrollbar-none p-3 space-y-2">
        {friendsList.map(({ userId, userName, userStatus }) => (
          <div
            key={userId}
            className="w-full transition-all duration-300 bg-gray-700 h-12 rounded-xl flex items-center justify-evenly"
          >
            <p>{userName}</p>
            <button
              onClick={() => sendInvitation(userId, userName)}
              className="cursor-pointer bg-green-400 text-black px-2 py-1 rounded-lg"
            >
              {userStatus === "none" ? "send request" : userStatus}
            </button>
          </div>
        ))}
      </div>
      {err.length!=0 && <PopNotification setNotify={setErr} notify={err} />}
    </>
  );
};

export default SearchList;
