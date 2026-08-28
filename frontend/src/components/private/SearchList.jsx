//external modules
import { useState } from "react";

//internal files
import PopNotification from "../common/PopNotification";

const SearchList = ({ searchList, setSearchList }) => {
  const [err, setErr] = useState("");
  const sendInvitation = async (userId, userName) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_LINK}/invite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, userName }),
        credentials: "include",
      });
      const result = await response.json();
      if (result.success) {
        setSearchList((prev) =>
          prev.map((user) =>
            user.userId === userId
              ? { ...user, userStatus: "pending" }
              : user,
          ),
        );
      }
      setErr(result.message);
    } catch (err) {
      console.log(err);
      setErr("Internal server error please try  again later");
    }
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto scrollbar-none p-3 space-y-2.5">
        {searchList.length !== 0 ? (
          searchList.map(({ userId, userName, userStatus }) => (
            <div
              key={userId}
              className="
          group w-full h-14
          px-3
          rounded-2xl
          flex items-center justify-between
          bg-gradient-to-r from-indigo-950/50 to-indigo-950/80
          hover:bg-gradient-to-r hover:from-indigo-950/70 hover:to-indigo-950
          border border-white/5
          shadow-md shadow-black/10
          hover:border-indigo-500/30
          hover:shadow-lg hover:shadow-purple-500/5
          transition-all duration-500
        "
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="
              w-10 h-10 shrink-0
              rounded-xl
              flex items-center justify-center
              bg-gradient-to-br from-indigo-500 to-indigo-500
              text-white font-semibold
              shadow-md shadow-purple-500/20
              group-hover:scale-105
              transition-transform duration-300
            "
                >
                  {userName?.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-100 truncate">
                    {userName}
                  </p>

                  <p className="text-[11px] text-gray-500 mt-0.5">
                    {userStatus === "accepted"
                      ? "Friends"
                      : userStatus === "pending"
                        ? "Invitation pending"
                        : "Add to your friends"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  sendInvitation(userId, userName);
                }}
                disabled={userStatus === "pending" || userStatus === "accepted"}
                className={`
            shrink-0
            min-w-[85px]
            px-3 py-2
            rounded-xl
            text-xs font-semibold
            transition-all duration-300

            ${
              userStatus === "none"
                ? `
                  bg-gradient-to-r from-emerald-400 to-green-500
                  text-black
                  shadow-md shadow-green-500/10
                  hover:from-emerald-300
                  hover:to-green-400
                  cursor-pointer
                  hover:shadow-lg hover:shadow-green-500/20
                  hover:-translate-y-0.5
                  active:scale-95
                `
                : userStatus === "pending"
                  ? `
                    bg-yellow-500/10
                    text-yellow-400
                    border border-yellow-500/20
                    cursor-not-allowed
                  `
                  : `
                    bg-indigo-500/10
                    text-indigo-400
                    border border-indigo-500/20
                    cursor-not-allowed
                  `
            }

            disabled:opacity-70
          `}
              >
                {userStatus === "none"
                  ? "＋ Invite"
                  : userStatus === "pending"
                    ? "Request Sent"
                    : "Friends"}
              </button>
            </div>
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center px-6">
            <div
              className="
          w-16 h-16
          rounded-2xl
          flex items-center justify-center
          bg-gray-800
          border border-white/5
          mb-4
          shadow-lg
        "
            >
              <span className="text-2xl opacity-60">🔍</span>
            </div>

            <p className="text-sm font-medium text-gray-400">
              Search for users
            </p>

            <p className="text-xs text-gray-600 mt-1">
              Find people and send them a friend request
            </p>
          </div>
        )}
      </div>

      {err.length !== 0 && <PopNotification setNotify={setErr} notify={err} />}
    </>
  );
};

export default SearchList;
