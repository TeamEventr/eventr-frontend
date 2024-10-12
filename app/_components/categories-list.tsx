'use client';
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Categories({ page }: { page: string }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const handleScroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.offsetWidth * 0.125;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    //Fetch this from API
    const categories = ["Concerts", "Comedy", "Festivals", "Parties", "Conferences", "Expos", "Sports", "Arts"];

    return (
        <section className="w-full">
            <header className="flex justify-between mb-2">
                <h2 className="text-xl font-semibold">{page == 'home' ? 'Browse Categories' : 'Browse Other Categories'}</h2>
                <div className="text-xs lg:text-sm flex gap-1">
                    <button 
                        className="bg-gray-900 bg-opacity-30 px-2.5 border border-gray-500/30 rounded-md hover:bg-gray-800 duration-200" 
                        onClick={() => handleScroll("left")} 
                        aria-label="Scroll left"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button 
                        className="bg-gray-900 bg-opacity-30 px-2.5 border border-gray-500/30 rounded-md hover:bg-gray-800 duration-200" 
                        onClick={() => handleScroll("right")} 
                        aria-label="Scroll right"
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </header>
            <div 
                ref={scrollRef} 
                className="mt-4 flex gap-4 hide-scrollbar overflow-x-scroll snap-x snap-mandatory scroll-smooth"
            >
                {categories.map((category, index) => (
                    <Link 
                    href={`/events?cat=${category.toLowerCase()}`} 
                    key={index} 
                    className="relative flex-shrink-0 snap-start group"
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                    title={`View all ${category} events`}
                >
                    <div className="pb-12 px-1">
                        <div className={`category-card w-40 h-20 rounded-lg transition-all duration-200 
                            ${activeIndex === index ? 'scale-105' : 'scale-100'}
                            ${activeIndex !== null && activeIndex !== index ? 'opacity-50' : 'opacity-100'}
                            hover:shadow-md hover:shadow-purple-900/30 group-hover:z-10 relative bg-black`}
                        >
                            <div className="absolute inset-0 rounded-md backdrop:rounded-md bg-gradient-to-tr from-zinc-800/50 to-slate-800/50 group-hover:opacity-0 transition-opacity duration-500"></div>
                            <div className="absolute inset-0 opacity-30"></div>
                            <div className="absolute inset-0 flex items-center justify-center p-2 z-10">
                                <span className="text-white text-lg text-center relative z-10 drop-shadow-lg transform transition-transform duration-500 group-hover:scale-110">{category}</span>
                            </div>
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-purple-900/20 to-purple-800/20 backdrop-blur-sm"></div>
                            <div className="glow absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    </div>
                </Link>
                ))}
            </div>
        </section>
    );
}
