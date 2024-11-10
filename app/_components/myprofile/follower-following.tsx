'use client'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function FollowerFollowing(props: {tab: string}) {
    const [tab, setTab] = useState<string>(props.tab);
    return (
        <div className="absolute left-1/2 top-0 md:top-8 z-50 -translate-x-1/2 w-full flex items-center justify-center md:p-4 ">
            <div className="relative flex h-screen md:h-fit flex-col gap-4 bg-zinc-950 border border-gray-700/50 w-full md:w-[560px] p-8 md:rounded-xl">
                <div className="absolute top-4 right-4">
                    <Link href={'/myprofile'}><FontAwesomeIcon icon={faX}/></Link>
                </div>
                <div>
                    <div className='flex gap-6'>
                        <button onClick={() => setTab('followers')} className={`font-bold text-xl ${tab === "following" ? 'text-gray-500' : ''}`}>Followers</button>
                        <button onClick={() => setTab('following')} className={`font-bold text-xl ${tab === "followers" ? 'text-gray-500' : ''}`}>Following</button>
                    </div>
                    <div className='h-1 w-full'>
                        <div className={` bg-eventr-main rounded-full h-1 transition-transform duration-200 ${tab === "followers" ? 'w-[86px]' : 'translate-x-[106px] w-[86px] '}`}></div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h3>Followers</h3>
                </div>
            </div>
        </div>
    )
}