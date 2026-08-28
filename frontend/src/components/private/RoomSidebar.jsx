const RoomSidebar = ({ groupList }) => {
  const avatarColors = {
    A: "bg-[#155E75]", // Dark Cyan
    B: "bg-[#1E40AF]", // Dark Blue
    C: "bg-[#5B21B6]", // Dark Violet
    D: "bg-[#9D174D]", // Dark Pink
    E: "bg-[#9A3412]", // Dark Orange
    F: "bg-[#0F766E]", // Dark Teal
    G: "bg-[#166534]", // Dark Green
    H: "bg-[#4338CA]", // Indigo
    I: "bg-[#6B21A8]", // Dark Purple
    J: "bg-[#BE123C]", // Dark Rose
    K: "bg-[#0369A1]", // Deep Sky Blue
    L: "bg-[#4D7C0F]", // Dark Lime
    M: "bg-[#86198F]", // Dark Magenta
    N: "bg-[#6D28D9]", // Purple
    O: "bg-[#B45309]", // Dark Amber
    P: "bg-[#1D4ED8]", // Royal Blue
    Q: "bg-[#9D174D]", // Berry
    R: "bg-[#7E22CE]", // Deep Purple
    S: "bg-[#0E7490]", // Cyan
    T: "bg-[#047857]", // Emerald
    U: "bg-[#BE123C]", // Crimson
    V: "bg-[#C2410C]", // Burnt Orange
    W: "bg-[#3730A3]", // Deep Indigo
    X: "bg-[#0E7490]", // Teal
    Y: "bg-[#86198F]", // Magenta
    Z: "bg-[#15803D]", // Green
  };
  return (
    <>
      {groupList.length != 0 ? (
        <div className="flex-1 overflow-y-auto scrollbar-none p-3 space-y-2">
          {friendsList.map(({ name, id }) => (
            <div
              key={id}
              className={`
    group flex items-center gap-3 p-3 rounded-xl cursor-pointer
    transition-all duration-300
  bg-gradient-to-r from-indigo-950/70 to-indigo-950 border border-indigo-600/60 shadow-md shadow-indigo-900/30"
        : "border hover:bg-gradient-to-r hover:from-indigo-950/50 hover:to-indigo-950/80 hover:border-indigo-800/30"
  `}
            >
              <div className="relative">
                <div
                  className={`${avatarColors[name.charAt(0).toUpperCase()]} text-center flex rounded-xl w-10 h-10 font-bold items-center justify-center`}
                >
                  {name.charAt(0).toUpperCase()}
                </div>
              </div>

              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-white ">{name}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-start text-center text-gray-500">
          <p className="h-fit w-fit mt-24">No one joined yet !</p>
        </div>
      )}
    </>
  );
};
export default RoomSidebar;
