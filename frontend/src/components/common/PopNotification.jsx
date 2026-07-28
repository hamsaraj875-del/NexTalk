const PopNotification = ({ notify, setNotify }) => {
  const showNotification = () => {
    setTimeout(() => {
      setNotify("");
    }, 4000);
  };
  showNotification();
  return (
    <div
      className={`fixed top-6/7 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 h-10 w-fit px-4 py-2 rounded-2xl bg-black border-blue-50 border-1 text-green-500 font-bold font-mono flex items-center justify-center shadow-lg transition-opacity duration-1000 ${notify != "" ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <p>{notify}</p>
    </div>
  );
};

export default PopNotification;
