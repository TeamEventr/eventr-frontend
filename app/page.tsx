"use client";
import Icon from "./_components/icon-wrapper";
import { useRef } from "react";
import EventCard from "./_components/event-card-wrapper";
import Carousel from "./_components/carousel-wrapper";

type ScrollDirection = "left" | "right";



function Latest() {
  const scrollRef = useRef<HTMLDivElement>(null);

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

  //Replace with the event data from the API
  const items = [1, 2, 3, 4, 5, 6, 7, 8];
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

        <div className="text-xs lg:text-sm flex gap-1.5">
          <ScrollButton direction="left" onClick={handleScroll} />
          <ScrollButton direction="right" onClick={handleScroll} />
        </div>
      </header>

      {/* Event Cards Container */}
      <div
        ref={scrollRef}
        className="flex gap-2 p-3 lg:gap-6 hide-scrollbar overflow-x-scroll snap-x snap-mandatory scroll-smooth"
        aria-label={`Latest events in ${city}`}
      >
        {items.map((item) => (
          <EventCard key={item} />
        ))}``
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <div className="w-full md:w-[75vw] m-auto px-8 py-4 flex flex-col gap-2 md:gap-4 lg:gap-4 items-center">
      <Carousel />
      <Latest />
      {/* <Categories page="home" /> */}
      {/* <Upcoming/>   We will add this later. No need for beta*/}
    </div>
  );
}
