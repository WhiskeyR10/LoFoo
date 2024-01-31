import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactPage = () => {
  return (
    
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* <main className="flex-grow"> */}
      <main className="flex-grow flex flex-col items-center justify-center">
      <div className="bg-gray-50 p-8 rounded shadow-md max-w-md w-full">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="text-gray-700 mb-4 ">
          We'd love to hear from you!
        </p>

        <form className="max-w-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Your Name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Your Email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500"
              placeholder="Your Message"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Send Message
          </button>
        </form>
        </div>
        </main>
        
      <Footer />
    </div>
  );
};

export default ContactPage;
