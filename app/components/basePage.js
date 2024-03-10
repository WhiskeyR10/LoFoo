import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import bg from '../public/j.jpg';


const BasePage = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen" style={{
        backgroundImage: `url(${bg.src})`,
        alt:"Background Image",
          width:"100%",
          height:"100%" ,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          
      }}>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default BasePage;
