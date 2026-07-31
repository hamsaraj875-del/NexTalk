//external module
import { useState } from "react";

const NotificationList = ({ setNotificationList, notificationList, err }) => {
  const [notify, setNotify] = useState("");
  const acceptInvitation = async (id,name) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_LINK}/accept`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify(
          { id, name }
        )
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        setNotificationList((prev) => 
          prev.map((user) =>
            user.id === id ? { ...user, status: "accepted" } : user,
          )
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
            <div
              key={index}
              className="w-full transition-all duration-300 bg-gray-800 h-12 rounded-xl flex items-center justify-evenly"
            >
              <p>{name}</p>
              <button
                onClick={() => {
                  acceptInvitation(id, name);
                }}
                className="cursor-pointer bg-green-400 text-black px-2 py-1 rounded-lg"
              >
                {status === "pending" ? "Accept" : status}
              </button>
            </div>
          ))
        ) : (
          <div className="text-gray-600">Search for the users</div>
        )}
      </div>
    </>
  );
};

export default NotificationList;
