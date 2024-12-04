import Image from "next/image"

export default function EventCard(){
    return (
        <div className="relative bg-eventr-gray-900 border-2 border-eventr-gray-800 w-52 flex-shrink-0 flex flex-col rounded-md">
            <div className="relative rounded-t-md w-full bg-eventr-gray-950 h-72">
                <Image fill priority className="rounded-t-md object-cover" alt="eventDetails.eventName" src="https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
            </div>
            <div className="absolute top-1.5 left-1.5 px-1 rounded-md bg-eventr-gray-700">
                    <p className="text-xs font-bold relative top-1">JUL</p>
                    <p className="text-md lg:text-xl text-eventr-secondary font-bold text-center">31</p>
                </div>
            <div className="flex gap-2 p-1.5">
                
                <div>
                    <h2 className="text-lg truncate w-48">This is the title but longer just checking</h2>
                    <p className="text-xs w-40 hidden lg:block truncate-text">eventDetails.eventLocation</p>
                </div>
            </div>
        </div>
    )
}