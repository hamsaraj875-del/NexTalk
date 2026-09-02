//external modules
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

//internal modules
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";

const JoinRoom = ({ setJoinRoom }) => {
  const navigate = useNavigate();
  const [groupList, setGroupList] = useState([]);
  const [search, setSearch] = useState("");
  const [password,setPassword] = useState("");
  const [err,setErr] = useState("");
  const [loader, setLoader] = useState(false);

  const find=async(searchValue)=>{
    if(searchValue.length==0){
      setGroupList([]);
      setLoader(false);
      return;
    }
    setLoader(true);
  
    try{
      const response = await fetch(`${import.meta.env.VITE_LINK}/chat/room/search?name=${encodeURIComponent(searchValue.trim())}`,{
        credentials:"include",
      })
      const result = await response.json();
      if(result.success){
        setGroupList(result.message);
      }else{
        setGroupList([]);
      }
      setLoader(false);
    }catch(err){
      console.log(err);
      setGroupList([]);
      setLoader(false);
    }finally{
      setLoader(false);
    }
  }


  const requestGroup = async(group,password="")=>{
    let data={};
    if(password){
      data = {...group,password}
    }else{
      data = {...group}
    }
    setLoader(true);
    try{
      const response = await fetch(`${import.meta.env.VITE_LINK}/chat/room/join`,{
        headers:{'Content-Type':"application/json"},
        credentials:"include",
        method:"POST",
        body:JSON.stringify(data),
      })

      const result = await response.json();
      console.log(result);
      if(result.success){
        navigate(`/chat/room/${result.roomId}`);
      }else{
        setErr(result.message);
      }
      setLoader(false);
    }catch(err){
      console.log(err);
      setLoader(false);
      setErr("internal server error please try again !");
    }finally{
      setLoader(false);
    }
  }

  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-[380px] rounded-2xl border border-gray-700 bg-[#0d0b16] shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
          <h2 className="text-lg font-semibold text-white">Join Room</h2>
          <button
            onClick={() => setJoinRoom(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="p-4">
          <input
            type="text"
            value = {search}
            onChange={(e)=>{
              setSearch(e.target.value);
              find(e.target.value);
            }}
            placeholder="Search rooms..."
            className="w-full rounded-xl border border-gray-700 bg-[#080017] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-indigo-500"
          />
        </div>

        {err && <ErrorMessage message={err} />}

        {loader?<Loader />:

        <div className="max-h-[350px] space-y-2 overflow-y-auto px-4 pb-4 scrollbar-none">
          {groupList?.map((group) => (
            <div
              key={group._id}
              className="group rounded-2xl border border-gray-800 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-4 transition-all duration-200 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-purple-900/10"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-base font-bold text-white shadow-lg shadow-purple-900/20">
                    {group.name?.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-white">
                      {group.name}
                    </h3>

                    <div className="mt-1 flex items-center gap-2">
                      <span
                        className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${
                          group.type === "private"
                            ? "bg-red-500/10 text-red-400"
                            : "bg-green-500/10 text-green-400"
                        }`}
                      >
                        {group.type === "private" ? "🔒 Private" : "🌐 Public"}
                      </span>
                    </div>
                  </div>
                </div>

                {group.type=="public" && <button
                  onClick={() => {requestGroup(group)}}
                  className="shrink-0 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-purple-900/20 transition hover:from-purple-500 hover:to-indigo-500 active:scale-95"
                >
                  Join
                </button>}
              </div>

              {group.description && (
                <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-gray-400">
                  {group.description}
                </p>
              )}

              {group.type === "private" && (
                <div className="mt-4 border-t border-gray-800/80 pt-3">
                  <label className="mb-1.5 block text-[11px] font-medium text-gray-400">
                    🔐 Room password
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="password"
                      onChange={(e)=>setPassword(e.target.value)}
                      value = {password}
                      placeholder="Enter password"
                      className="min-w-0 flex-1 rounded-lg border border-gray-700 bg-black/30 px-3 py-2 text-xs text-white outline-none placeholder:text-gray-600 transition focus:border-purple-500 focus:ring-1 focus:ring-purple-500/40"
                    />

                    <button
                      onClick={() => {requestGroup(group,password)}}
                      className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-2 text-xs font-medium text-purple-300 transition hover:bg-purple-500/20"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>}
      </div>
    </div>
  );
};

export default JoinRoom;
