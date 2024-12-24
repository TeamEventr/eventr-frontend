"use client";
import {useState, useEffect, useRef, ChangeEvent, KeyboardEvent, ClipboardEvent, Suspense } from "react";
import { useRouter,useSearchParams } from "next/navigation";
import secureLocalStorage from "react-secure-storage";

import { useResendOTP, useVerifyOTP } from "@/api/hooks";
import Icon from "@/app/_components/icon-wrapper";

export default function OtpVerify() {
  const params = useSearchParams();
  const router = useRouter();
  //codeFor:
  // 1: verification - verify email address on sign up
  // 2: authentication - verify it is user while forgot password, changing password, phone number, making event public or deleting account.

  const [values, setValues] = useState<string[]>(Array(6).fill(""));
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(300);

  const type = params.get("verify");
  const host = params.get("host");

  const { mutate: verifyOTP, isPending: verifyPending } = useVerifyOTP();
  const {
    mutate: resendOTP,
    isPending: resendPending,
    isSuccess: resendSuccess,
  } = useResendOTP();

  //Get username and email from SLL. Change later with newer Auth
  useEffect(() => {
    const storedEmail = secureLocalStorage.getItem("email");
    const storedUsername = secureLocalStorage.getItem("username");

    if (storedEmail && storedUsername) {
      if (typeof storedEmail === "string") {
        setEmail(storedEmail);
      }
      if (typeof storedUsername === "string") {
        setUsername(storedUsername);
      }
    }
  }, []);

  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleInputChange =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValues((prevValues) => {
        const newValues = [...prevValues];
        newValues[index] = newValue;
        return newValues;
      });

      if (/^\d$/.test(newValue) && index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    };

  const handleKeyDown =
    (index: number) => (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && index > 0 && !values[index]) {
        inputsRef.current[index - 1].focus();
      }
    };

  const handlePaste =
    (index: number) => (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasteData = e.clipboardData.getData("text");
      if (/^\d{6}$/.test(pasteData)) {
        const newValues = pasteData.split("");
        setValues(newValues);
        inputsRef.current.forEach((input, i) => {
          if (input) {
            input.value = newValues[i];
          }
        });
        inputsRef.current[5].focus();
      }
    };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleResend = async () => {
    resendOTP(
      { email: email, username: username }, {
        onSuccess: () => {
          setTimeLeft(300);
          setErrMsg("OTP resent successfully.");
          setValues(Array(6).fill(""));
          inputsRef.current[0].focus();
        },
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otp = values.join("");
    if (!/^\d{6}$/.test(otp)) {
      setErrMsg("Please enter a valid OTP.");
      return;
    }
    verifyOTP(
      { otp: otp, email: email, username: username }, {
        onSuccess: () => {
          if (host) {
            router.push(`/register/host`);
          } else {
            router.push("/");
          }
        },
      }
    );
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex h-screen w-full items-center justify-center">
        <div className="relative w-96 p-6 -translate-y-16 flex flex-col justify-center rounded-lg bg-zinc-950 bg-opacity-50 border-2 border-zinc-500/20 border-opacity-10">
          <div className="w-full relative text-2xl">
            <p>Verify your Email</p>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            <p>Enter the code sent to {email}.</p>
            <p>OTP expires in {timeLeft}s</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex gap-4 justify-center mt-6">
              {values.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  className="w-10 text-lg text-center p-2 rounded-lg bg-zinc-900 border border-gray-500 border-opacity-10 outline-none hover:ring-1 focus:ring-1 ring-gray-900"
                  maxLength={1}
                  value={value}
                  onChange={handleInputChange(index)}
                  onKeyDown={handleKeyDown(index)}
                  onPaste={handlePaste(index)}
                  ref={(ref) => {
                    inputsRef.current[index] = ref as HTMLInputElement;
                  }}
                />
              ))}
            </div>
            <button
              disabled={verifyPending}
              type="submit"
              className="w-full h-10 mt-6 flex items-center justify-center gap-2 text-zinc-300 p-2 rounded-lg bg-zinc-900 border border-gray-500 border-opacity-10 hover:ring-1 focus:ring-1 ring-gray-900"
            >
              {verifyPending ? (
                <Icon icon="progress_activity" spin />
              ) : (
                "Verify"
              )}
            </button>
            <p
              className={`h-5 mt-1 ${
                resendSuccess ? "text-gray-500" : "text-red-700"
              }`}
            >
              {resendSuccess ? "OTP Resent successfully" : errMsg}
            </p>
          </form>
          <div className="flex justify-end mt-2">
            <p className="text-sm text-gray-500">
              Didn"t recieve code?
              <button
                disabled={resendPending}
                onClick={handleResend}
                className="text-gray-300 underline"
              >
                Resend
              </button>
            </p>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
