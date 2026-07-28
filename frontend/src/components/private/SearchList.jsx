const SearchList = ({friendsList}) => {
  return (
    <>
      <div className="flex-1 overflow-y-auto scrollbar-none p-3 space-y-2">
        {friendsList.map(({userId,userName,userStatus})=>(
          <div key={userId} className="w-full h-8 rounded-xl flex items-center justify-evenly" >
            <p>{userName}</p>
            <button>{userStatus==="none"?'send request':userStatus}</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchList;
