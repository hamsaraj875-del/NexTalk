//external modules
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//react icons
import { FiMessageCircle } from "react-icons/fi";
import { FaUser, FaLock } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";

//files import
import ErrorMessage from "../common/ErrorMessage";
import MainLoader from "../common/MainLoader";

const Login = () => {
  const navigate = useNavigate();
  const [loader ,setLoader] = useState(false);
  const [err, setErr] = useState("");
  const [validationError, setValidationError] = useState({});
  const [userState, setSign] = useState("signUp");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    if(userState==="login" && (email.length==0 || password.length==0)){
      setErr("Input fields cannot be empty")
      return;
    }
    if(userState==="signUp" && (name.length==0 || email.length==0 || password.length==0)){
      setErr("Input fields cannot be empty")
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_LINK}/auth/${userState}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,email,password
          }),
        },
      );

      const result = await response.json();

      if (result.success) {
        navigate("../otp");
      } else {
        setValidationError(result.message);
      }
      console.log(validationError);
    } catch {
      setErr("Server error occured ! please try again");
    }finally{
      setLoader(false);
    }
  };

  return (
    <>
    <div className="h-screen bg-black text-white flex flex-col">
      <header className="py-8 flex justify-center items-center gap-4">
        <FiMessageCircle className="text-purple-500" size={50} />

        <h1 className="text-6xl font-bold underline underline-offset-2 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          NexTalk
        </h1>
      </header>

      <main className=" w-screen flex justify-center items-center">
        <div className="w-1/2 flex justify-center items-center m-8">
          {userState == "signUp" && (
            <form
              onSubmit={submitHandler}
              className="w-[420px] flex flex-col gap-6"
            >
              <div className="text-center">
                <h2 className="text-3xl font-semibold">Create Account</h2>
                <p className="text-gray-400 mt-1">Sign up for a new account</p>
              </div>

              <div>
                <label className="mb-2 block">Name</label>

                <div className="flex items-center h-12 rounded-xl border border-gray-700 px-4 focus-within:border-cyan-400 transition">
                  <FaUser className="text-gray-400 mr-3" />

                  <input
                    type="text"
                    placeholder="Ram"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 h-full bg-transparent outline-none placeholder:text-gray-500"
                    required
                  />
                </div>
                {validationError.name && (
                  <p className="text-red-500 ">{validationError.name}</p>
                )}
              </div>
              <div>
                <label className="mb-2 block">Email</label>

                <div className="flex items-center h-12 rounded-xl border border-gray-700 px-4 focus-within:border-cyan-400 transition">
                  <MdMarkEmailRead className="text-gray-400 mr-3" />

                  <input
                    type="email"
                    placeholder="ram@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 h-full bg-transparent outline-none placeholder:text-gray-500"
                    required
                  />
                </div>
                {validationError?.email && (
                  <p className="text-red-500 ">{validationError.email}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block">Password</label>

                <div className="flex items-center h-12 rounded-xl border border-gray-700 px-4 focus-within:border-cyan-400 transition">
                  <FaLock className="text-gray-400 mr-3" />

                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 h-full bg-transparent outline-none placeholder:text-gray-500"
                    required
                  />
                </div>

                {validationError.password && (
                  <p className="text-red-500 ">{validationError.password}</p>
                )}
              </div>

              {err && <ErrorMessage message={err} />}

              <button
                type="submit"
                className="h-12 rounded-xl bg-cyan-400 hover:bg-cyan-500 text-black font-semibold transition"
              >
                Create Account
              </button>

              <button
                type="button"
                className="mx-auto rounded-lg bg-cyan-400/15 px-4 py-2 text-cyan-300 hover:bg-cyan-400/20 transition"
                onClick={() => setSign("login")}
              >
                I have an account? Login
              </button>
            </form>
          )}
          {userState == "login" && (
            <form
              onSubmit={submitHandler}
              className="w-[420px] flex flex-col gap-6"
            >
              <div className="text-center">
                <h2 className="text-3xl font-semibold">Create Account</h2>
                <p className="text-gray-400 mt-1">Login for your account</p>
              </div>
              <div>
                <label className="mb-2 block">Email</label>

                <div className="flex items-center h-12 rounded-xl border border-gray-700 px-4 focus-within:border-cyan-400 transition">
                  <MdMarkEmailRead className="text-gray-400 mr-3" />

                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 h-full bg-transparent outline-none placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block">Password</label>

                <div className="flex items-center h-12 rounded-xl border border-gray-700 px-4 focus-within:border-cyan-400 transition">
                  <FaLock className="text-gray-400 mr-3" />

                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 h-full bg-transparent outline-none placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              {err && <ErrorMessage message={err} />}

              <button className="h-12 rounded-xl bg-cyan-400 hover:bg-cyan-500 text-black font-semibold transition">
                Login
              </button>

              <button
                type="button"
                className="mx-auto rounded-lg bg-cyan-400/15 px-4 py-2 text-cyan-300 hover:bg-cyan-400/20 transition"
                onClick={() => setSign("signUp")}
              >
                I don't have account? SignUp
              </button>
            </form>
          )}
        </div>

        <div className=" flex justify-center items-center">
          <img
            src="/login.png"
            alt="emoji"
            className="w-[90%] max-w-[800px] h-auto object-contain"
          />
        </div>
      </main>
    </div>
    {loader && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
    <MainLoader />
  </div>
)}
    </>
  );
};

export default Login;
