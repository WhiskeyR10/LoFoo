import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">User here!</main>
      <Footer />
    </div>
  );
};

export default HomePage;
