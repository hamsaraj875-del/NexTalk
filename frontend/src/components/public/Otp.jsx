import { useState } from "react";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-[#0c021a] flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-zinc-900 rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-white text-center">
          NexTalk
        </h1>

        <p className="text-zinc-400 text-center mt-3">
          Enter the 6-digit verification code sent to your email.
        </p>

        <form onSubmit={handleSubmit} className="mt-10">

          <div className="flex justify-between gap-3">

            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) =>
                  handleChange(e.target.value, index)
                }
                onKeyDown={(e) =>
                  handleKeyDown(e, index)
                }
                className="w-14 h-16 rounded-xl bg-zinc-800 border border-zinc-700 text-center text-2xl font-bold text-white outline-none focus:border-blue-500"
              />
            ))}

          </div>

          <button
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 duration-200 py-3 rounded-xl text-white font-semibold"
          >
            Verify OTP
          </button>

        </form>

        <div className="mt-6 text-center">

          <button
            className="text-blue-400 hover:text-blue-500"
          >
            Resend OTP
          </button>

        </div>

      </div>
    </div>
  );
};

export default VerifyOTP;