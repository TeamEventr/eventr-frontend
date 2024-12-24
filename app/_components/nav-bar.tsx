"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useRecoilState } from "recoil";
import { authState, showLoginModalState } from "@/api/atoms";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";

const menuVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: -10,
    transition: {
      duration: 0.2,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: -10,
    transition: {
      duration: 0.15,
    },
  },
};

export default function NavBar() {
  const pathname = usePathname();
  const params = useSearchParams();
  const [auth, setAuth] = useRecoilState(authState);
  // const genderOutput = userDetailsHome?.userGender === "male" ? "boy" : "girl";
  // <Image className="object-cover rounded-full border-2 border-gray-700 border-opacity-30" src={userDetailsHome.profilePicUrl ? userDetailsHome.profilePicUrl : `https://avatar.iran.liara.run/public/${genderOutput || "boy"}`} fill alt="profile" />
  const [isOpen, setIsOpen] = useRecoilState(showLoginModalState);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

    
  const menuRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    } else if (event.target === profileButtonRef.current) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const loginParam = params.get("login");
    if (loginParam === "open") {
      setIsOpen(true);
    }
  }, [params, setIsOpen]);


  return pathname !== "/host/dashboard" ? (
    <nav className="flex items-center justify-between px-3 md:px-6 py-2 w-full h-[56px] overflow-x-hidden bg-gradient-to-tr from-zinc-800/30 to-slate-800/30 z-50 border-b-2 border-gray-700/30">
      <div className="flex gap-4 items-center">
        <Link
          href={"/"}
          className="font-gothic text-3xl tracking-widest mr-2 text-eventr-secondary"
        >
          EVENTR
        </Link>
        <Link
          href="/#team-section"
          className="hidden md:block text-sm opacity-75 hover:opacity-100 duration-150"
        >
          Become a Host
        </Link>
        <p className="hidden md:block opacity-75 text-sm hover:opacity-100 duration-150">
          About Us
        </p>
      </div>

      {!auth ? (
        <div>
          <button className="active:scale-90 font-bold rounded-full bg-eventr-gray-800 duration-200 hover:bg-eventr-gray-700">
            <span
              ref={profileButtonRef}
              className="flex items-center material-symbols-rounded"
              style={{
                fontSize: "36px",
                fontVariationSettings: `'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
              }}
            >
              account_circle
            </span>
          </button>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={menuVariants}
                ref={menuRef}
                className="absolute right-3 lg:right-6 mt-1 w-32 p-2 flex flex-col gap-1.5 bg-eventr-gray-900 border-2 border-eventr-gray-800 rounded-md shadow-lg z-40"
              >
                <Link
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-2 py-1.5 rounded-md duration-200 hover:bg-eventr-gray-700"
                >
                  Profile
                </Link>
                <Link
                  href="/tickets"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-2 py-1.5 rounded-md duration-200 hover:bg-eventr-gray-700"
                >
                  My Tickets
                </Link>
                <Link
                  href="/bookmarks"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-2 py-1.5 rounded-md duration-200 hover:bg-eventr-gray-700"
                >
                  Bookmarks
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left px-2 py-1.5 rounded-md duration-200 hover:bg-eventr-gray-700 text-red-600"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex gap-2">
          {pathname === "/register" ? (
            <Link
              href="/?login=open"
              className="py-1.5 active:scale-90 font-bold px-3 rounded-md bg-eventr-gray-800 duration-200 hover:bg-eventr-gray-700"
            >
              Login
            </Link>
          ) : (
            <button
              className="py-1.5 active:scale-90 font-bold px-3 rounded-md bg-eventr-gray-800 duration-200 hover:bg-eventr-gray-700"
              onClick={() => setIsOpen(!isOpen)}
            >
              Login
            </button>
          )}
          <Link
            className="py-1.5 active:scale-90 font-bold px-3 rounded-md bg-eventr-main hover:bg-eventr-main-light duration-200"
            href="/register"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  ) : null;
}
