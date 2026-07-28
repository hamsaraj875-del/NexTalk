const FriendsList = ({friendsList}) => {
  return (
    <>
      {friendsList.length != 0 ? (
        <div className="flex-1 overflow-y-auto scrollbar-none p-3 space-y-2">
          {friendsList.map((person, index) => (
            <div
              key={index}
              onClick={() => setFriend(person.name)}
              className="group flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-[#120430]"
            >
              <div className="relative">
                <img
                  src="friends.png"
                  alt=""
                  className="w-12 h-12 object-cover rounded-full"
                />

                {person.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-[#0F071C] " />
                )}
              </div>

              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-white ">{person.name}</h2>

                  <span className="text-xs text-gray-500">{person.time}</span>
                </div>

                <p className="text-sm text-gray-500 truncate">{person.mes}</p>
              </div>
              {person.unread > 0 && (
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-semibold">
                  {person.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-start text-center text-gray-500">
          <p className="h-fit w-fit mt-24">No friends yet !</p>
        </div>
      )}
    </>
  );
};
export default FriendsList;