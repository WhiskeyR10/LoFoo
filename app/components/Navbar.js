"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [display, setDisplay] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token, "Your token");
    if (token) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  }, []);

  const logout = () => {
    console.log("Logout!");
    localStorage.removeItem("token");
    setDisplay(false);
    router.push("login-page");
  };

  return (
    <header className="bg-gray-800">
      {/* <nav className="bg-gray-800 border-b border-gray-900"> */}
            <nav className="bg-gray-800 text-white shadow-md border border-gray-700 rounded-md">



        <div className="container mx-auto flex flex-wrap justify-between items-center py-4 px-4">
          <div className="flex items-center">
            {display && (
              <Link href="/home-page" className="text-gradient-to-r from-purple-500 to-pink-500 text-2xl font-bold ml-4 **font-playfair**">
                LoFo
              </Link>

            )}
          </div>
        </div>
      </nav>

      <nav className="bg-gray-50 py-3 pl-12 mx-auto px-4 flex justify-between items-center"> 
      
        <div className="flex flex-row items-center">
          {display && (
            <Link href="/home-page" className="text-gray-900 hover:underline mr-4">
              Home
            </Link>
          )}
          <Link href="/about-page" className="text-gray-900 hover:underline mr-4">
            About
          </Link>
          <Link href="/contact-page" className="text-gray-900 hover:underline">
            Contact
          </Link>
          <div className="relative ml-4 group">
            <Link href="/login-page" className="text-gray-900 hover:underline">
              User
            </Link>
            <ul className="hidden bg-white text-gray-800 border border-gray-300 rounded-md space-y-1 group-hover:block absolute top-full right-0">
              <li>
                {!display ? (
                  <Link
                    href="/login-page"
                    className="block px-2 py-2 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                ) : (
                  <button onClick={logout} className="block px-2 py-2 hover:bg-gray-100">
                    Logout
                  </button>
                )}
              </li>
              <li>
                <Link
                  href="/register-page"
                  className="block px-2 py-2 hover:bg-gray-100"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
