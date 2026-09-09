// external modules
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// react icons
import { FiMessageCircle } from "react-icons/fi";
import { FaUser, FaLock } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";

// files import
import ErrorMessage from "../common/ErrorMessage";
import MainLoader from "../common/MainLoader";

const Login = () => {
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  const [err, setErr] = useState("");
  const [validationError, setValidationError] = useState({});
  const [userState, setSign] = useState("signUp");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const switchMode = (mode) => {
    setSign(mode);
    setName("");
    setEmail("");
    setPassword("");
    setErr("");
    setValidationError({});
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setErr("");
    setValidationError({});

    if (
      userState === "login" &&
      (email.trim().length === 0 || password.length === 0)
    ) {
      setErr("Input fields cannot be empty");
      return;
    }

    if (
      userState === "signUp" &&
      (name.trim().length === 0 ||
        email.trim().length === 0 ||
        password.length === 0)
    ) {
      setErr("Input fields cannot be empty");
      return;
    }

    setLoader(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_LINK}/auth/${userState}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
          credentials: "include",
        },
      );

      const result = await response.json();

      if (result.success && userState === "signUp") {
        navigate("../otp");
      } else if (result.success && userState === "login") {
        navigate("../../chat");
      } else if (!result.validationError) {
        setErr(result.message);
      } else {
        setValidationError(result.message);
      }
    } catch (error) {
      console.log(error);
      setErr("Server error occurred! Please try again.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <div className="min-h-dvh w-full overflow-x-hidden bg-black text-white">
        <header className="flex items-center justify-center gap-2 px-4 py-6 sm:gap-3 sm:py-8">
          <FiMessageCircle
            className="text-purple-500 sm:size-[42px]"
            size={34}
          />

          <h1
            className="
              text-4xl
              font-bold
              underline
              underline-offset-2
              sm:text-5xl
              lg:text-6xl
              bg-gradient-to-r
              from-purple-500
              to-blue-500
              bg-clip-text
              text-transparent
            "
          >
            NexTalk
          </h1>
        </header>
        <main
          className="
            mx-auto
            flex
            w-full
            max-w-7xl
            flex-col
            items-center
            justify-center
            gap-8
            px-5
            pb-10
            sm:px-8
            lg:min-h-[calc(100dvh-130px)]
            lg:flex-row
            lg:gap-12
            xl:gap-20
          "
        >
          <section
            className="
              flex
              w-full
              max-w-md
              items-center
              justify-center
              lg:w-1/2
            "
          >
            {userState === "signUp" && (
              <form
                onSubmit={submitHandler}
                className="
                  flex
                  w-full
                  flex-col
                  gap-5
                  sm:gap-6
                "
              >
                <div className="mb-1 text-center">
                  <h2 className="text-2xl font-semibold sm:text-3xl">
                    Create Account
                  </h2>

                  <p className="mt-1 text-sm text-gray-400 sm:text-base">
                    Sign up for a new account
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium sm:text-base">
                    Name
                  </label>

                  <div
                    className="
                      flex
                      h-12
                      items-center
                      rounded-xl
                      border
                      border-gray-700
                      px-4
                      transition
                      focus-within:border-cyan-400
                      focus-within:ring-1
                      focus-within:ring-cyan-400/30
                    "
                  >
                    <FaUser className="mr-3 shrink-0 text-gray-400" />

                    <input
                      type="text"
                      placeholder="Ram"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="
                        h-full
                        min-w-0
                        flex-1
                        bg-transparent
                        text-sm
                        outline-none
                        placeholder:text-gray-500
                        sm:text-base
                      "
                      required
                    />
                  </div>

                  {validationError?.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {validationError.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium sm:text-base">
                    Email
                  </label>

                  <div
                    className="
                      flex
                      h-12
                      items-center
                      rounded-xl
                      border
                      border-gray-700
                      px-4
                      transition
                      focus-within:border-cyan-400
                      focus-within:ring-1
                      focus-within:ring-cyan-400/30
                    "
                  >
                    <MdMarkEmailRead className="mr-3 shrink-0 text-gray-400" />

                    <input
                      type="email"
                      placeholder="ram@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="
                        h-full
                        min-w-0
                        flex-1
                        bg-transparent
                        text-sm
                        outline-none
                        placeholder:text-gray-500
                        sm:text-base
                      "
                      required
                    />
                  </div>

                  {validationError?.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {validationError.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium sm:text-base">
                    Password
                  </label>

                  <div
                    className="
                      flex
                      h-12
                      items-center
                      rounded-xl
                      border
                      border-gray-700
                      px-4
                      transition
                      focus-within:border-cyan-400
                      focus-within:ring-1
                      focus-within:ring-cyan-400/30
                    "
                  >
                    <FaLock className="mr-3 shrink-0 text-gray-400" />

                    <input
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="
                        h-full
                        min-w-0
                        flex-1
                        bg-transparent
                        text-sm
                        outline-none
                        placeholder:text-gray-500
                        sm:text-base
                      "
                      required
                    />
                  </div>

                  {validationError?.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {validationError.password}
                    </p>
                  )}
                </div>

                {err && <ErrorMessage message={err} />}

                <button
                  type="submit"
                  className="
                    h-12
                    rounded-xl
                    bg-cyan-400
                    font-semibold
                    text-black
                    transition
                    hover:bg-cyan-500
                    active:scale-[0.98]
                  "
                >
                  Create Account
                </button>

                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className="
                    mx-auto
                    rounded-lg
                    bg-cyan-400/10
                    px-4
                    py-2
                    text-sm
                    text-cyan-300
                    transition
                    hover:bg-cyan-400/20
                    sm:text-base
                  "
                >
                  I have an account? Login
                </button>
              </form>
            )}

            {userState === "login" && (
              <form
                onSubmit={submitHandler}
                className="
                  flex
                  w-full
                  flex-col
                  gap-5
                  sm:gap-6
                "
              >
                <div className="mb-1 text-center">
                  <h2 className="text-2xl font-semibold sm:text-3xl">
                    Welcome Back
                  </h2>

                  <p className="mt-1 text-sm text-gray-400 sm:text-base">
                    Login to your account
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium sm:text-base">
                    Email
                  </label>

                  <div
                    className="
                      flex
                      h-12
                      items-center
                      rounded-xl
                      border
                      border-gray-700
                      px-4
                      transition
                      focus-within:border-cyan-400
                      focus-within:ring-1
                      focus-within:ring-cyan-400/30
                    "
                  >
                    <MdMarkEmailRead className="mr-3 shrink-0 text-gray-400" />

                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="
                        h-full
                        min-w-0
                        flex-1
                        bg-transparent
                        text-sm
                        outline-none
                        placeholder:text-gray-500
                        sm:text-base
                      "
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium sm:text-base">
                    Password
                  </label>

                  <div
                    className="
                      flex
                      h-12
                      items-center
                      rounded-xl
                      border
                      border-gray-700
                      px-4
                      transition
                      focus-within:border-cyan-400
                      focus-within:ring-1
                      focus-within:ring-cyan-400/30
                    "
                  >
                    <FaLock className="mr-3 shrink-0 text-gray-400" />

                    <input
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="
                        h-full
                        min-w-0
                        flex-1
                        bg-transparent
                        text-sm
                        outline-none
                        placeholder:text-gray-500
                        sm:text-base
                      "
                      required
                    />
                  </div>
                </div>

                {err && <ErrorMessage message={err} />}

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  className="
                    h-12
                    rounded-xl
                    bg-cyan-400
                    font-semibold
                    text-black
                    transition
                    hover:bg-cyan-500
                    active:scale-[0.98]
                  "
                >
                  Login
                </button>

                <button
                  type="button"
                  onClick={() => switchMode("signUp")}
                  className="
                    mx-auto
                    rounded-lg
                    bg-cyan-400/10
                    px-4
                    py-2
                    text-sm
                    text-cyan-300
                    transition
                    hover:bg-cyan-400/20
                    sm:text-base
                  "
                >
                  I don't have an account? Sign Up
                </button>
              </form>
            )}
          </section>

          <section
            className="
              hidden
              w-1/2
              items-center
              justify-center
              lg:flex
            "
          >
            <img
              src="/login.png"
              alt="NexTalk login illustration"
              className="
                h-auto
                w-full
                max-w-[620px]
                object-contain
              "
            />
          </section>
        </main>
      </div>

      {loader && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/40
            px-4
            backdrop-blur-sm
          "
        >
          <MainLoader />
        </div>
      )}
    </>
  );
};

export default Login;
