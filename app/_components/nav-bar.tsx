"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import Login from "./login-modal";
import { useParams } from "next/navigation";
import { useRecoilState } from "recoil";
import { showLoginModalState } from "@/api/atoms";

export default function NavBar() {
    const pathname = usePathname();    
    const params = useParams();
    // const genderOutput = userDetailsHome?.userGender === "male" ? "boy" : "girl";
    // <Image className="object-cover rounded-full border-2 border-gray-700 border-opacity-30" src={userDetailsHome.profilePicUrl ? userDetailsHome.profilePicUrl : `https://avatar.iran.liara.run/public/${genderOutput || "boy"}`} fill alt="profile" />                
    const [ isOpen, setIsOpen ] = useRecoilState(showLoginModalState);

    return (
        
        (pathname !== '/host/dashboard') ?
        <nav className="flex items-center justify-between px-3 md:px-6 py-2 w-full h-[56px] overflow-x-hidden bg-gradient-to-tr from-zinc-800/30 to-slate-800/30 z-50 border-b-2 border-gray-700/30">
            <div className="flex gap-4 items-center">
                <Link href={'/'} className="font-gothic text-3xl tracking-widest mr-2 text-eventr-secondary">EVENTR</Link>
                <Link href="/#team-section" className="hidden md:block text-sm opacity-75 hover:opacity-100 duration-150">Become a Host</Link>
                <p className="hidden md:block opacity-75 text-sm hover:opacity-100 duration-150">About Us</p>
            </div>
            <div className="flex md:gap-2">
                <button className="py-1.5 active:scale-90 font-bold px-3 rounded-md bg-eventr-gray-800 duration-200 hover:bg-eventr-gray-700" onClick={()=> setIsOpen(!isOpen)}>Login</button>
                <Link className="py-1.5 active:scale-90 font-bold px-3 rounded-md bg-eventr-main hover:bg-eventr-main-light duration-200" href='/register'>Sign Up</Link>
            </div>
        </nav>  
        
        : null 
    );
}
