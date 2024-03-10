"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import Link from "next/link";

const AdminHeader = () => {
  const router = useRouter();
  const [display, setDisplay] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token, "Your token");
    if (token) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  }, []);

  const handleLogout = () => {
    console.log("Logout!");
    localStorage.removeItem("token");
    setDisplay(false);
    router.push("login-page");
  };

  return (
    <header className=" py-4">
      <nav className=" text-white   border-gray-700 rounded-md">
        <div className="container mx-auto flex flex-wrap justify-between items-center py-4 px-4">
          <div className="flex items-center">
            {display && (
              <Link
                href="/home-page"
                className="text-gradient-to-r from-purple-500 to-pink-500 text-2xl font-bold ml-4 **font-playfair**"
              >
                LoFo
              </Link>
            )}
          </div>
        </div>
      </nav>
      <nav className="shadow-md py-3 pl-12 mx-auto px-4 flex justify-between items-center"> 
  
        <ul className="flex text-white">
          {/* <li className="mr-4">
            <Link href="/admin-page">Dashboard</Link>
          </li> */}
          <li className="mr-4">
            <Link href="/admin-page/usermanagement-page">User Management</Link>
          </li>

          <li className="mr-4">
            <Link href="/login-page" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AdminHeader;
