"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [display, setDisplay] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  }, []);

  const logout = () => {
    const confirmLogout = window.confirm("Do you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      setDisplay(false);
      router.push("/login-page");
    }
  };

  return (
    <header className="">
      <nav className=" text-white   border-gray-700 rounded-md">
        <div className="container mx-auto flex flex-wrap justify-between items-center py-4 px-4">
          <div className="flex items-center">
            {display ? (
              <Link
                href="/home-page"
                className="text-gradient-to-r from-purple-500 to-pink-500 text-2xl font-bold ml-4 font-playfair"
              >
                LoFo
              </Link>
            ) : (
              <span className="pl-4 text-2xl font-bold font-playfair">
                LoFo
              </span>
            )}
          </div>
        </div>
      </nav>

      <nav className="shadow-md py-3 pl-12 mx-auto px-4 flex justify-between items-center">
        <div className="flex flex-row items-center">
          {display && (
            <Link href="/home-page" className="text-white hover:underline mr-4">
              Home
            </Link>
          )}
          <Link href="/about-page" className="text-white hover:underline mr-4">
            About
          </Link>
          <Link
            href="/contact-page"
            className="text-white hover:underline mr-4"
          >
            Contact
          </Link>
          <Link href="/userprofile-page" className="text-white hover:underline">
            Profile
          </Link>
          <div className="relative ml-4 group">
            {!display ? (
              <Link href="/login-page" className="text-white hover:underline">
                User
              </Link>
            ) : (
              <button
                onClick={logout}
                className="text-white hover:underline"
              >
                Logout
              </button>
            )}
            <ul className="hidden bg-white text-white border border-gray-300 rounded-md space-y-1 group-hover:block absolute top-full">
              <li>
                {!display ? (
                  <Link
                    href="/login-page"
                    className="block text-black px-2 py-2 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                ) : (
                  <></>
                )}
              </li>
              {!display && (
                <li>
                  <Link
                    href="/register-page"
                    className="block text-black px-2 py-2 hover:bg-gray-100"
                  >
                    Register
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;


