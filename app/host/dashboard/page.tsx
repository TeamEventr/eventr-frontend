'use client'
import {ticketSales, ticketClasses} from '@/app/_components/dashboard-dummy-data'
import { PureComponent, SetStateAction } from 'react'
import Icon from '@/app/_components/icon-wrapper'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, TooltipProps, ResponsiveContainer, Label } from 'recharts';
import { PieChart, Pie, Sector, Cell } from "recharts";
import { useState, useCallback } from 'react'

function DashboardNav() {
    return (
        <nav className='w-screen bg-eventr-gray flex px-4 py-2 border-b-2 border-zinc-700'>
            <div className='flex gap-4 items-center w-44'>
                <Icon icon='menu' size='32px'/>
                <Link href={'/'} className='font-gothic text-3xl tracking-widest mr-2'>EVENTR</Link>
            </div>
            <div className='flex-grow'>
                <input className='w-96'/>
            </div>
            <div className='flex gap-4 items-center'>
                <Icon icon='notifications' size='28px'/>
                <Link href='/host/create' className='bg-eventr-main flex items-center font-bold px-2 py-1 rounded-md'>
                    <Icon icon='add'/> Create
                </Link>
                <div className='flex items-center gap-1'>
                    <Icon icon='account_circle' size='32px'/>
                    <div className='flex flex-col text-xs translate-y-0.5'>
                        <p className='font-bold'>Full Name</p>
                        <p className='-translate-y-1 font-thin'>Company Name</p>
                    </div>
                </div>
            </div>
        </nav>
    )
}

function DashboardSidebar({ tab }: { tab: string }) {
    return (
        <section className='bg-eventr-gray flex flex-col gap-1 w-48 p-4 border-r-2 border-zinc-700'>
            <Link className={`flex items-center px-2 py-1 gap-2 rounded-md duration-200 ${tab === 'dashboard' && 'bg-eventr-main font-bold'}`} href={'?tab=dashboard'}><Icon icon='grid_view'/><p className='text-lg'>Dashboard</p></Link>
            <Link className={`flex items-center px-2 py-1 gap-2 rounded-md duration-200 ${tab === 'events' && 'bg-eventr-main font-bold'}`} href={'?tab=events'}><Icon icon='analytics'/><p className='text-lg'>Events</p></Link>
            <Link className={`flex items-center px-2 py-1 gap-2 rounded-md duration-200 ${tab === 'analytics' && 'bg-eventr-main font-bold'}`} href={'?tab=analytics'}><Icon icon='event_note'/><p className='text-lg'>Analytics</p></Link>
            <Link className={`flex items-center px-2 py-1 gap-2 rounded-md duration-200 ${tab === 'payments' && 'bg-eventr-main font-bold'}`} href={'?tab=payments'}><Icon icon='payments'/><p className='text-lg'>Payments</p></Link>
            <Link className={`flex items-center px-2 py-1 gap-2 rounded-md duration-200 ${tab === 'customers' && 'bg-eventr-main font-bold'}`} href={'?tab=customers'}><Icon icon='chat'/><p className='text-lg'>Messages</p></Link>
        </section>
    )
}



function Dashboard() {
    const ts = ticketSales
    const tc = ticketClasses
    const [activeIndex, setActiveIndex] = useState<number>(1);

    const handleMouseEnter = useCallback((_data: any, index: number) => {
        setActiveIndex(index);
    }, []);


    const getFillColor = (index: number) => {
        if (activeIndex === undefined || activeIndex === index) {
        return "#8884d8";
        }

        return "#D9D9D93D";
    };

    const CustomTooltip = ({ active, payload }: TooltipProps<any, any>) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    backgroundColor: '#040404',
                    color: '#fff',
                    padding: '5px',
                    borderRadius: '5px',
                    fontSize: '14px'
                }}>
                    <h4>{payload[0].payload.date}</h4>
                    <p>{payload[0].value}</p>
                </div>
            );
        }
    
        return null; // Return null if not active
    };
    return (
        <div className='flex w-full'>
            <section id='home' className='p-4 mt-2 w-full flex-grow basis-0'>
                
                <div id='top-events'>
                    <h2 className='text-xl font-bold'>Top Events</h2>
                    <div className='flex w-full gap-2 mt-2'>
                        <div className='flex-grow'>
                            <p>Latest Event</p>
                            <div className='bg-cyan-700 min-w-64 rounded-md aspect-w-4 aspect-h-3'></div>
                        </div>
                        <div className='flex-grow'>
                            <p>Highest Sales</p>
                            <div className='bg-cyan-700 min-w-64 rounded-md aspect-w-4 aspect-h-3'></div>
                            
                        </div>
                        <div className='flex-grow'>
                            <p>Best Rated</p>
                            <div className='bg-cyan-700 min-w-64 rounded-md aspect-w-4 aspect-h-3'></div>
                        </div>
                    </div>
                </div>

                <div id="home-analytics" className='mt-2 flex gap-2'>

                    <div className="h-72 min-w-[480px] flex-grow bg-eventr-gray p-4 pl-0 pb-8 rounded-md">
                        <h3 className="ml-6 mb-3 flex items-center gap-1">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M3.5,18.5L9.5,12.5L13.5,16.5L22,6.92L20.59,5.5L13.5,13.5L9.5,9.5L2,17L3.5,18.5Z" />
                            </svg>
                            Ticket Sales
                        </h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart width={500} height={300} data={ts} margin={{ top: 5, right: 25, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00c944" stopOpacity={1} />
                                <stop offset="95%" stopColor="#009000" stopOpacity={0.4} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} strokeDasharray="2 2" stroke="#404040" />
                            <XAxis
                                tick={{ fontSize: 12 }} tickSize={8} interval={0} xAxisId={0} dataKey="time"
                            />
                            <XAxis tick={{ dy: -10 }} offset={10} tickSize={0} interval={0} axisLine={false} tickLine={false} xAxisId={1} allowDuplicatedCategory={false} dataKey="date"/>
                            <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} type="number" domain={['dataMin - 10', 'dataMax + 10']}/>
                            <Tooltip content={<CustomTooltip/>}/>
                            <Line type="monotone" dot={false} activeDot dataKey="sales" stroke="url(#salesGradient)" strokeWidth={2}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className='h-72 w-72 bg-eventr-gray rounded-md'>
                        <ResponsiveContainer width="100%" height="100%" >
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={tc}
                                    cx={140}
                                    cy={140}
                                    innerRadius={50}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="ticketsSold"
                                    onMouseEnter={handleMouseEnter}
                                    isAnimationActive={true}
                                    >
                                    {tc.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={getFillColor(index)}
                                        stroke='#121212'
                                        style={{
                                        transition: "fill .2s ease-in-out",
                                        filter: `drop-shadow(0px 0px 5px ${getFillColor(index)})`
                                        }}
                                    />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </section>
            <section id='activity' className='w-48 flex-shrink-0 pr-4 pt-4'>
                <div className='bg-eventr-gray p-2 rounded-md'>
                    <h2 className='text-center text-xl font-bold'>Activity</h2>
                    <div className='flex flex-col'>

                    </div>
                </div>
                <div className='mt-4'>
                    <h2 className='text-center text-xl font-bold mb-2'>What's New</h2>
                    <div className='flex flex-col justify-center gap-4 bg-gradient-to-br from-cyan-600 to-slate-600 py-6 p-4 rounded-md'>
                        <h3 className='text-2xl font-bold leading-none text-center'>Take A Quick Tour</h3>
                        <button className='bg-white text-black px-2 rounded-md font-bold text-xl'>Start</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default function Page() {
    const params = useSearchParams()
    const router = useRouter()
    const tab = params.get('tab')
    if (!tab) {
        router.replace('/host/dashboard?tab=dashboard')
    }
    return (
        <div className='flex flex-col h-screen'>

            <DashboardNav/>

            <div className='flex flex-grow'>
                <DashboardSidebar tab={tab || 'dashboard'}/>
                <div className='flex-grow'>
                    {tab === 'dashboard' && <Dashboard/>}
                    {tab === 'events' && <h1>Events</h1>}
                    {tab === 'analytics' && <h1>Analytics</h1>}
                    {tab === 'payments' && <h1>Payments</h1>}
                    {tab === 'customers' && <h1>Customers</h1>}
                    {tab === 'help' && <h1>Help</h1>}
                </div>
            </div>
        </div>
    )
}