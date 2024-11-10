import Link from "next/link"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faX } from "@fortawesome/free-solid-svg-icons"
import ProfileSettings from "@/app/_components/myprofile/profile-settings"


export default function Page() {
    return (
        <div className="relative h-screen">
            <ProfileSettings/>
        </div>
    )
}