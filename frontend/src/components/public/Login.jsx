import { useState } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { FaUser, FaLock } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";

const Login = () => {
  const [userState, setSign] = useState("sign");

  const submitHandler = (e)=>{
    e.preventDefault;

    

  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="py-8 flex justify-center items-center gap-4">
        <FiMessageCircle className="text-purple-500" size={50} />

        <h1 className="text-6xl font-bold underline underline-offset-2 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          NexTalk
        </h1>
      </header>

      <main className="flex-1 flex">
        <div className="w-1/2 flex justify-center items-center">
          {userState == "sign" && (
            <form onSubmit={(e)=>submitHandler()} className="w-[420px] flex flex-col gap-6">
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
                    placeholder="John Doe"
                    className="flex-1 bg-transparent outline-none placeholder:text-gray-500"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block">Email</label>

                <div className="flex items-center h-12 rounded-xl border border-gray-700 px-4 focus-within:border-cyan-400 transition">
                  <MdMarkEmailRead className="text-gray-400 mr-3" />

                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="flex-1 bg-transparent outline-none placeholder:text-gray-500"
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
                    className="flex-1 bg-transparent outline-none placeholder:text-gray-500"
                  />
                </div>
              </div>

              <button type="submit" className="h-12 rounded-xl bg-cyan-400 hover:bg-cyan-500 text-black font-semibold transition">
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
            <form className="w-[420px] flex flex-col gap-6">
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
                    className="flex-1 bg-transparent outline-none placeholder:text-gray-500"
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
                    className="flex-1 bg-transparent outline-none placeholder:text-gray-500"
                  />
                </div>
              </div>

              <button className="h-12 rounded-xl bg-cyan-400 hover:bg-cyan-500 text-black font-semibold transition">
                Login
              </button>

              <button
                type="button"
                className="mx-auto rounded-lg bg-cyan-400/15 px-4 py-2 text-cyan-300 hover:bg-cyan-400/20 transition"
                onClick={() => setSign("sign")}
              >
                I don't have account? SignUp
              </button>
            </form>
          )}
        </div>

        <div className="w-1/2 flex justify-center items-center">
          <img
            src="login.png"
            alt="Illustration"
            className="w-[100%] max-w-[800px] h-auto object-contain"
          />
        </div>
      </main>
    </div>
  );
};

export default Login;
