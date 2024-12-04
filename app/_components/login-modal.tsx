"use client";
import Link from "next/link";
import { useState } from "react";
import { Input, Password } from "../_components/input-wrapper";
import Icon from "./icon-wrapper";
import bcrypt from "bcryptjs";
import { useLogin } from "@/api/hooks";
import { Google } from "./logo-wrapper";
import { useRecoilState } from "recoil";
import { showLoginModalState } from "@/api/atoms";
import { AnimatePresence, motion } from "motion/react"

export default function Login() {
  const [isOpen, setIsOpen] = useRecoilState(showLoginModalState);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [inputErrMsg, setInputErrMsg] = useState<string | null>(null);


  const { mutate: login, isPending, error } = useLogin(() => {
      console.log("Login successful!");
    },
  );

  const handleLogIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setInputErrMsg(null);
    const conditions = [
      {
        condition: email === "" || password === "",
        message: "Please fill all the fields.",
      },
      {
        condition: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        message: "Email is not in the correct format.",
      },
    ];
    for (const { condition, message } of conditions) {
      if (condition) {
        setInputErrMsg(message);
        return;
      }
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    login({
      userMail: email,
      passWord: encryptedPassword,
    });
  };
  
  return (
    
      <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-eventr-gray-800/50">
        <motion.form
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
          onSubmit={handleLogIn}
          className="absolute z-50 bg-eventr-gray-900 w-96 p-8 pb-10 flex flex-col gap-2 justify-center rounded-lg border-2 border-eventr-gray-800"
        >
          <button className="absolute right-4 top-4 flex items-center" onClick={()=>setIsOpen(false)}><Icon icon="close"/></button>
          <div className="w-full relative text-3xl">
            <p>Welcome Back!</p>
          </div>

          <div className="relative h-2 mb-3">
            {inputErrMsg || error ? (
              <p className="text-sm text-red-600">
                <Icon icon="warning" size="12px"/> {error ? error.message : inputErrMsg}
              </p>
            ) : null}
          </div>

          <Input
            type="text"
            placeholder="Email"
            name="email"
            width="w-full"
            className="mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Password
            placeholder="Password"
            name="password"
            width="w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex flex-col items-center mt-8">
            <button
              type="submit"
              className="w-full p-2 rounded-lg bg-eventr-main text-eventr-gray-50 ring-0 duration-200 active:bg-eventr-main-light hover:bg-eventr-main-light"
              disabled={isPending}
            >
              {isPending ? (
                <p className="items-center flex animate-spin">
                  <Icon icon="progress_activity" />
                </p>
              ) : (
                <p className="font-bold">Continue</p>
              )}
            </button>

            <div className="relative flex justify-center w-full">
              <div className="absolute w-full h-[1px] top-5 rounded-full bg-eventr-gray-200" />
              <p className="relative text-xs w-fit px-2 text-center bg-eventr-gray-900 text-eventr-gray-100 my-3">
                Or Continue With
              </p>
            </div>
            <button className="w-full flex items-center justify-center gap-2 text-eventr-gray-50 p-2 rounded-lg bg-eventr-gray-800 duration-200 hover:bg-eventr-gray-700 active:bg-eventr-gray-700">
              <Google/>
              Google
            </button>
          </div>

          <div className="mt-2">
            <p className="w-full text-right text-sm text-zinc-400">
              Dont have an account?{" "}
              <Link href="/register" className="text-zinc-300 underline">
                Sign up
              </Link>
            </p>
          </div>
        </motion.form>
        </div>
      )}
      </AnimatePresence>
    
  );
}
