"use client";
import Icon from "./_components/icon-wrapper";
import { useRef } from "react";
import EventCard from "./_components/event-card-wrapper";
import Carousel from "./_components/carousel-wrapper";
import { getEventsListHome } from "@/api/hooks";
import { EventListData } from "./_components/dummydata";
import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "motion/react";
import { EventrCrab } from "./_components/logo-wrapper";

type ScrollDirection = "left" | "right";



function Latest() {
  const { data: events, isLoading, error } = getEventsListHome();

  const scrollRef = useRef<HTMLDivElement>(null);
  const params = useSearchParams();
  
  //Make smooth scroll animation
  const handleScroll = (direction: ScrollDirection) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.25;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const city = "Bengaluru";

  type ScrollButtonProps = {
    direction: ScrollDirection;
    onClick: (direction: ScrollDirection) => void;
  };

  //Scroll button component
  const ScrollButton = ({ direction, onClick }: ScrollButtonProps) => (
    <button
      className="bg-eventr-gray-900 bg-opacity-30 active:scale-90 px-2.5 border border-eventr-gray-500 rounded-md hover:bg-eventr-gray-800 duration-200"
      onClick={() => onClick(direction)}
      aria-label={`Scroll ${direction}`}
    >
      {direction === "left" ? <Icon icon="chevron_left"/> : <Icon icon="chevron_right"/>}
    </button>
  );

  return (
    <section className="w-full">
      <header className="flex justify-between">
        <h1 className="flex items-baseline gap-1 text-lg">
          <span>Latest Events in</span>
          <p className="font-bold text-2xl translate-y-[1px] text-eventr-secondary">
            {city}
          </p>
        </h1>

        <div className="hidden text-xs lg:text-sm md:flex gap-1.5">
          <ScrollButton direction="left" onClick={handleScroll} />
          <ScrollButton direction="right" onClick={handleScroll} />
        </div>
      </header>

      {isLoading &&
      <div className="md:p-3 w-full grid grid-cols-2 gap-4 snap-none md:flex md:gap-6 md:hide-scrollbar md:overflow-x-scroll md:snap-x md:snap-mandatory md:scroll-smooth">
        {[...Array(4)].map((_, index) => (
          <EventCard key={index} loading eventDetails={{ id: '', title: '', startTime: '', venue: '', thumbnailURL: '' }}/>
        ))}
      </div>
      }
      {error && <div className="w-full h-72 p-4 flex flex-col items-center justify-center mt-4">
        <EventrCrab/>
        <p className="font-bold -mt-4 text-eventr-gray-500 text-lg">Failed to load events :/</p>
      </div>}

      {events &&
      <div
        ref={scrollRef}
        className="grid mt-4 md:mt-0 grid-cols-2 md:flex gap-2 md:p-2 md:gap-4 hide-scrollbar md:overflow-x-scroll md:snap-x md:snap-mandatory md:scroll-smooth"
        aria-label={`Latest events in ${city}`}
      >
        <AnimatePresence>
        {events.map((event) => (
          <EventCard key={event.id} eventDetails={event}/>
        ))}
        </AnimatePresence>
      </div>
      }
    </section>
  );
}

export default function Page() {
  return (
    <div className="w-full md:w-[75vw] m-auto px-2 lg:px-8 py-4 flex flex-col gap-2 md:gap-4 lg:gap-4 items-center">
      <Carousel />
      <Latest />
      {/* <Categories page="home" /> */}
      {/* <Upcoming/>   We will add this later. No need for beta*/}
    </div>
  );
}
