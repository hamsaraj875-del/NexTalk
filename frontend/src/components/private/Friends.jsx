//external modules
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//internal modules
import FriendsList from "./FriendsList";
import SearchList from "./SearchList";
import NotificationList from "./NotificationList";
import socket from "./socket";

//react icons
import { MdOutlineAccountCircle } from "react-icons/md";

const Friends = ({ tab, setFriend, friend }) => {
  const [friendsList, setFriendsList] = useState([]);
  const [notificationList, setNotificationList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [search, setSearch] = useState([]);
  const [loader, setLoader] = useState([]);
  const [onlineUser, setOnlineUser] = useState([]);

  useEffect(() => {
    if (tab === "Friends") {
      const controller = new AbortController();
      const signal = controller.signal;
      setLoader(true);
      try {
        const fetcher = async () => {
          const response = await fetch(`${import.meta.env.VITE_LINK}/friends`, {
            signal,
            credentials: "include",
            method: "POST",
          });
          const result = await response.json();
          if (result.success) {
            setFriendsList(result.message);
          }
        };
        fetcher();
      } catch (err) {
        console.log(err);
      } finally {
        setLoader(false);
      }
      return () => {
        controller.abort();
      };
    } else if (tab === "Notifications") {
      const controller = new AbortController();
      const signal = controller.signal;
      setLoader(true);
      try {
        const fetcher = async () => {
          const response = await fetch(
            `${import.meta.env.VITE_LINK}/notifications`,
            {
              signal,
              credentials: "include",
              method: "POST",
            },
          );
          const result = await response.json();
          console.log(result);
          setNotificationList(result.message);
          if (result.success) {
            setFriendsList(result.message);
          }
        };
        fetcher();
      } catch (err) {
        console.log(err);
      }
      return () => {
        controller.abort();
      };
    }
  }, [tab]);

  const searchFriends = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_LINK}/search?name=${encodeURIComponent(search.trim())}`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      const result = await response.json();
      setSearchList(result.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    socket.on("onlineUser", (data) => {
      setOnlineUser(data);
    });
    return () => {
      socket.off("onlineUser");
    };
  }, []);
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
        {tab === "Friends" && (
          <FriendsList
          onlineUser={onlineUser}
            friend={friend}
            friendsList={friendsList}
            setFriend={setFriend}
            setFriendsList={setFriendsList}
          />
        )}
        {tab === "Chats" && (
          <SearchList searchList={searchList} setSearchList={setSearchList} />
        )}
        {tab === "Notifications" && (
          <NotificationList
            setNotificationList={setNotificationList}
            notificationList={notificationList}
          />
        )}
      </div>
    </>
  );
};

export default Friends;
