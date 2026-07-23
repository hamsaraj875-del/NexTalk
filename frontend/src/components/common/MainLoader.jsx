const MainLoader = () => {
  return (
    <div className="flex flex-col gap-2 text-gray-500 items-center justify-center w-30 h-30 rounded-xl bg-gray-900">
      <div className="flex justify-center items-center w-12 h-12 p-[5px] bg-[linear-gradient(to_right,#7800e8,#0074e8)] rounded-full animate-spin ">
        <div className=" w-full h-full rounded-full bg-gray-900 "></div>
      </div>
      <p>Loading ...</p>
    </div>
  );
};

export default MainLoader;
