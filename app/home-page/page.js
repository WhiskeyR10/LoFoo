import React from 'react';
import BasePage from '../components/basePage';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen" >
  

      <BasePage>
      <main className="flex-grow text-center text-white py-16" >
          <h1 className="text-6xl py-12 bg- font-bold mb-4 ">Find what you've lost</h1>
          <p className="text-lg mb-8">
            Lost and Found - Your go-to platform for lost items
          </p>
          <div className="flex justify-center gap-12 py-4">
            <Link href="/lost-page">
              <button className="bg-white text-black hover:bg-gray-700 hover:text-white py-3.5 px-4 border border-black rounded mx-2">
                Report Lost Item
              </button>
              
            </Link>
            <Link href="/found-page">
              <button className="bg-white text-black hover:bg-gray-700 hover:text-white py-3.5 px-4 border border-black rounded mx-2">
                Submit Found Item
              </button>
            </Link>
          </div>
      </main>
      </BasePage>
    </div>
  );
};

export default HomePage;

