// import React from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// const HomePage = () => {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <main className="flex-grow">Hello There!</main>
//       <Footer />
//     </div>
//   );
// };

// export default HomePage;
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow  bg-gray-800 text-white text-center py-16">
        {/* Hero Section */}
        <div className="">
          <h1 className="text-4xl font-bold mb-4">Lost and Found</h1>
          <p className="text-lg mb-8">Helping you reunite with your lost items and report found ones.</p>
          <div className="flex justify-center">
            {/* <button className="bg-blue-500 text-white py-2 px-4 rounded mr-4 hover:bg-blue-600">
              Submit Lost Item
            </button>
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
              Report Found Item
            </button> */}
            <Link href='/lost-page'>
            <button className="bg-green-500 text-white py-2 px-4 rounded mr-4 hover:bg-red-500">
              Submit Lost Item
            </button>
            </Link>
            <Link href="/found-page">
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-red-500">
              Report Found Item
            </button>
            </Link>
          </div>
        </div>     
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

