'use client'

import { useState } from 'react'
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons"

export default function Footer(){
    const [email, setEmail] = useState('')
    const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubscribeStatus('loading')
        // Simulate API call
        setTimeout(() => {
            if (email.includes('@')) {
                setSubscribeStatus('success')
            } else {
                setSubscribeStatus('error')
            }
        }, 1000)
    }
    return(
        <footer className="mt-8 md:mt-16 bg-black text-white p-8 relative z-40 w-full">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold mb-4">About Us</h2>
                        <p className="text-sm">EventR is your go-to platform for discovering and organizing unforgettable events. Join us in creating memories that last a lifetime.</p>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold mb-4">Contact Us</h2>
                        <address className="not-italic text-sm">
                            <p>JP Nagar 8th Phase, Bengaluru, 560076</p>
                            <p className="mt-2">Phone: <a href="tel:+12345678901" className="hover:text-purple-400 transition-colors">+91 6363345104 </a></p>
                            <p className="mt-2">Email: <a href="mailto:contact@eventr.com" className="hover:text-purple-400 transition-colors">hello.eventr@gmail.com</a></p>
                        </address>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold mb-4">Quick Links</h2>
                        <nav>
                            <ul className="space-y-2">
                                {['Home', 'My Profile', 'Login', 'Sign Up'].map((item) => (
                                    <li key={item}>
                                        <Link href={`/${item.toLowerCase().replace(' ', '')}`} className="text-sm hover:text-purple-400 transition-colors">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold mb-4">Newsletter</h2>
                        <p className="text-sm mb-4">Stay updated with our latest events and offers.</p>
                        <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                                required
                            />
                            <button
                                type="submit"
                                disabled={subscribeStatus === 'loading'}
                                className="bg-purple-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                            >
                                {subscribeStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                            </button>
                            {subscribeStatus === 'success' && (
                                <p className="text-green-400 text-sm">Thank you for subscribing!</p>
                            )}
                            {subscribeStatus === 'error' && (
                                <p className="text-red-400 text-sm">Please enter a valid email address.</p>
                            )}
                        </form>
                    </div>
                </div>
                <div className="mt-12 pt-4 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm mb-4 md:mb-0">© 2024 EventR. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <Link href="https://www.instagram.com/eventrco.in" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="transform hover:scale-110 transition-transform">
                            <FontAwesomeIcon icon={faInstagram} className="text-white hover:text-purple-400 transition-colors" size="lg" />
                        </Link>
                        <Link href="https://twitter.com/eventr" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Twitter" className="transform hover:scale-110 transition-transform">
                            <FontAwesomeIcon icon={faTwitter} className="text-white hover:text-purple-400 transition-colors" size="lg" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}