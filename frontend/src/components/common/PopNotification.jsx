import { IoCheckmarkCircle } from "react-icons/io5";
const PopNotification = ({ notify, setNotify }) => {
  const showNotification = () => {
    setTimeout(() => {
      setNotify("");
    }, 4000);
  };
  showNotification();
  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
        notify !== ""
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <div className="relative overflow-hidden flex items-center gap-3 h-11 pl-4 pr-5 rounded-full bg-[#0f0a1e]/95 backdrop-blur-md border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-center w-6 h-6 shrink-0 rounded-full bg-emerald-500/15">
          <IoCheckmarkCircle className="text-emerald-400 text-base" />
        </div>

        <p className="text-sm font-medium text-gray-100 whitespace-nowrap">
          {notify}
        </p>

        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/5">
          <div
            key={notify}
            className="h-full bg-emerald-400/70 animate-toast-progress"
          />
        </div>
      </div>
    </div>
  );
};

export default PopNotification;
