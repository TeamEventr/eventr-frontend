'use client'
import Home from "@/app/_components/dashboard/home"
import SearchBar from "@/app/_components/search-bar"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function Page() {
    const params = useSearchParams()
    const tab = params.get("tab")
    return (
        <div className="flex flex-col h-screen">
            <div className="flex px-4 relative h-12 items-center bg-zinc-900 border-b border-zinc-500/50 ">
                <div className="w-48">
                    <h1 className="p-2">Dashboard</h1>
                </div>
                <div className="relative w-[1px] bg-zinc-500/50 h-full"></div>
                <div className="flex gap-8 justify-end flex-grow">
                    <input className="w-96"/>
                    <button>Add Event</button>
                    <button>Log out</button>
                </div>
            </div>
            <div className="flex flex-grow">
                <div className="flex flex-col bg-zinc-900 w-52 px-4">
                    <Link href={"?tab=profile"}>
                        <div className="relative w-32 aspect-1 object-cover">
                            <Image fill className="rounded-full" src="/1.jpg" alt="profile"/>
                        </div>
                    </Link>
                    <Link href={"?tab=home"}>Home</Link>
                    <Link href={"?tab=events"}>Events</Link>
                    <Link href={"?tab=analytics"}>Analytics</Link>
                    <Link href={"?tab=payments"}>Payments</Link>
                    <Link href={"?tab=customers"}>Customers</Link>
                    <Link href={"?tab=help"}>Help</Link>
                </div>
                <div className="w-[1px] h-full bg-zinc-500/50"></div>
                <div>
                    {tab === "profile" && <h1>Profile</h1>}
                    {tab === "home" && <Home/>}
                    {tab === "events" && <h1>Events</h1>}
                    {tab === "analytics" && <h1>Analytics</h1>}
                    {tab === "payments" && <h1>Payments</h1>}
                    {tab === "customers" && <h1>Customers</h1>}
                    {tab === "help" && <h1>Help</h1>}
                </div>
            </div>
        </div>
    )
}