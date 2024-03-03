
"use client";
import Link from 'next/link';
import React, { useState, useEffect } from "react";

const Footer = () => {
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

  return (
    <footer className="bg-gray-800 text-white p-3 text-center">
      <div className="container mx-auto">
        © 2024 {display ? <Link href="/home-page">LoFo</Link> : "LoFo"}. All rights reserved.
      </div>
    </footer> 
  );
};

export default Footer;
