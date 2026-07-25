const PopNotification = ({ notify }) => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 h-10 w-fit px-4 py-2 rounded-2xl bg-white text-blue-500 font-mono flex items-center justify-center shadow-lg">
      <p>{notify}</p>
    </div>
  );
};

export default PopNotification;
