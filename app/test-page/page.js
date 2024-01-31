"use client"
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const TestPage = () => {
  const [recentLostItems, setRecentLostItems] = useState([]);

  useEffect(() => {
    const fetchRecentLostItems = async () => {
      try {
        setRecentLostItems([]);

        const response = await axios.get('http://localhost:8000/api/lostitems/recent');
        setRecentLostItems(response.data);
      } catch (error) {
        console.error('Error fetching recent lost items:', error);
      }
    };

    // Clear previous search results before fetching new ones

    fetchRecentLostItems();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="bg-gray-200 flex-grow flex items-center justify-center">
        <div className="max-w-full w-full p-10 bg-gray-50 rounded-md shadow-md">
          <h1 className="text-2xl font-bold mb-4">Recent Lost Items with Similarity Results</h1>

          {recentLostItems.map(({ lostItem, similarityResults }) => (
            <div key={lostItem._id} className="bg-white p-4 rounded-md shadow-md mb-4">
              <div className="flex items-center">
                <div className="w-1/3">
                  {lostItem.images.map((image, index) => (
                    <img key={index} src={`http://localhost:8000${image}`} alt={`Lost Item ${index + 1}`} className="max-w-full mt-4" />
                  ))}
                </div>
                <div className="w-2/3 ml-4">
                  <p className="text-lg font-bold">{lostItem.name}</p>
                  <p>Color: {lostItem.color}</p>
                  <p>Category: {lostItem.category}</p>
                  <p>Brand: {lostItem.brand}</p>
                  <p>Date Lost: {lostItem.date}</p>
                  <p>Description: {lostItem.description}</p>
                  {/* Add contact details here */}
                </div>
              </div>

              {/* Display similarity results */}
              <h2 className="text-xl font-bold mt-4">Similarity Results</h2>
              {similarityResults.map(({ foundItem, similarity }) => (
                <div key={foundItem._id} className="mt-2">
                  <p></p>
                  <div className="flex items-center border rounded-lg overflow-hidden shadow-md">
                    <div className="w-1/3">
                      {foundItem.images.map((image, index) => (
                        <img key={index} src={`http://localhost:8000${image}`} alt={`Found Item ${index + 1}`} className="max-w-full h-auto" />
                      ))}
                    </div>
                    <div className="w-2/3 p-4">
                      <p className="text-lg font-bold mb-2">{foundItem.name}</p>
                      <p className="text-gray-600">Color: {foundItem.color}</p>
                      <p className="text-gray-600">Category: {foundItem.category}</p>
                      <p className="text-gray-600">Brand: {foundItem.brand}</p>
                      <p className="text-gray-600">Date Lost: {foundItem.date}</p>
                      <p className="text-gray-600 mb-4">Description: {foundItem.description}</p>
                      <p>Matched rate: {similarity * 100 + "%"}</p>
                      {/* Add contact details here */}
                      <div className="flex items-center justify-between"></div>
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
