"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const Navbar = () => {
  const [display,setDisplay]=useState()
  const router = useRouter()
  useEffect(()=>{
    const token= localStorage.getItem("token")
    console.log(token,"Yoi token")
    if(token){
      setDisplay(true)
    }
    else{
      setDisplay(false)
    }
  },[])

  const logout =()=>{
    console.log("Logout!")
    localStorage.removeItem('token');
    setDisplay(false)
    router.push("login-page")
  }

  return (
    <header className="bg-black  text-white py-8">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo on the left */}
        <div className="text-2xl font-bold">
          {/* <Link href="/home-page"> */}
          {display && <Link href="/home-page" className="text-4xl font-bold mb-4 ml-10">
            LoFo
          </Link>}
          {/* <span className="">LoFo</span> */}
          {/* </Link> */}
        </div>

        {/* Navigation links on the right */}
        <nav className="flex ml-auto space-x-4 ml-2 mr-8">

          {display && <Link href="/home-page" className="hover:text-gray-300">
            Home
          </Link>}
          <Link href="/about-page" className="hover:text-gray-300">
            About
          </Link>
          <Link href="/contact-page" className="hover:text-gray-300">
            Contact
          </Link>
          <div className="relative group">
            <Link href="/login-page" className="hover:text-gray-300">
              User
            </Link>
            <ul className="hidden bg-white text-gray-800 border border-gray-300 rounded-md space-y-1 group-hover:block absolute top-full left-0">
              <li>
               {!display? <Link href="/login-page" className="block px-2 py-2 hover:bg-gray-100">
                  Login
                </Link>:
                (<button onClick={logout} className="block px-2 py-2 hover:bg-gray-100">
                  Logout
                </button>)}
              </li>
              <li>
                <Link href="/register-page" className="block px-2 py-2 hover:bg-gray-100">
                  Register
                </Link>
              </li>
            </ul>
          </div>
          {/* Add more links as needed */}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
