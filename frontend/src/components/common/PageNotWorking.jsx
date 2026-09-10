import { useNavigate } from "react-router-dom";

const PageNotWorking = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#090912] text-white">
      <div className="text-center p-8">
        <h1 className="text-5xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-400 mb-8">
          You have been blocked from this room.
        </p>
        <button
          onClick={() => navigate("../../")}
          className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PageNotWorking;
