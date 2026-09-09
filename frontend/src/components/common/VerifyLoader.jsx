import { useEffect, useState } from "react";
import { BsChatSquareDotsFill } from "react-icons/bs";
import { FaBolt, FaUsers, FaLock, FaRegBell } from "react-icons/fa";

const FEATURES = [
  { icon: FaBolt, text: "Real-time messaging, instantly delivered" },
  { icon: FaUsers, text: "Public & private rooms for group chats" },
  { icon: FaLock, text: "Password-protected private rooms" },
  { icon: FaRegBell, text: "Live notifications for requests & invites" },
];

const VerifyLoader = () => {
  const [dots, setDots] = useState("");
  const [featureIndex, setFeatureIndex] = useState(0);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 450);
    const featureInterval = setInterval(() => {
      setFeatureIndex((prev) => (prev + 1) % FEATURES.length);
    }, 2200);
    return () => {
      clearInterval(dotInterval);
      clearInterval(featureInterval);
    };
  }, []);

  const ActiveIcon = FEATURES[featureIndex].icon;

  return (
    <div className="h-screen w-screen bg-[#0c021a] flex flex-col items-center justify-center gap-10 px-6 animate-fade-in">
      {/* logo mark */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-600 shadow-lg shadow-purple-900/30">
          <BsChatSquareDotsFill className="text-white text-2xl" />
        </div>
        <h1 className="text-6xl italic  font-extrabold bg-orange-600 bg-clip-text text-transparent tracking-tight">
          NexTalk
        </h1>
      </div>
      <p className="text-sm font-medium text-gray-400 min-w-[160px] text-center">
         Verifying your session
        <span className="inline-block w-3 text-left">{dots}</span>
      </p>
      <div className="w-64 h-1 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full w-1/3 rounded-full bg-green-400 animate-loading-bar" />
      </div>
      <div
        key={featureIndex}
        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 min-w-[280px] max-w-[90vw] animate-feature-fade"
      >
        <div className="flex items-center justify-center w-8 h-8 shrink-0 rounded-lg bg-indigo-500/10 text-indigo-400">
          <ActiveIcon className="text-sm" />
        </div>
        <p className="text-sm text-gray-300">{FEATURES[featureIndex].text}</p>
      </div>
      <div className="flex gap-1.5">
        {FEATURES.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === featureIndex ? "w-4 bg-green-400" : "w-1.5 bg-white/15"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default VerifyLoader;