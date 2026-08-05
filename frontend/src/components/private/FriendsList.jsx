const FriendsList = ({friend,setFriend,friendsList,setFriendsList}) => {
  return (
    <>
      {friendsList.length != 0 ? (
        <div className="flex-1 overflow-y-auto scrollbar-none p-3 space-y-2">
          {friendsList.map(({name,id} )=> (
            <div
              key={id}
              onClick={() => setFriend({name,id})}
              className={`group flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${friend?.id===id?'bg-[#120430]':''} hover:bg-[#120430]`}
            >
              <div className="relative">
                <img
                  src="friends.png"
                  alt=""
                  className="w-12 h-12 object-cover rounded-full"
                />

                {name && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-[#0F071C] " />
                )}
              </div>

              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-white ">{name}</h2>

                  <span className="text-xs text-gray-500"></span>
                </div>

                <p className="text-sm text-gray-500 truncate"></p>
              </div>
              
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