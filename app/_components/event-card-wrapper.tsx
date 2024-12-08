import Image from "next/image"

import { EventListHomeResponse } from "@/api/types"
import { motion } from "motion/react";

export default function EventCard({eventDetails, loading} : {eventDetails:EventListHomeResponse, loading?: boolean}) {
    const eventDate = new Date(eventDetails.startTime);
    const month = eventDate.toLocaleString('default', { month: 'short' }).toUpperCase();
    const date = eventDate.getDate();
    if (loading){
        return (
            <div className="relative bg-eventr-gray-900 border-2 border-eventr-gray-800 w-[180px] lg:w-[216px] h-72 lg:h-80 flex-shrink-0 flex flex-col rounded-md animate-pulse"/>
        )
    }
    return (
        
        <motion.div 
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 15, opacity: 0 }}
        className="relative w-[180px] lg:w-[216px] bg-eventr-gray-900 border-2 border-eventr-gray-800 flex-shrink-0 flex flex-col rounded-md">
            <div className="relative rounded-t-md w-full bg-eventr-gray-950 h-60 lg:h-72">
                <Image fill priority className="rounded-t-md object-cover" alt="eventDetails.eventName" src="https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
            </div>
            <div className="absolute top-1.5 left-1.5 px-1 rounded-md bg-eventr-gray-700">
                    <p className="text-xs font-bold relative top-1">{month}</p>
                    <p className="text-md lg:text-xl text-eventr-secondary font-bold text-center">{date}</p>
                </div>
            <div className="flex gap-2 p-1.5">
                
                <div>
                    <h2 className="lg:text-lg truncate w-48">{eventDetails.title}</h2>
                    <p className="text-xs w-40 truncate-text">{eventDetails.venue}</p>
                </div>
            </div>
        </motion.div>
    )
}