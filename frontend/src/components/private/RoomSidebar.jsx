const RoomSidebar = ({ groupList, roomData }) => {
  const avatarColors = {
    A: "bg-[#155E75]",
    B: "bg-[#1E40AF]",
    C: "bg-[#5B21B6]",
    D: "bg-[#9D174D]",
    E: "bg-[#9A3412]",
    F: "bg-[#0F766E]",
    G: "bg-[#166534]",
    H: "bg-[#4338CA]",
    I: "bg-[#6B21A8]",
    J: "bg-[#BE123C]",
    K: "bg-[#0369A1]",
    L: "bg-[#4D7C0F]",
    M: "bg-[#86198F]",
    N: "bg-[#6D28D9]",
    O: "bg-[#B45309]",
    P: "bg-[#1D4ED8]",
    Q: "bg-[#9D174D]",
    R: "bg-[#7E22CE]",
    S: "bg-[#0E7490]",
    T: "bg-[#047857]",
    U: "bg-[#BE123C]",
    V: "bg-[#C2410C]",
    W: "bg-[#3730A3]",
    X: "bg-[#0E7490]",
    Y: "bg-[#86198F]",
    Z: "bg-[#15803D]",
  };

  

  return (
    <div className="flex flex-col h-full p-3">
      <div className="mb-4 pb-3 border-b border-white/10">
        <h1 className="text-xl font-bold text-white">
          Nex<span className="text-purple-500">Talk</span>
        </h1>

        <p className="text-xs text-gray-400 mt-1">Room Members</p>
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#11111b] p-5 shadow-xl">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="relative mb-5 flex items-center gap-4">

          <div>
            <h2 className="text-xl font-bold text-white">{roomData?.name?.toUpperCase()}</h2>
          </div>
        </div>

        <div className="relative space-y-4">
          <div className="rounded-xl border flex items-center justify-evenly border-purple-500/10 bg-purple-500/10 p-3">
            <p className="text-xs font-medium text-purple-400">ROOM TYPE :</p>

            <p className="text-xs font-medium text-purple-400">{roomData?.type?.toUpperCase()}</p>
          </div>

          <div className="rounded-xl border flex items-center justify-evenly text-blue-400 border-blue-500/10 bg-blue-500/10 p-3">
            <p className="text-xs font-medium ">DESCRIPTION :</p>

            <p className="text-xs leading-relaxed text-blue-500">
              {roomData?.description?.toUpperCase() || "No description available"}
            </p>
          </div>

          <div className="rounded-xl border border-pink-500/10 flex items-center justify-evenly bg-pink-500/10 p-3">
            <p className="text-xs font-medium text-pink-400">OWNER :</p>

            <div className="flex items-center gap-3">
              <p className="font-medium text-pink-400">{roomData?.ownerName?.toUpperCase()}</p>
            </div>
          </div>
        </div>
      </div>
      {groupList.length !== 0 ? (
        <div className="flex flex-col overflow-y-auto scrollbar-none space-y-2">
          {groupList.map(({ name, id }) => (
            <div
              key={id}
              className="group flex items-center gap-3 p-3 rounded-xl cursor-pointer
              transition-all duration-300
              bg-gradient-to-r from-indigo-950/70 to-indigo-950
              border border-indigo-600/60
              shadow-md shadow-indigo-900/30"
            >
              <div
                className={`${avatarColors[name.charAt(0).toUpperCase()]}
                text-center flex rounded-xl w-10 h-10 font-bold
                items-center justify-center text-white`}
              >
                {name.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1 overflow-hidden">
                <h2 className="font-semibold text-white">{name}</h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center text-center text-gray-500">
          <p>No one joined yet!</p>
        </div>
      )}
    </div>
  );
};

export default RoomSidebar;
