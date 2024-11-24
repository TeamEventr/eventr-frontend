"use client";
import {
  ticketSales,
  ticketClasses,
} from "@/app/_components/dashboard-dummy-data";
import { PureComponent, SetStateAction } from "react";
import Icon from "@/app/_components/icon-wrapper";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  TooltipProps,
  ResponsiveContainer,
  Label,
} from "recharts";
import { PieChart, Pie, Sector, Cell } from "recharts";
import { useState, useCallback } from "react";

function DashboardNav() {
  return (
    <nav className="w-screen bg-eventr-gray flex px-4 py-2 border-b-2 border-zinc-700">
      <div className="flex gap-4 items-center w-44">
        <Icon icon="menu" size="32px" />
        <Link href={"/"} className="font-gothic text-3xl tracking-widest mr-2">
          EVENTR
        </Link>
      </div>
      <div className="flex-grow">
        {/*searchbar <input className="w-96" /> */}
      </div>
      <div className="flex gap-4 items-center">
        <Icon icon="notifications" size="28px" />
        <Link
          href="/host/create"
          className="bg-eventr-main flex items-center font-bold px-2 py-1 rounded-md"
        >
          <Icon icon="add" /> Create
        </Link>
        <div className="flex items-center gap-1">
          <Icon icon="account_circle" size="32px" />
          <div className="flex flex-col text-xs translate-y-0.5">
            <p className="font-bold">Full Name</p>
            <p className="-translate-y-1 font-thin">Company Name</p>
          </div>
        </div>
      </div>
    </nav>
  );
}

function DashboardSidebar({ tab }: { tab: string }) {
  return (
    <section className="bg-eventr-gray flex flex-col gap-1.5 w-48 p-4 border-r-2 border-zinc-700">
      <Link
        className={`flex items-center px-2 py-1 gap-2 rounded-md duration-200 ${
          tab === "dashboard" && "bg-eventr-main font-bold py-3"
        }`}
        href={"?tab=dashboard"}
      >
        <Icon icon="grid_view" />
        <p>Dashboard</p>
      </Link>
      <Link
        className={`flex items-center px-2 py-1 gap-2 rounded-md duration-200 ${
          tab === "events" && "bg-eventr-main font-bold py-3"
        }`}
        href={"?tab=events"}
      >
        <Icon icon="analytics" />
        <p>Events</p>
      </Link>
      <Link
        className={`flex items-center px-2 py-1 gap-2 rounded-md duration-200 ${
          tab === "analytics" && "bg-eventr-main font-bold py-3"
        }`}
        href={"?tab=analytics"}
      >
        <Icon icon="event_note" />
        <p>Analytics</p>
      </Link>
      <Link
        className={`flex items-center px-2 py-1 gap-2 rounded-md duration-200 ${
          tab === "payments" && "bg-eventr-main font-bold py-3"
        }`}
        href={"?tab=payments"}
      >
        <Icon icon="payments" />
        <p>Payments</p>
      </Link>
      <Link
        className={`flex items-center px-2 py-1 gap-2 rounded-md duration-200 ${
          tab === "promoters" && "bg-eventr-main font-bold py-3"
        }`}
        href={"?tab=promoters"}
      >
        <Icon icon="person_play" />
        <p>Promoters</p>
      </Link>
      <Link
        className={`flex items-center px-2 py-1 gap-2 rounded-md duration-200 ${
          tab === "customers" && "bg-eventr-main font-bold py-3"
        }`}
        href={"?tab=customers"}
      >
        <Icon icon="chat" />
        <p>Messages</p>
      </Link>
    </section>
  );
}

function Dashboard() {
  const ts = ticketSales;
  const tc = ticketClasses;
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
        <div
          style={{
            backgroundColor: "#040404",
            color: "#fff",
            padding: "5px",
            borderRadius: "5px",
            fontSize: "14px",
          }}
        >
          <h4>{payload[0].payload.date}</h4>
          <p>{payload[0].value}</p>
        </div>
      );
    }

    return null; // Return null if not active
  };
  return (
    <div className="p-4 flex w-full gap-4">
      <section id="home" className="w-full flex-grow basis-0">
        <div id="top-events">
          <h2 className="text-xl font-bold">Top Events</h2>
          <div className="flex w-full gap-2 mt-2">
            <div className="flex-grow">
              <p>Latest Event</p>
              <div className="bg-cyan-700 min-w-64 rounded-md aspect-w-4 aspect-h-3"></div>
            </div>
            <div className="flex-grow">
              <p>Highest Sales</p>
              <div className="bg-cyan-700 min-w-64 rounded-md aspect-w-4 aspect-h-3"></div>
            </div>
            <div className="flex-grow">
              <p>Best Rated</p>
              <div className="bg-cyan-700 min-w-64 rounded-md aspect-w-4 aspect-h-3"></div>
            </div>
          </div>
        </div>

        <div id="home-analytics" className="mt-4 flex gap-2">
          <div className="h-72 min-w-[480px] flex-grow bg-eventr-gray p-4 pl-0 pb-8 rounded-md">
            <h3 className="ml-6 mb-3 flex items-center gap-1">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M3.5,18.5L9.5,12.5L13.5,16.5L22,6.92L20.59,5.5L13.5,13.5L9.5,9.5L2,17L3.5,18.5Z"
                />
              </svg>
              Ticket Sales
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={ts}
                margin={{ top: 5, right: 25, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="salesGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#00c944" stopOpacity={1} />
                    <stop offset="95%" stopColor="#009000" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="2 2"
                  stroke="#404040"
                />
                <XAxis
                  tick={{ fontSize: 12 }}
                  tickSize={8}
                  interval={0}
                  xAxisId={0}
                  dataKey="time"
                />
                <XAxis
                  tick={{ dy: -10 }}
                  offset={10}
                  tickSize={0}
                  interval={0}
                  axisLine={false}
                  tickLine={false}
                  xAxisId={1}
                  allowDuplicatedCategory={false}
                  dataKey="date"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  type="number"
                  domain={["dataMin - 10", "dataMax + 10"]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dot={false}
                  activeDot
                  dataKey="sales"
                  stroke="url(#salesGradient)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="h-72 w-72 bg-eventr-gray rounded-md">
            <ResponsiveContainer width="100%" height="100%">
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
                      stroke="#121212"
                      style={{
                        transition: "fill .2s ease-in-out",
                        filter: `drop-shadow(0px 0px 5px ${getFillColor(
                          index
                        )})`,
                      }}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
      <section id="activity" className="w-48 flex-shrink-0">
        <div className="bg-eventr-gray p-2 rounded-md">
          <h2 className="text-center text-xl font-bold">Activity</h2>
          <div className="flex flex-col"></div>
        </div>
        <div className="mt-4">
          <h2 className="text-center text-xl font-bold mb-2">What's New</h2>
          <div className="flex flex-col justify-center gap-4 bg-gradient-to-br from-cyan-600 to-slate-600 py-6 p-4 rounded-md">
            <h3 className="text-2xl font-bold leading-none text-center">
              Take A Quick Tour
            </h3>
            <button className="bg-white text-black px-2 rounded-md font-bold text-xl">
              Start
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function EventCard() {
  return (
    <div className="relative flex bg-eventr-gray w-full h-[90px] rounded-md">
      <div className="relative w-40 h-full rounded-l-md bg-zinc-600"></div>
      <div className="flex gap-3 items-center">
        <div className="flex-grow p-2 w-96">
          <h3 className="font-bold text-lg">
            Event Name Really long and informative
          </h3>
          <p className="text-sm">Blah blah square, Blah City</p>
        </div>
        <p className="w-24">Finished</p>
        <p className="w-28">Nov 11, 2024</p>
        <p className="w-20">NA</p>
        <p className="w-24">24,500Rs</p>
        <div className="flex items-center text-amber-500 w-16">
          <p className="text-white">4.5</p>
          <Icon icon="star" />
        </div>
        <Link href={`?tab=events&view=${'id'}`} className="flex items-center"><Icon icon='settings'/></Link>
      </div>
    </div>
  );
}

function Events({ view }: { view: string | null }) {
  return (
    <div className="flex p-4 gap-4 w-full">
      {view ? (
      <h1>
        <div className="w-full aspect-h-9 aspect-w-16 bg-zinc-500 rounded-md">
        </div>
      </h1>
      ) : (
      <section id="events-list" className="flex flex-grow flex-col gap-4">
        <div id="latest-event" className="flex flex-col gap-1.5">
          <h2 className="font-bold text-xl mb-1">Lastest Event</h2>
          <div className="bg-eventr-gray w-full h-[225px] flex rounded-md">
            <div className="bg-zinc-600 w-[400px] h-[225px] rounded-l-md"></div>
            <div className="flex-grow"></div>
          </div>
        </div>

        <div id="all events" className="flex flex-col gap-1.5">
          <div className="flex gap-1.5 mb-1">
            <h2 className="text-xl font-bold flex-grow w-full">All Events</h2>
            <div className="flex gap-2 items-center">
              <button className="underline">All</button>
              <div className="w-[1px] h-3/4 bg-zinc-500" />
              <button>Ongoing</button>
              <div className="w-[1px] h-3/4 bg-zinc-500" />
              <button>Draft</button>
              <div className="w-[1px] h-3/4 bg-zinc-500" />
              <button>Past</button>
            </div>
          </div>
          <div className="flex gap-3 text-zinc-400">
            <p className="w-[544px]">Event</p>
            <p className="w-24">Status</p>
            <p className="w-28">Start Date</p>
            <p className="w-20">Ticketing</p>
            <p className="w-24">Revenue</p>
            <p className="w-16">Rating</p>
          </div>
          <EventCard />
        </div>
      </section>
      /* <section id="artists-list">
        <div className="bg-eventr-gray p-2 rounded-md">
          <h2 className="text-center text-xl font-bold">Artists</h2>
          <div className="flex flex-col"></div>
        </div>
        <div className="mt-4">
          <h2 className="text-center text-xl font-bold mb-2">What's New</h2>
          <div className="flex flex-col justify-center gap-4 bg-gradient-to-br from-cyan-600 to-slate-600 py-6 p-4 rounded-md">
            <h3 className="text-2xl font-bold leading-none text-center">
              Take A Quick Tour
            </h3>
            <button className="bg-white text-black px-2 rounded-md font-bold text-xl">
              Start
            </button>
          </div>
        </div>
      </section> */
      )}
    </div>
  );
}

function Analytics() {
  return (
    <div className="flex flex-col w-full">
      <section id="anayltics-nav" className="flex gap-2 p-4">
        <div className="relative flex-grow">
          <select className="bg-eventr-gray p-1.5 w-full rounded-md appearance-none outline-none">
            <option>All Events</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <Icon icon="arrow_drop_down" />
          </div>
        </div>
        <div className="relative">
          <select className="bg-eventr-gray pl-8 p-1.5 w-40 rounded-md appearance-none outline-none">
            <option>Past 24 Hours</option>
            <option>Past 3 Days</option>
            <option>Past Week</option>
            <option>Past 14 Days</option>
            <option>Past Month</option>
            <option>Past 3 Months</option>
            <option>Past 6 Months</option>
            <option>Past Year</option>
            <option>All Time</option>
          </select>
          <div className="absolute inset-y-0 left-0 flex items-center pl-1.5 pointer-events-none">
            <Icon icon="schedule" size="20px" />
          </div>
        </div>
        <select className="bg-eventr-gray p-1.5 w-40 text-center rounded-md appearance-none outline-none">
          <option>Ongoing</option>
          <option>Finished</option>
          <option>Both</option>
        </select>
      </section>
      <section className="flex flex-col gap-4 w-full flex-grow px-4">
        <div className="flex gap-4 w-full h-72">
          <div className="bg-eventr-gray min-w-48 flex-grow rounded-md">Hi</div>
          <div className="bg-eventr-gray min-w-48 flex-grow rounded-md">
            Content or explicit dimensions
          </div>
          <div className="bg-eventr-gray min-w-48 flex-grow rounded-md">
            Content or explicit dimensions
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Page() {
  const params = useSearchParams();
  const router = useRouter();
  const tab = params.get("tab");
  const view = params.get("view");
  if (!tab) {
    router.replace("/host/dashboard?tab=dashboard");
  }
  return (
    <div className="flex flex-col h-screen">
      <DashboardNav />

      <div className="flex flex-grow">
        <DashboardSidebar tab={tab || "dashboard"} />
        <div className="flex-grow">
          {tab === "dashboard" && <Dashboard />}
          {tab === "events" && <Events view={view}/>}
          {tab === "analytics" && <Analytics />}
          {tab === "payments" && <h1>Payments</h1>}
          {tab === "promoters" && <h1>Promoters</h1>}
          {tab === "help" && <h1>Help</h1>}
        </div>
      </div>
    </div>
  );
}
