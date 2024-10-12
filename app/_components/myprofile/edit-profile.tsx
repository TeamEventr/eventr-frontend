'use client'
import { faChevronRight, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState, useEffect } from "react";
import ky, { HTTPError } from "ky";
import { API_ENDPOINTS } from "@/server/endpoints";
import Link from "next/link";

interface CheckUsernameResponse {
    available: boolean;
    message?: string;
}

export default function EditProfile() {
    const [editUsername, setEditUsername] = useState<boolean>(false);
    const [editFullName, setEditFullName] = useState<boolean>(false);
    const [editPhoneNumber, setEditPhoneNumber] = useState<boolean>(false);
    const [editProfilePicture, setEditProfilePicture] = useState<boolean>(false);

    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
    const [inputErrMsg, setInputErrMsg] = useState<string | null>(null);

    const [userName, setUserName] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const checkUserName = async (userName: string) => {
        try {
            const response = await ky.post(API_ENDPOINTS.USERNAME_CHECK,{
                headers: {
                'Content-Type': 'application/json',
                },
                json: {username: userName}
            }).json<CheckUsernameResponse>();
            setIsAvailable(response.available)
        }
        catch (error) {
            if(error instanceof HTTPError){
                const errorData = await error.response.json();
                if (error.response.status === 500) {
                    setInputErrMsg("Server error. Please try again later.");
                } else if(error.response.status === 409){
                    setInputErrMsg("Username is already taken.");
                    setIsAvailable(false);
                } else {
                    setInputErrMsg("An unexpected error occurred. Please try again.");
                }
            } else {
                setInputErrMsg("An unexpected error occurred. Please try again.");
                setIsAvailable(false);
            }
        }
    }

    useEffect(() => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        if(userName.length > 0){
            setTypingTimeout(setTimeout(() => {
                checkUserName(userName);
            }, 1000));
        } else {
            setIsAvailable(null)
        }
        return () => {
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
        };
    }, [userName]);

    const updateUsername = async () => {
        setInputErrMsg(null);
        if (!/^[a-zA-Z0-9_]{3,15}$/.test(userName)) {
            setInputErrMsg("Username must be between 3 and 15 characters long and can only contain letters, numbers, and underscores.");
            return;
        }
        await checkUserName(userName);
        if (isAvailable) {
            try {
                await ky.put(API_ENDPOINTS.USERNAME_UPDATE, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    json: { username: userName }
                });
                setEditUsername(false);
            } catch (error) {
                if (error instanceof HTTPError) {
                    const errorData = await error.response.json();
                    if (error.response.status === 500) {
                        setInputErrMsg("Server error. Please try again later.");
                    } else {
                        setInputErrMsg("An unexpected error occurred. Please try again.");
                    }
                } else {
                    setInputErrMsg("An unexpected error occurred. Please try again.");
                }
            }
        }
    }
    
    return (
        <div className="absolute left-1/2 top-8 z-50 -translate-x-1/2 w-full flex items-center justify-center md:p-4 ">
            <div className="relative flex flex-col gap-4 bg-zinc-950 border border-gray-700/50 w-full md:w-[560px] p-8 md:rounded-xl">
                <div className="absolute top-4 right-4">
                    <Link href={'/myprofile'}><FontAwesomeIcon icon={faX}/></Link>
                </div>
                <div className="w-full flex flex-col items-center">
                    <div className="relative h-36 w-36 rounded-full">
                        <Image alt="profile" className="object-cover rounded-full" fill src="https://images.unsplash.com/photo-1654900168832-a59290b01d77?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                    </div>
                    <p>@janedoe11</p>
                    <p>Jane Doe</p>
                </div>
                <h1 className="font-bold text-xl">Edit Profile</h1>
                {(!editUsername && !editFullName && !editPhoneNumber && !editProfilePicture) && 
                <div className="flex flex-col gap-2">
                    <button onClick={() => setEditUsername(true)} className="py-3 px-4 bg-gradient-to-tr from-zinc-800/50 to-slate-800/50 rounded-md flex justify-between items-center"><p>Username</p><FontAwesomeIcon icon={faChevronRight}/></button>
                    <button onClick={() => setEditFullName(true)} className="py-3 px-4 bg-gradient-to-tr from-zinc-800/50 to-slate-800/50 rounded-md flex justify-between items-center"><p>Full Name</p><FontAwesomeIcon icon={faChevronRight}/></button>
                    <button onClick={() => setEditPhoneNumber(true)} className="py-3 px-4 bg-gradient-to-tr from-zinc-800/50 to-slate-800/50 rounded-md flex justify-between items-center"><p>Phone Number</p><FontAwesomeIcon icon={faChevronRight}/></button>
                    <button onClick={() => setEditProfilePicture(true)} className="py-3 px-4 bg-gradient-to-tr from-zinc-800/50 to-slate-800/50 rounded-md flex justify-between items-center"><p>Profile Picture</p><FontAwesomeIcon icon={faChevronRight}/></button>
                </div>
                }
                {editUsername &&
                <div className="flex flex-col gap-2">
                    <div className="relative">
                        <label htmlFor="userName" className="text-zinc-400">Username</label>
                        <input
                            value={userName}
                            id="userName"
                            onChange={(e) => setUserName(e.target.value)} 
                            className={`w-full p-1 rounded-lg bg-zinc-900 border border-gray-500 border-opacity-10 
                                outline-none hover:ring-1  focus:ring-1 ring-gray-900 
                                ${isAvailable === null ? '' : isAvailable ? 'ring-1 ring-green-500' : 'ring-1 ring-red-500'}`}
                        />    
                        <p className="text-sm text-zinc-400">This is how others can find you.</p>    
                    </div>
                    <p className="h-6 text-red-500">{inputErrMsg}</p>
                    <div className="flex gap-4 justify-end">
                        <button onClick={updateUsername} className="py-3 px-4 w-24 bg-gradient-to-tr from-zinc-800/50 to-slate-800/50 duration-200 hover:bg-eventr-main rounded-md">Save</button>
                        <button onClick={() => setEditUsername(false)} className="py-3 px-4 bg-gradient-to-tr from-zinc-800/50 to-slate-800/50 duration-200 hover:bg-zinc-500/50 rounded-md">Cancel</button>
                    </div>            
                </div>
                }
                {editFullName &&
                    <div className="flex flex-col gap-2">
                    <div>
                        <label htmlFor="fullName" className="text-zinc-400">Full Name</label>
                        <input
                            id="fullName"
                            type="text"
                            value={fullName}
                            onChange={e  => setFullName(e.target.value)}
                            className="w-full p-1 rounded-lg bg-zinc-900 border border-gray-500 border-opacity-10 outline-none hover:ring-1 focus:ring-1 ring-gray-900"
                        />
                    </div>
                    <p className="h-6 text-red-500">{inputErrMsg}</p>
                    <div className="flex gap-4 justify-end">
                        <button onClick={updateUsername} className="py-3 w-24 px-4 bg-gradient-to-tr from-zinc-800/50 to-slate-800/50 duration-200 hover:bg-eventr-main rounded-md">Save</button>
                        <button onClick={() => setEditFullName(false)} className="py-3 px-4 bg-gradient-to-tr from-zinc-800/50 to-slate-800/50 duration-200 hover:bg-zinc-500/50 rounded-md">Cancel</button>
                    </div>            
                </div>
                }
                {editPhoneNumber &&
                <div className="flex flex-col gap-2">
                    <div className="relative">
                        <label htmlFor="phoneNumber" className="text-zinc-400">Phone Number</label>
                        <input
                            id="phoneNumber"
                            type="tel"
                            inputMode="numeric"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full p-1 pl-8 rounded-lg bg-zinc-900 border border-gray-500 border-opacity-10 outline-none hover:ring-1 focus:ring-1 ring-gray-900"
                        />
                        <span className="absolute left-1.5 top-1/2 text-zinc-400">+91</span>
                    </div>
                    <p className="h-6 text-red-500">{inputErrMsg}</p>
                    <div className="flex gap-4 justify-end">
                        <button onClick={updateUsername} className="py-3 w-24 px-4 bg-gradient-to-tr from-zinc-800/50 to-slate-800/50 duration-200 hover:bg-eventr-main rounded-md">Save</button>
                        <button onClick={() => setEditPhoneNumber(false)} className="py-3 px-4 bg-gradient-to-tr from-zinc-800/50 to-slate-800/50 duration-200 hover:bg-zinc-500/50 rounded-md">Cancel</button>
                    </div>
                </div>
                }
                {editProfilePicture &&
                    <div>
                        <p>Profile Picture</p>
                        Set up uploadthing here
                        <button onClick={() => setEditProfilePicture(false)}>Cancel</button>
                    </div>
                }
            </div>
        </div>
    );
}