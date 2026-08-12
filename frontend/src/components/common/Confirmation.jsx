const Confirmation = ({ message,fact }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="flex flex-col gap-4 justify-center rounded-xl items-center h-fit w-fit bg-gray-900 px-4 py-4">
        <p className="text-center text-blue-500 font-mono font-bold w-fit h-fit px-4 py-2">
          {message}
        </p>
        <div className="flex items-center justify-evenly w-full h-full">
          <button onClick={()=> {fact(true)}} className="px-6 py-1 rounded-lg hover:bg-green-100/20 cursor-pointer text-green-500 font-bold">
            Yes
          </button>
          <button onClick={()=>{fact(false)}} className="px-6 py-1 rounded-lg hover:bg-red-100/20 cursor-pointer text-red-500 font-bold">
            No
          </button>
        </div>
      </div>
    </div>
  );
};
export default Confirmation;