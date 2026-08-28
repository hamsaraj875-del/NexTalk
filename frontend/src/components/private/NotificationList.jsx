//external module
import { useState } from "react";

//react icons
import { FaCheck } from "react-icons/fa";

const NotificationList = ({ setNotificationList, notificationList, err }) => {
  const [notify, setNotify] = useState("");
  const acceptInvitation = async (id, name) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_LINK}/accept`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name }),
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        setNotificationList((prev) =>
          prev.map((user) =>
            user.id === id ? { ...user, status: "accepted" } : user,
          ),
        );
      }
      setNotify(result.message);
    } catch (err) {
      setNotify("Internal server error occured please try again!");
    }
  };
  return (
    <>
      <div className="flex-1 overflow-y-auto scrollbar-none p-3 space-y-2">
        {notificationList.length != 0 ? (
          notificationList.map(({ name, id, status }, index) => (
            <>
              {status === "pending" && (
                <div
                  key={index}
                  className="w-full h-14 bg-gradient-to-r from-indigo-950/50 to-indigo-950/80 hover:bg-gradient-to-r hover:from-indigo-950/70 hover:to-indigo-950 border border-white/5 hover:border-indigo-500/30
          hover:shadow-lg hover:shadow-purple-500/5
          transition-all duration-500 h-12 rounded-xl flex items-center px-4 py-1"
                >
                  <div className="flex gap-3 justify-center items-center">
                    <div className="bg-indigo-500 rounded-xl flex items-center justify-center h-9 w-9 text-center">
                      {name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-bold">{name}</p>
                      <p className="text-[11px] text-gray-500">
                        Accept invitation
                      </p>
                    </div>
                  </div>
                  <button
                    disabled={status == "accepted"}
                    onClick={() => {
                      acceptInvitation(id, name);
                    }}
                    className="cursor-pointer bg-green-400 text-black px-2 py-1 rounded-lg ml-auto text-[12px] flex items-center justify-center "
                  >
                    <FaCheck className="mr-2" />
                    {status === "pending" ? "Accept" : status}
                  </button>
                </div>
              )}
            </>
          ))
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-center text-gray-500">
            <p className="text-sm font-medium">No notifications yet!</p>
            <p className="text-xs text-gray-600 mt-1">You're all caught up.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationList;
