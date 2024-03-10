// "use client"
// import Link from 'next/link';
// const AdminFooter = () => {
//     return (
//       <footer className="bg text-white py-4 text-center">
//         <p>Lost and Found. All rights reserved.</p>
//       </footer>
//     );
//   };
  
//   export default AdminFooter;

"use client";
import Link from 'next/link';
import React, { useState, useEffect } from "react";

const AdminFooter = () => {
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
    <footer className=" text-white text-center fixed-bottom  w-full shadow-top">
      <div className="container mx-auto">
        © 2024 {display ? <Link href="/home-page">LoFo</Link> : "LoFo"}. All rights reserved.
      </div>
    </footer> 
  );
};

export default AdminFooter;