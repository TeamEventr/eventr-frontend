import Link from "next/link"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faX } from "@fortawesome/free-solid-svg-icons"

export default function ProfileSettings () {
    return (
        <div className="absolute left-1/2 top-8 z-50 -translate-x-1/2 w-full flex items-center justify-center md:p-4 ">
            <div className="relative flex flex-col gap-4 bg-zinc-950 border border-gray-700/50 w-full md:w-[560px] p-8 md:rounded-xl">
                <div className="absolute top-4 right-4">
                    <Link href={'/myprofile'}><FontAwesomeIcon icon={faX}/></Link>
                </div>
                <h1 className="font-bold text-xl">Settings</h1>

                <div className="flex flex-col gap-2">
                    <h3>Notifications</h3>
                </div>
            </div>
        </div>
    )
}