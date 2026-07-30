const NotificationList = ({ friendsList }) => {
  return (
    <>
      <div className="flex-1 overflow-y-auto scrollbar-none p-3 space-y-2">
        {friendsList.length != 0 ? (
          friendsList.map(({ userId, userName, userStatus }) => (
            <div
              key={userId}
              className="w-full transition-all duration-300 bg-gray-800 h-12 rounded-xl flex items-center justify-evenly"
            >
              <p>{userName}</p>
              <button
                onClick={() => {
                  sendInvitation(userId, userName);
                  userStatus = "pending";
                }}
                className="cursor-pointer bg-green-400 text-black px-2 py-1 rounded-lg"
              >
                {userStatus === "none" ? "send request" : userStatus}
              </button>
            </div>
          ))
        ) : (
          <div className="text-gray-600">Search for the users</div>
        )}
      </div>
      {err.length != 0 && <PopNotification setNotify={setErr} notify={err} />}
    </>
  );
};
