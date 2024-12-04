'use client'
import Icon from "@/app/_components/icon-wrapper"
import {Input, Textarea, Select } from "@/app/_components/input-wrapper";
import { useState } from "react";
import { RecoilRoot } from "recoil";
import { useRecoilState } from "recoil";
import { eventMetadataState, eventDurationState, ticketInputState, stepState } from "./atoms";
import { categories } from "@/lib/categories";

function ProgressNav() {
    const [step, setStep] = useRecoilState(stepState);
    return (
        <nav className="flex -translate-y-12 items-center justify-between px-8 py-4">
            <div className="flex items-center gap-2">
                <button onClick={()=>setStep(1)} className="text-lg">Event Details</button>
                <Icon className={`${step > 1 ? '' : 'text-zinc-400'}`} icon="chevron_right"/>
                <button onClick={()=>setStep(2)} className={`text-lg ${step > 1 ? '' : 'text-zinc-400'}`}>Ticket Details</button>
                <Icon className={`${step > 2 ? '' : 'text-zinc-400'}`} icon="chevron_right"/>
                <button onClick={()=>setStep(3)} className={`text-lg ${step > 2 ? '' : 'text-zinc-400'}`}>Performers</button>
                <Icon className={`${step > 3 ? '' : 'text-zinc-400'}`} icon="chevron_right"/>
                <button onClick={()=>setStep(4)} className={`text-lg ${step > 3 ? '' : 'text-zinc-400'}`}>Confirmation</button>
                <Icon className={`${step > 4 ? '' : 'text-zinc-400'}`} icon="chevron_right"/>
                <button onClick={()=>setStep(5)} className={`text-lg ${step > 4 ? '' : 'text-zinc-400'}`}>Images</button>
            </div>
        </nav>
    )
}

function MetadataSection() {
    const [metadata, setMetadata] = useRecoilState(eventMetadataState);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (e.target.name === 'tags') {
            setInputValue(e.target.value);
        } else {
        setMetadata((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));
        }
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ',' && inputValue.trim() !== '') {
        e.preventDefault();
        if (metadata.tags.length < 5) {
            setMetadata((prev) => ({
                ...prev,
                tags: [...prev.tags, inputValue.trim()],
            }));
            setInputValue('');
        }
        }
    };
    const handleRemoveTag = (index: number) => {
        setMetadata((prev) => ({
            ...prev,
            tags: prev.tags.filter((_, i) => i !== index),
        }));
    };

    return (
        <div className="flex flex-col gap-4 flex-grow">
            <Input type="text" label="Event Name" name="title" value={metadata.title} onChange={handleInputChange} width="w-full"
                subtext="A name that gets on everyone's mind. Can be upto 128 characters long. A-Z, a-z, 0-9, _, ! and . only"/>
            <Input type="text" label="Location" name="venue" value={metadata.venue} onChange={handleInputChange} width="w-full"/>
            <div className="flex gap-4 w-full">
                <Select label="Event Type" name="category" value={metadata.category} options={categories} onChange={handleInputChange} width="w-44"/>
                {/*Add tags logic similar to YouTube.*/}
                <div className="relative flex flex-col w-full">
                    <label htmlFor="tags" className="text-eventr-gray-50 text-lg">
                    Tags
                    </label>
                    <div className="relative w-[592px] flex h-10 items-center px-2.5 gap-1 bg-eventr-gray-750 rounded-md border border-zinc-700 overflow-x-scroll hide-scrollbar">
                        {metadata.tags.map((tag, index) => (
                        <span key={index} className="bg-eventr-gray whitespace-nowrap py-0.5 px-1.5 rounded-md flex items-center gap-1">
                            {tag}
                            <button onClick={() => handleRemoveTag(index)}><Icon icon="close" size="12px" /></button>
                        </span>
                        ))}
                        <input
                        className="py-1.5 bg-transparent outline-none flex-grow"
                        value={inputValue}
                        name='tags'
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        disabled={metadata.tags.length >= 5}
                        placeholder={metadata.tags.length >= 5 ? 'Max 5 tags allowed' : ''}
                        />
                    </div>
                    <p className="text-sm text-zinc-400">Add upto 5 tags to describe your event. Use commas to separate tags.</p>
                </div>
            </div>
            <Textarea name="description" label="Description" value={metadata.description} onChange={handleInputChange} width="w-full" height="h-32"/>
        </div>
    )
}

function Tickets() {
    interface PriceTier {
        name: string;
        timeSlot: Date;
        price: string;
        totalSeats: string;
    }
    const [metadata, setMetadata] = useRecoilState(eventMetadataState);
    const [duration, setDuration] = useRecoilState(eventDurationState);
    const [tierInput, setTierInput] = useRecoilState(ticketInputState);

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDuration((prev) => ({ ...prev, [name]: value }));
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "bookingOpenDate" || name === "bookingOpenTime") {
            setMetadata((prev) => ({
                ...prev,
                bookingOpenTime: {
                    ...prev.bookingOpenTime,
                    [name === "bookingOpenDate" ? "date" : "time"]: value,
                },
            }));
            return;}
        if (name === "bookingCloseDate" || name === "bookingCloseTime") {
            setMetadata((prev) => ({
                ...prev,
                bookingCloseTime: {
                    ...prev.bookingCloseTime,
                    [name === "bookingCloseDate" ? "date" : "time"]: value,
                },
            }));
            return;}
        setMetadata((prev) => ({ ...prev, [name]: value }));
    };
    const handleTierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "date" || name === "time") {
            setTierInput((prev) => ({
                ...prev,
                start: {
                    ...prev.start,
                    [name]: value,
                },
            }));
            return;}
        if (name === "name") {
            const existingTier = metadata.priceTiers.find(
                (tier) => tier.name.toLowerCase() === value.toLowerCase() // Case-insensitive match
            );
            if (existingTier) {
                setTierInput((prev) => ({
                    ...prev,
                    name: value,
                    price: existingTier.price,
                    totalSeats: existingTier.totalSeats,
                }));
                return;}}
        setTierInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const addTicket = () => {
        if (tierInput.start.date && tierInput.start.time && tierInput.name && !isNaN(Number(tierInput.price)) 
            && Number(tierInput.price) > 0 && !isNaN(Number(tierInput.totalSeats)) && Number(tierInput.totalSeats) > 0) {

            const newTicket = { 
                name: tierInput.name,
                timeSlot: new Date(`${tierInput.start.date}T${tierInput.start.time}`), 
                totalSeats: tierInput.totalSeats, 
                price: tierInput.price 
            };
            setMetadata((prev) => {
                const updatedTickets = [...prev.priceTiers, newTicket];
                updatedTickets.sort((a, b) => {
                    const dateTimeA = a.timeSlot;
                    const dateTimeB = b.timeSlot;
                    return dateTimeA.getTime() - dateTimeB.getTime();
                });
                return {
                    ...prev,
                    priceTiers: updatedTickets
                };
            });
            setTierInput({ ...tierInput, name: '', price: '', totalSeats: '' });
        }
    };
    const deleteTier = (timeSlot: Date, name: string) => {
        const tierTimeSlot = new Date(timeSlot)
        setMetadata((prev) => ({
            ...prev,
            priceTiers: prev.priceTiers.filter((tier) => tier.timeSlot.toISOString() !== tierTimeSlot.toISOString() || tier.name !== name)
        }));
    };
    const groupedTiers = metadata.priceTiers.reduce((acc: { [key: string]: PriceTier[] }, tier) => {
        const key = tier.timeSlot.toISOString();
        if (!acc[key]) acc[key] = [];
        acc[key].push(tier);
        return acc;
    }, {});
    const calculateTotalTickets = () => {
        return metadata.priceTiers.reduce((sum, tier) => sum + Number(tier.totalSeats), 0);
    };
    const calculateEventDates = () => {
        if (metadata.priceTiers.length === 0) return { startDate: '', endDate: '' };
    
        const dates = metadata.priceTiers
            .map((tier) => new Date(tier.timeSlot))
            .filter((date) => !isNaN(date.getTime())) 
            .sort((a, b) => a.getTime() - b.getTime());
    
        if (dates.length === 0) return { startDate: '', endDate: '' };
    
        const startDate = dates[0];
        const endDate = new Date(dates[dates.length - 1]);
    
        const durationValue = parseInt(duration.value) || 0;
        const addDuration = (unit: 'mins' | 'hours' | 'days', value: number) => {
            switch (unit) {
                case 'mins':
                    endDate.setHours(endDate.getHours() + Math.ceil(value/60));
                    break;
                case 'hours':
                    endDate.setHours(endDate.getHours() + value);
                    break;
                case 'days':
                    endDate.setDate(endDate.getDate() + value);
                    break;
            }
        };
    
        if (['mins', 'hours', 'days'].includes(duration.unit)) {
            addDuration(duration.unit as 'mins' | 'hours' | 'days', durationValue);
        }
    
        const formatOptions: Intl.DateTimeFormatOptions = {
            hour: 'numeric',
            hour12: true,
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        };
    
        return {
            startDate: startDate.toLocaleString('en-US', formatOptions),
            endDate: duration.value ? endDate.toLocaleString('en-US', formatOptions) : '',
        };
    };
    const { startDate, endDate } = calculateEventDates();

    return (
        <div className="flex flex-col gap-6 flex-grow">
            <div className="flex gap-4 w-full">
                <div className="flex flex-col">
                    <label className="text-eventr-gray-50 text-lg">Event Duration</label>
                    <div className="flex gap-2">
                        <Input type="number" name="value" value={duration.value} onChange={handleDurationChange} width="w-12"/>
                        <Select name="unit" value={duration.unit} options={['minutes', 'hours', 'days']} onChange={handleDurationChange} width="w-[104px]"/>
                    </div>
                </div>
                <Select label="Age Limit" name="ageLimit" value={metadata.ageLimit} options={['All', '13+', '18+', '21+']} onChange={handleInputChange} width="w-20"/>

                <div>
                    <label className="text-lg text-eventr-gray-50">Ticket sales start on</label>
                    <div className="flex gap-2">
                        <Input type="date" name="bookingOpenDate" value={metadata.bookingOpenTime.date} onChange={handleInputChange} width="w-36"/>
                        <Input type="time" name="bookingOpenTime" value={metadata.bookingOpenTime.time} onChange={handleInputChange} width="w-24"/>
                    </div>
                </div>
                <div>
                    <label className="text-lg text-eventr-gray-50">Ticket sales end on</label>
                    <div className="flex gap-2">
                        <Input type="date" name="bookingCloseDate" value={metadata.bookingCloseTime.date} onChange={handleInputChange} width="w-36"/>
                        <Input type="time" name="bookingCloseTime" value={metadata.bookingCloseTime.time} onChange={handleInputChange} width="w-24"/>
                    </div>
                </div>
            </div>
            <div>
                <h2 className="text-eventr-gray-50 text-lg">Add Tickets</h2>
                <div className="flex gap-2 w-full">
                    <Input type="date" name="date" value={tierInput.start.date} onChange={handleTierChange} width="w-36"/>
                    <Input type="time" name="time" value={tierInput.start.time} onChange={handleTierChange} width="w-28"/>
                    <Input type="text" name="name" value={tierInput.name} onChange={handleTierChange} width="w-full" grow placeholder="Tier Name"/>
                    <Input type="number" name="price" value={tierInput.price} onChange={handleTierChange} width="w-28" placeholder="Tier Price"/>
                    <Input type="number" name="totalSeats" value={tierInput.totalSeats} onChange={handleTierChange} width="w-24" placeholder="Quantity"/>
                    <button onClick={addTicket} className="flex items-center text-white">
                        <Icon icon="add" size="24px" />
                    </button>
                </div>
                {/* Tickets grouped by datetime */}
                <div className="border flex flex-col border-dashed border-zinc-600 rounded-md h-56 my-3 overflow-y-auto p-2">
                    {Object.keys(groupedTiers).map((datetime, index) => {
                        const formattedDateTime = new Date(datetime).toLocaleString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: 'numeric',
                            hour12: true
                        })
                    
                        return (
                            <div key={index} className="mb-4 bg-eventr-gray/25 rounded-md px-2 py-1 flex items-center gap-4">
                                <p className="text-eventr-gray-50 w-48 text-center">{formattedDateTime}</p>
                                <div className="h-full w-0.5 bg-zinc-600"/>
                                <div className="flex flex-col w-full">
                                {groupedTiers[datetime].map((tier, idx) => (
                                    <div key={idx} className="flex justify-between w-full items-center text-eventr-gray-50 my-1">
                                        <div className="flex flex-grow gap-8">
                                            <p className="w-24">{tier.name}</p>
                                            <p className="w-16">₹{tier.price}</p>
                                            <p className="w-32">{tier.totalSeats} tickets</p>
                                        </div>
                                        <button
                                            onClick={() => deleteTier(tier.timeSlot, tier.name)}
                                            className="flex items-center"
                                        >
                                            <Icon icon="close" size="18px"/>
                                        </button>
                                    </div>
                                ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="flex gap-6">
                    <div>
                        <p className="text-eventr-gray-50 text-sm">Total Tickets</p>
                        <p className="text-lg">{calculateTotalTickets()}</p>
                    </div>
                    <div>
                        <p className="text-eventr-gray-50 text-sm">Event Starts on</p>
                        <p className="text-lg">{startDate}</p>
                    </div>
                    <div>
                        <p className="text-eventr-gray-50 text-sm">Event Ends on</p>
                        <p className="text-lg">{endDate}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}


const Content = () => {
    const [step, setStep] = useRecoilState(stepState);
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <ProgressNav />

            <div className="bg-eventr-gray-900 border-2 border-eventr-gray-800 px-12 flex flex-col gap-2 py-6 -translate-y-12 w-[880px] h-[560px] rounded-md">
                {step==1 && <MetadataSection />}
                {step==2 && <Tickets />}
                <div className="w-full flex justify-end gap-4">
                    <button onClick={() => setStep(step-1)} className="w-24 py-1 gap-1 flex items-center justify-center text-lg duration-100 rounded-md border bg-eventr-gray/25 border-zinc-600"><Icon icon="arrow_back"/>Back</button>
                    <button onClick={() => setStep(step+1)} className="w-24 py-1 gap-1 flex items-center justify-center text-lg duration-100 font-bold bg-eventr-main rounded-md">Next</button>
                </div>
            </div>

            <div className="relative w-[800px] h-2 rounded-full bg-eventr-gray-500 -translate-y-8">
                <div className={`h-full ease-in-out ${step === 1 ? 'w-10' : step === 2 ? 'w-1/4' : step === 3 ? 'w-1/2' : step === 4 ? 'w-3/4' : 'w-full'} duration-500 bg-eventr-secondary rounded-full`}></div>
                <div className="absolute -top-1.5 w-full flex justify-between">
                    <div/>
                    <div className={`bg-eventr-secondary rounded-full h-6 w-6 ${step>1 ? 'delay-500 duration-150' : 'opacity-0'}`}><Icon className="text-eventr-gray-500" icon="task_alt"/></div>
                    <div className={`bg-eventr-secondary rounded-full h-6 w-6 ${step>2 ? 'delay-500 duration-150' : 'opacity-0'}`}><Icon className="text-eventr-gray-500" icon="task_alt"/></div>
                    <div className={`bg-eventr-secondary rounded-full h-6 w-6 ${step>3 ? 'delay-500 duration-150' : 'opacity-0'}`}><Icon className="text-eventr-gray-500" icon="task_alt"/></div>
                    <div className={`bg-eventr-secondary rounded-full h-6 w-6 ${step>4 ? 'delay-500 duration-150' : 'opacity-0'}`}><Icon className="text-eventr-gray-500" icon="task_alt"/></div>
                </div>
            </div>
        </div>
    )
}

export default function Page() {

    return (
        <RecoilRoot>
            <Content/>
        </RecoilRoot>
    )
}