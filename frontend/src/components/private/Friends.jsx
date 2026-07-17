const Friends = () => {
  const friendsList = [
    { name: "Riya", time: "12:30 AM", mes: "How are you ?", online: true, unread: 2 },
    { name: "Raj", time: "Yesterday", mes: "Nothing", online: false, unread: 0 },
    { name: "Priya", time: "Today", mes: "How's everything going?", online: true, unread: 1 },
    { name: "Ram", time: "11:01 AM", mes: "Send me the homework.", online: false, unread: 0 },
    { name: "Anjali", time: "9:45 PM", mes: "Let's meet tomorrow!", online: true, unread: 5 },
    { name: "Karan", time: "8:10 PM", mes: "Okay 👍", online: false, unread: 0 },
    { name: "Priya", time: "Today", mes: "How's everything going?", online: true, unread: 1 },
    { name: "Ram", time: "11:01 AM", mes: "Send me the homework.", online: false, unread: 0 },
    { name: "Anjali", time: "9:45 PM", mes: "Let's meet tomorrow!", online: true, unread: 5 },
    { name: "Karan", time: "8:10 PM", mes: "Okay 👍", online: false, unread: 0 },
  ];

  return (
    <div className="w-full h-screen bg-[#0F071C] text-white border-r border-gray-900 flex flex-col">

      <div className="sticky top-0 z-10 bg-[#0F071C] p-4 border-b border-[#221339]">
        <input
          type="text"
          placeholder="Search friends..."
          className="w-full border border-gray-700 bg-[#080017] rounded-xl px-4 py-3 outline-none text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none p-3 space-y-2">

        {friendsList.map((person, index) => (
          <div
            key={index}
            className="group flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-[#1A1030]"
          >
            <div className="relative">
              <img
                src="logo.png"
                alt=""
                className="w-12 h-12 rounded-full object-cover"
              />

              {person.online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-[#0F071C] animate-ping" />
              )}
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-white ">
                  {person.name}
                </h2>

                <span className="text-xs text-gray-400">
                  {person.time}
                </span>
              </div>

              <p className="text-sm text-gray-400 truncate">
                {person.mes}
              </p>
            </div>
            {person.unread > 0 && (
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-semibold">
                {person.unread}
              </div>
            )}
          </div>
        ))}

      </div>

    </div>
  );
};

export default Friends;