import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../common/ErrorMessage";
import MainLoader from "../common/MainLoader";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [err, setErr] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setErr("");
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (otp.some((digit) => digit === "")) {
      setErr("Please enter the complete 6-digit OTP");
      return;
    }

    setLoader(true);

    const otpStr = otp.join("");

    try {
      const response = await fetch(`${import.meta.env.VITE_LINK}/auth/otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otpStr }),
        credentials: "include",
      });

      const result = await response.json();

      if (result.success) {
        navigate("../../chat");
      } else {
        setErr(result.message);
      }
    } catch (error) {
      console.log(error);
      setErr("Server error please try again");
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <div className="min-h-dvh w-full bg-[#0c021a] px-4 text-white sm:px-6">
        <div className="flex min-h-dvh items-center justify-center">
          <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/95 p-6 shadow-2xl shadow-purple-950/30 backdrop-blur sm:p-8">
            <div className="text-center">
              <h1 className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
                NexTalk
              </h1>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-zinc-400 sm:text-base">
                Enter the 6-digit verification code sent to your email.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 sm:mt-10">
              <div className="flex justify-center gap-2 sm:gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="h-12 w-11 rounded-xl border border-zinc-700 bg-zinc-800 text-center text-xl font-bold text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 sm:h-14 sm:w-12 sm:text-2xl"
                  />
                ))}
              </div>

              {err && (
                <div className="mt-5">
                  <ErrorMessage message={err} />
                </div>
              )}

              <button
                type="submit"
                disabled={loader}
                className="mt-7 h-12 w-full rounded-xl bg-blue-600 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:mt-8"
              >
                Verify OTP
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                className="text-sm font-medium text-blue-400 transition hover:text-blue-500 sm:text-base"
              >
                Resend OTP
              </button>
            </div>
          </div>
        </div>
      </div>

      {loader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <MainLoader />
        </div>
      )}
    </>
  );
};

export default VerifyOTP;