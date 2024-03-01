"use client"
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import FoundItem from "@/server/model/FoundItem";

const TestPage = () => {
  const [recentLostItems, setRecentLostItems] = useState([]);
  const [contactFormData, setContactFormData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);

  useEffect(() => {
    const fetchRecentLostItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/lostitems/recent"
        );
        setRecentLostItems(
          response.data.slice(response.data.length - 1, response.data.length)
        );
      } catch (error) {
        console.error("Error fetching recent lost items:", error);
      }
    };
    fetchRecentLostItems();
  }, []);

  const handleContactFormChange = (value) => {
    setContactFormData({ ...contactFormData, [currentItemId]: value });
  };

  const handleContactButtonClick = (itemId) => {
    setShowForm(true);
    setCurrentItemId(itemId);
  };

  const handleSendButtonClick = async (userId, itemId) => {
    setShowForm(false);
    const response = await axios.post(
      "http://localhost:8000/api/lostitems/sendBill",
      {
        userId,
        itemId,
        textareaValue: contactFormData[itemId],
      }
    );
    setContactFormData({ ...contactFormData, [itemId]: "" });
    // console.log(userId, itemId, contactFormData[itemId], "Datas found!");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="bg-gray-200 flex-grow flex items-center justify-center">
        <div className="max-w-full w-full p-10 bg-gray-50 rounded-md shadow-md">
          <h1 className="text-2xl font-bold mb-4">
            Recent Lost Items with Similarity Results
          </h1>

          {recentLostItems.map(({ lostItem, similarityResults }) => (
            <div
              key={lostItem._id}
              className="bg-white p-4 rounded-md shadow-md mb-4 relative"
            >
              <div className="flex items-center">
                <div className="w-1/3">
                  {lostItem.images.map((image, index) => (
                    <img
                      key={index}
                      src={`http://localhost:8000${image}`}
                      style = {{width:'100px'}}
                      alt={`Lost Item ${index + 1}`}
                      className="max-w-full mt-4"
                    />
                  ))}
                </div>
                <div className="w-2/3 ml-4">
                  <p className="text-lg font-bold">{lostItem.name}</p>
                  <p>Color: {lostItem.color}</p>
                  <p>Category: {lostItem.category}</p>
                  <p>Brand: {lostItem.brand}</p>
                  <p>Date Lost: {lostItem.date}</p>
                  <p>Description: {lostItem.description}</p>
                </div>
              </div>

              <h2 className="text-xl font-bold mt-4">Similarity Results</h2>
              {similarityResults.map(({ foundItem, similarity }) => (
                <div key={foundItem._id} className="mt-2">
                  <div className="flex items-center border rounded-lg overflow-hidden shadow-md">
                    <div className="w-1/3">
                      {foundItem.images.map((image, index) => (
                        <img
                          key={index}
                          src={`http://localhost:8000${image}`}
                          style = {{width:'100px'}}
                          alt={`Found Item ${index + 1}`}
                          className="max-w-full h-auto"
                        />
                      ))}
                    </div>
                    <div className="w-2/3 p-4">
                      <p className="text-lg font-bold mb-2">{foundItem.name}</p>
                      <p className="text-gray-600">Color: {foundItem.color}</p>
                      <p className="text-gray-600">
                        Category: {foundItem.category}
                      </p>
                      <p className="text-gray-600">Brand: {foundItem.brand}</p>
                      <p className="text-gray-600">
                        Date Lost: {foundItem.date}
                      </p>
                      <p className="text-gray-600 mb-4">
                        Description: {foundItem.description}
                      </p>
                      <button
                        onClick={() => handleContactButtonClick(foundItem._id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Contact me
                      </button>
                      {showForm && currentItemId === foundItem._id && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
    <div className="bg-white p-6 rounded-md shadow-md relative">
      <button
        onClick={() => setShowForm(false)}
        className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <label className="block mb-4">
        Your Message:
        <textarea
          value={contactFormData[foundItem._id] || ""}
          onChange={(e) => handleContactFormChange(e.target.value)}
          rows="4"
          cols="50"
          className="w-full border rounded-md p-2"
        />
      </label>
      <button
        onClick={() => handleSendButtonClick(foundItem.created_by, foundItem._id)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Send
      </button>
    </div>
  </div>
)}

                      <p>Matched rate: {similarity * 100 + "%"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TestPage;
