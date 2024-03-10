"use client"
import React from 'react';
import Head from 'next/head';
import AdminHeader from '../components/AdminHeader';
import AdminFooter from '../components/AdminFooter';
import bg from '../public/g.jpg';


const AdminDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen relative" style={{
      backgroundImage: `url(${bg.src})`,
      alt:"Background Image",
        width:"100%",
        height:"100%" ,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        
    }}>
   <div className="flex-grow">
      <AdminHeader />

      <main className="container mx-auto py-8 pb-24">
      
          <section className="col-span-1 bg p-4 rounded-md">
            <h2 className="text-xl text-white font-semibold mb-4">Welcome, Admin!</h2>
            <p className="text-white mb-4">
              You can manage various aspects of the Lost and Found System here.
            </p>
            <div>
              <h3 className="text-lg text-white  font-semibold mb-2">User Management</h3>
              <p className="text-white mb-4">
                Create, edit, or delete users, and manage their roles and permissions.
              </p>
              
            </div>
        </section>
      </main>

      </div>
      <AdminFooter/> 

    </div>
    
  );
};

export default AdminDashboard;
