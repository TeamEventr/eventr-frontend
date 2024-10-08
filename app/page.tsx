'use client'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
config.autoAddCss = false


export default function Home() {
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          descriptionRef.current?.classList.add('text-white');
          descriptionRef.current?.classList.remove('text-gray-400');
        } else {
          descriptionRef.current?.classList.add('text-gray-400');
          descriptionRef.current?.classList.remove('text-white');
        }
      },
      {
        threshold: 0.1, // Adjust this value as needed
      }
    );

    if (descriptionRef.current) {
      observer.observe(descriptionRef.current);
    }

    return () => {
      if (descriptionRef.current) {
        observer.unobserve(descriptionRef.current);
      }
    };
  }, []);

  return (
    <main className='relative px-4 md:px-8 lg:px-16 h-full'>
      <div id='hero-section' className='relative flex flex-col justify-center h-60 md:h-72 lg:h-[480px] gap-6 md:gap-8 lg:gap-12'>
        <h1 className='text-4xl md:text-5xl lg:text-8xl w-4/5 md:w-2/3 lg:w-2/3'>
          Your Trusted Ticketing Partner
        </h1>
        <button className='px-6 w-max py-3 text-lg font-bold text-black rounded-full bg-white border border-gray-600'>Become a Host <FontAwesomeIcon icon={faUpRightFromSquare}/></button>
      </div>
      <div id='description-section' className='mt-16'>
        <p ref={descriptionRef} className='relative text-ani left-1/2 -translate-x-1/2 text-lg md:text-2xl lg:text-3xl leading-relaxed w-4/5 text-center'>
        Welcome to Eventr, where every ticket tells a story! We're an innovative online ticketing platform that combines the excitement 
        of social media with seamless ticket purchasing. Discover and buy passes to incredible events and parties while connecting with 
        fellow attendees—all in one place! For hosts, listing your event is as quick as making instant noodles, and you'll gain access 
        to dynamic dashboards for real-time event tracking. Ready to elevate your ticketing experience? Sign up now to learn more and 
        join our vibrant community!
        </p>
      </div>
      <div id='team-section' className='relative mt-12'>
        <h2 className='text-3xl mb-8'>Our Team</h2>
        <div className='flex gap-4 gap-y-6 items-center justify-center md:gap-8 lg:gap-12 w-full flex-wrap'>
          <div className='flex flex-col w-32 md:w-48 items-center gap-1'>
            <div className='relative h-32 md:h-48 aspect-1 object-cover'>
              <Image src='/1.jpg' className='rounded-full' fill alt='Tanishq'/>
            </div>
            <h3 className='text-md md:text-xl'>Tanishq Praveen</h3>
            <p>CEO & Founder</p>
          </div>
          <div className='flex flex-col w-32 md:w-48 items-center gap-1'>
            <div className='relative h-32 md:h-48 aspect-1 object-cover'>
              <Image src='/2.jpg' className='rounded-full' fill alt='Tanishq'/>
            </div>
            <h3 className='text-md md:text-xl'>Hiten bothra</h3>
            <p>CMO</p>
          </div>
          <div className='flex flex-col w-32 md:w-48 items-center gap-1'>
            <div className='relative h-32 md:h-48 aspect-1 object-cover'>
              <Image src='/7.jpg' className='rounded-full' fill alt='Tanishq'/>
            </div>
            <h3 className='text-md md:text-xl'>Karan Hathwar</h3>
            <p>CTO</p>
          </div>
          <div className='flex flex-col w-32 md:w-48 items-center gap-1'>
            <div className='relative h-32 md:h-48 aspect-1 object-cover'>
              <Image src='/3.jpg' className='rounded-full' fill alt='Tanishq'/>
            </div>
            <h3 className='text-md md:text-xl'>Ritesh K</h3>
            <p>Back End Lead</p>
          </div>
          <div className='flex flex-col w-32 md:w-48 items-center gap-1'>
            <div className='relative h-32 md:h-48 aspect-1 object-cover'>
              <Image src='/6.jpg' className='rounded-full' fill alt='Tanishq'/>
            </div>
            <h3 className='text-md md:text-xl'>Shrish</h3>
            <p>Developer</p>
          </div>
          <div className='flex flex-col w-32 md:w-48 items-center gap-1'>
            <div className='relative h-32 md:h-48 aspect-1 object-cover'>
              <Image src='/5.jpg' className='rounded-full' fill alt='Tanishq'/>
            </div>
            <h3 className='text-md md:text-xl'>Nagnathan</h3>
            <p>Developer</p>
          </div>
          <div className='flex flex-col w-32 md:w-48 items-center gap-1'>
            <div className='relative h-32 md:h-48 aspect-1 object-cover'>
              <Image src='/4.jpg' className='rounded-full' fill alt='Tanishq'/>
            </div>
            <h3 className='text-md md:text-xl'>Pranaya</h3>
            <p>Marketing Head</p>
          </div>
          <div className='flex flex-col w-32 md:w-48 items-center gap-1'>
            <div className='relative h-32 md:h-48 aspect-1 object-cover'>
              <Image src='/8.jpg' className='rounded-full' fill alt='Tanishq'/>
            </div>
            <h3 className='text-md md:text-xl'>Shivain Varma</h3>
            <p>Marketing Team</p>
          </div>
          <div className='flex flex-col w-32 md:w-48 items-center gap-1'>
            <div className='relative h-32 md:h-48 aspect-1 object-cover'>
              <Image src='/9.jpg' className='rounded-full' fill alt='Tanishq'/>
            </div>
            <h3 className='text-md md:text-xl'>Mrittika</h3>
            <p>Marketing Team</p>
          </div>
        </div>
      </div>
    </main>
  );
}
