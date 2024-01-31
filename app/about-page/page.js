import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow"><h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg mb-4">
          Welcome to our Lost & Found community! We are dedicated to helping people find their lost items
          and facilitating the return of found items to their rightful owners.
        </p>
        <p className="text-lg mb-4">
          Our mission is to create a platform that connects people who have lost something valuable
          with those who have found something and wish to return it. We believe in the power of community
          and the positive impact it can have on individuals and society.
        </p>
        <p className="text-lg">
          If you have any questions or suggestions, feel free to contact us. Thank you for being a part of our community!
        </p></main>
      <Footer />
    </div>
  );
};

export default AboutPage;
