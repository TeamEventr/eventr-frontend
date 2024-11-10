'use client'
import Image from "next/image";
import Link from "next/link";
import EditProfile from "../_components/myprofile/edit-profile";
import EventCard from "../_components/event-card";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import ProfileSettings from "../_components/myprofile/profile-settings";
import FollowerFollowing from "../_components/myprofile/follower-following";
export default function Page() {
    const params = useSearchParams();
    const view = params.get('view')    
    const tab = params.get('tab')
    const tickets = [1, 2]

    return (
        
        <div className="relative flex flex-col md:flex-row p-4">
            {view === 'edit' ? <EditProfile page={false} /> : null}
            {view === 'settings' ? <ProfileSettings/> : null}
            {(tab === 'followers' || tab === 'following') ? <FollowerFollowing tab={tab || ''}/> : null}
            <div className="relative flex-grow lg:min-w-[600px] md:w-[400px] lg:w-full md:h-screen">
                <div className="flex flex-col">
                    <div className=" flex my-4 items-start">
                        <div className="flex gap-4 items-center">
                            <div className="relative h-36 w-36 rounded-full">
                                <Image alt="profile" className="object-cover rounded-full" fill src="https://images.unsplash.com/photo-1654900168832-a59290b01d77?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-xl">Jane</p>
                                <p className="-mt-1 text-gray-300">@janedoe11</p>
                                <div className="hidden lg:flex gap-4 mt-3">
                                    
                                    <Link href={'/myprofile?tab=followers'} className="flex gap-1">
                                        <p className="font-bold">334</p>
                                        <p>Followers</p>
                                    </Link>
                                    <Link href={'/myprofile?tab=following'} className="flex gap-1">
                                        <p className="font-bold">1</p>
                                        <p>Following</p> 
                                    </Link>
                                    <div className="flex gap-1">
                                        <p className="font-bold">4</p>
                                        <p>Events Attended</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-2 w-full flex justify-around lg:hidden">
                    <Link href='/myprofile?tab=followers' className="flex flex-col items-center">
                        <p className="text-lg">334</p>
                        <p className="text-sm">Followers</p>
                    </Link>
                    <Link href='/myprofile?tab=following' className="flex flex-col items-center">
                        <p className="text-lg">1</p>
                        <p className="text-sm">Following</p>
                    </Link>
                    <div className="flex flex-col items-center">
                        <p className="text-lg">4</p>
                        <p className="text-sm">Attended</p>
                    </div>
                </div>
                <div className="hidden md:flex flex-col w-full mt-4">
                    <h2 className="w-full text-xl">Events Attended</h2>
                    <div className="grid grid-cols-5 gap-4 place-items-center mx-auto">

                    </div>
                </div>
            </div>
            <div className="mt-6 md:mt-0 flex flex-col gap-6 relative">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-baseline">
                        <h2 className="text-xl">My Tickets</h2>
                        <Link className="text-xs text-gray-400 underline" href="/mytickets">View All</Link>
                    </div>
                    <div className="flex gap-4">
                        <div className="relative flex flex-col rounded-md bg-white w-36 h-48">
                        </div>
                        <div className="relative flex flex-col rounded-md bg-white w-36 h-48">
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl">Account</h2>
                    <div className="flex flex-col gap-2">
                        <Link href='/myprofile?view=edit' className='hidden md:block p-2 border duration-200 border-gray-700/50 rounded-md text-center editTab bg-gradient-to-tr from-zinc-800/50 to-slate-800/50 hover:bg-gray-500/50'>Edit Profile</Link>
                        <Link href='/myprofile/edit' className='block md:hidden p-2 border duration-200 border-gray-700/50 rounded-md text-center editTab bg-gradient-to-tr from-zinc-800/50 to-slate-800/50 hover:bg-gray-500/50'>Edit Profile</Link>
                        <Link href='/myprofile/purchases' className="p-2 border hover:bg-gray-500/50 duration-200 border-gray-700/50 rounded-md text-center bg-gradient-to-tr from-zinc-800/50 to-slate-800/50">My Purchases</Link>
                        <Link href='/myprofile?view=settings' className="hidden md:block p-2 border hover:bg-gray-500/50 duration-200 border-gray-700/50 rounded-md text-center bg-gradient-to-tr from-zinc-800/50 to-slate-800/50">Settings</Link>
                        <Link href='/myprofile/settings' className="block md:hidden p-2 border hover:bg-gray-500/50 duration-200 border-gray-700/50 rounded-md text-center bg-gradient-to-tr from-zinc-800/50 to-slate-800/50">Settings</Link>
                    </div>
                </div>
                <div className="flex md:hidden flex-col w-full">
                    <h2 className="w-full text-xl">Events Attended</h2>
                    <div className="grid grid-cols-5 gap-4 place-items-center mx-auto">

                    </div>
                </div>
            </div>
        </div>
    )
}