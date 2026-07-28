//external modules
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//internal modules
import FriendsList from "./FriendsList";
import SearchList from "./SearchList";

//react icons
import { MdOutlineAccountCircle } from "react-icons/md";

const Friends = ({ tab, setFriend }) => {
  const [friendsList, setFriendsList] = useState([]);
  const [search, setSearch] = useState([]);

  console.log(tab);

  useEffect(() => {
    if (tab === "Friends") {
      const controller = new AbortController();
      const signal = controller.signal;
      const fetcher = async () => {
        const response = await fetch(`${import.meta.env.VITE_LINK}/friends`, {
          signal,
          credentials: "include",
          method: "POST",
        });
        const result = await response.json();
        console.log(result);
      };
      fetcher();
      return () => {
        controller.abort();
      };
    }
  }, []);

  const searchFriends = async () => {

    try {
      const response = await fetch(
        `${import.meta.env.VITE_LINK}/search?name=${encodeURIComponent(search)}`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      const result = await response.json();
      setFriendsList(result.message);
      console.log(friendsList);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="w-full h-screen bg-black text-white border-r border-gray-900 flex flex-col">
        <div className="sticky top-0 z-10 bg-black p-4 border-b border-[#221339]">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                searchFriends();
              }
            }}
            placeholder="Search friends..."
            className="w-full border border-gray-700 bg-[#080017] rounded-xl px-4 py-3 outline-none text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {tab==="Friends" && <FriendsList friendsList={friendsList} />}
        {tab==="Chats" && <SearchList friendsList={friendsList} />}
      </div>
    </>
  );
};

export default Friends;
