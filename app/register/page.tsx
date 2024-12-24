"use client"
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import secureLocalStorage from "react-secure-storage";
import { createHash } from "crypto";
import { Input, Password } from "../_components/input-wrapper";
import Icon from "../_components/icon-wrapper";
import { useRegister, useUsernameCheck } from "@/api/hooks";
import { Auth } from "@/api/types";

export default function SignUp() {

    const router = useRouter();
    
    const [username, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const host = useSearchParams().get('host');

    const [isAvailable, setIsAvailable] =  useState<boolean | null>(null);
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

    const [inputErrMsg, setInputErrMsg] = useState<string | null>(null); 
    const [signUpErrMsg, setSignUpErrMsg] = useState<string>('')

    const usernameRef = useRef<HTMLInputElement>(null);
    const termsRef = useRef<HTMLInputElement>(null);
    
    const { mutate: signUp, isPending } = useRegister();
    
    useEffect(() => {
        if (usernameRef.current) {
            usernameRef.current.focus();
        }
    }, []);

    const { mutate: checkUserName } = useUsernameCheck();

    useEffect(() => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        if (username.length > 0) {
            setTypingTimeout(setTimeout(() => {
                checkUserName(username, {
                    onSuccess: (available) => {
                        setIsAvailable(available);
                    },
                });
            }, 1000));
        } else {
            setIsAvailable(null);
        }
        return () => {
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
        };
    }, [username]);
    

    const checkPasswordStrength = (password: string): number => {
        let conditionsMet = 0;
        if (/[A-Z]/.test(password)) conditionsMet++;
        if (/[a-z]/.test(password)) conditionsMet++;
        if (/\d/.test(password)) conditionsMet++;
        if (password.length >= 8) conditionsMet++; 
        return conditionsMet;
    };

    const handleSignUp = async (event: React.FormEvent) => {
        event.preventDefault();
        setInputErrMsg(null);
        setSignUpErrMsg("");
    
        //Conditions to check if inputs are correct
        const conditions = [
          { condition: username === "" || email === "" || password === "" || confirmPassword === "", message: "Please fill all the fields." },
          { condition: username.length < 5 || username.length > 32, message: "Username must be 5-25 characters long." },
          { condition: !/^[a-zA-Z0-9_.]+$/.test(username), message: "Username can only have letters, numbers . and _." },
          { condition: isAvailable === false, message: "Username is already taken." },
          { condition: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), message: "Email is not in the correct format." },
          { condition: checkPasswordStrength(password) < 4, message: "Password must contain A-Z, a-z and 0-9." },
          { condition: password.length < 8 && password.length > 30, message: "Password must be between 8 and 30 characters long." },
          { condition: password !== confirmPassword, message: "Passwords do not match." },
          { condition: !termsRef.current?.checked, message: "Please agree to the terms and conditions." },
        ];
    
        for (const { condition, message } of conditions) {
          if (condition) {
            setInputErrMsg(message);
            return;
          }
        }
        const encryptedPass = createHash("sha256").update(password).digest("hex");
        //Create SigUpDetails onbject
        const userSignUp: Auth.RegisterRequest = {
            username: username,
            email: email,
            password: encryptedPass
        };


        signUp(userSignUp, {
            onSuccess: () => {
                if (host) {
                    router.push("/register/otp?verify=user&host=true");
                } else {
                    router.push("/register/otp?verify=user");
                }
            },
            onError: (error: Error) => {
                if (error.message === "Redirect to OTP") {
                    if (host) {
                        router.push("/register/otp?verify=user&host=true");
                    } else {
                        router.push("/register/otp?verify=user");
                    }
                } else {
                    setSignUpErrMsg(error.message);
                }
            }
        });
    }
    

    return(
    <div className="relative flex h-full my-16 items-center justify-center">
        <div className="flex border-2 border-eventr-gray-800 bg-eventr-gray-900 rounded-lg">
            <div className="relative m-4 mr-0 hidden md:block w-96">
                <Image fill priority className="object-cover rounded-l-lg" src="/signup.jpg" alt="Eventr Logo" />
            </div>
            <form onSubmit={handleSignUp} className=" w-96 p-6 flex flex-col gap-4 justify-center relative">
                <div className="w-full relative text-3xl">
                    <p>Create Account</p>
                </div>

                <div className="relative h-2 mb-0.5">
                    {inputErrMsg ? <p className="text-sm text-red-600"><Icon icon="warning"/> {inputErrMsg}</p> : null}
                    {signUpErrMsg ? <p className="text-sm text-red-600"><Icon icon="warning"/> {signUpErrMsg}</p> : null}
                </div>

                <input
                    ref={usernameRef}
                    value={username}
                    id="username"
                    placeholder="Username"
                    onChange={(e) => setUserName(e.target.value)} 
                    className={`w-full px-2.5 py-1.5 bg-eventr-gray-800 rounded-md border border-eventr-gray-700 outline-none
                        ${isAvailable === null ? '' : isAvailable ? 'ring-1 ring-green-500' : 'ring-1 ring-red-500'}`}
                />   

                <Input type="text" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} width="w-full"/>

                <div className="relative">
                    <Password placeholder="Password" name="password" width="w-full" value={password} onChange={(e) => setPassword(e.target.value)} />                
                    <div className="flex gap-1 w-full  my-1">
                        <div className={`${checkPasswordStrength(password) >= 1 ? "bg-green-800" : "bg-zinc-800"} h-1 flex-1 rounded-full`}></div>
                        <div className={`${checkPasswordStrength(password) >= 2 ? "bg-green-800" : "bg-zinc-800"} h-1 flex-1 rounded-full`}></div>
                        <div className={`${checkPasswordStrength(password) >= 3 ? "bg-green-800" : "bg-zinc-800"} h-1 flex-1 rounded-full`}></div>
                        <div className={`${checkPasswordStrength(password) >= 4 ? "bg-green-800" : "bg-zinc-800"} h-1 flex-1 rounded-full`}></div>
                    </div>
                </div>

                <Password placeholder="Confirm Password" name="confirmpassword" width="w-full" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                <div className="flex gap-1 text-xs text-eventr-gray-100">
                    <input ref={termsRef} type="checkbox" className="opacity-75"/>
                    <p>I agree to the <Link href='/terms' className="underline">Terms and Conditions</Link></p>
                </div>

                <div className="flex flex-col items-center mt-4">

                    <button type="submit"
                        className="w-full p-2 rounded-lg bg-zinc-900 text-zinc-300 border border-gray-500 border-opacity-10 hover:ring-1 focus:ring-1 ring-gray-900"
                        disabled={isPending}>
                    {isPending ? <Icon icon="progress_activity" spin/> : <p>Create Account</p>}</button>

                    <p className="text-xs text-zinc-400 my-1">or</p>

                    <button type="button" className="w-full flex items-center justify-center gap-2 text-zinc-300 p-2 rounded-lg bg-zinc-900 border border-gray-500 border-opacity-10 hover:ring-1 focus:ring-1 ring-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg>
                        Sign In with Google
                    </button>

                </div>

                <div className="mt-2">
                    <p className="w-full text-right text-sm text-eventr-gray-100">Already have an account? <Link href='/?login=open' className="text-zinc-300 underline">Login</Link></p>
                </div>
            </form>
        </div>
    </div>
    )
}