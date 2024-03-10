import React from "react";
import BasePage from '../components/basePage';

const ContactPage = () => {
  return (
    <BasePage>
      <div className="container bg-gray-400 mx-auto px-4 py-8 text-gray-900">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <p className="mb-6">
          We are available 24/7 to assist you with any inquiries or assistance
          you may need. Feel free to contact us using any of the following
          methods:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-200 rounded-md p-6">
            <h2 className="text-xl font-semibold mb-2">Phone Number:</h2>
            <p>(123) 456-7890</p>
          </div>
          <div className="bg-gray-200 rounded-md p-6">
            <h2 className="text-xl font-semibold mb-2">Email:</h2>
            <p>info@lostfound.com</p>
          </div>
          <div className="bg-gray-200 rounded-md p-6">
            <h2 className="text-xl font-semibold mb-2">WhatsApp:</h2>
            <p>+1 (123) 456-7890</p>
          </div>
        </div>
        <p className="text-gray-700 mt-8">
          We are always here to help and we appreciate any feedback from our
          customers.
        </p>
        <p className="text-gray-700">
          For urgent matters or emergencies, please don't hesitate to reach out
          to us at any time.
        </p>
      </div>
    </BasePage>
  );
};

export default ContactPage;
