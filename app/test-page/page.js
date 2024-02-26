
"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LostItemSimilarity = () => {
  const [data, setData] = useState(null); // Initialize with null/default
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await axios.get("http://localhost:8000/api/lostitems/recent"); 
        const data = response.data;
        setData(data);
      } catch (err) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  return (
    <div className="lost-item-similarity">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Similarity Results</h1>
        {loading && <p className="text-center">Loading results...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        {data && !loading && (
          <div className="result-container">
            <div className="lost-item-info">
              <h2 className="text-xl font-bold mb-4"> Lost Item</h2>
              <div className="bg-white shadow-md rounded-md p-4">
                <ul>
                  <li><strong>Name:</strong> {data.recentLostItems.name}</li>
                  <li><strong>Color:</strong> {data.recentLostItems.color}</li>
                  <li><strong>Category:</strong> {data.recentLostItems.category}</li>
                  <li><strong>Description:</strong> {data.recentLostItems.description}</li>
                </ul>
                <div className="mt-4 flex flex-wrap">
                  {data.recentLostItems.images.map((image, index) => (
                    <img
                      key={index}
                      src={`http://localhost:8000${image}`}
                      alt={`Lost Item ${index + 1}`}
                      className="w-1/3 mb-2 mr-2"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100x100';
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="found-items mt-6">
              <h2 className="text-xl font-bold mb-4">Matching Found Items</h2>
              <ul>
                {data.results.map((result) => (
                  <li key={result.foundItem._id} className="bg-white shadow-md rounded-md p-4 mb-4">
                    <p><strong>Found Item:</strong> {result.foundItem.name}</p>
                    <p><strong>Category:</strong> {result.foundItem.category}</p>
                    <p><strong>Description:</strong> {result.foundItem.description}</p>
                    <p><strong>Similarity:</strong> {(result.similarity * 100).toFixed(2)}%</p>            
                    <div className="mt-2 flex flex-wrap">
                      {result.foundItem.images.map((image, index) => (
                        <img
                          key={index}
                          src={`http://localhost:8000${image}`}
                          alt={`Found Item ${index + 1}`}
                          className="w-1/3 mb-2 mr-2"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/100x100';
                          }}
                        />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {data && !loading && data.length === 0 && <p className="text-center">No matching found items.</p>}  {/* Check for both data and length */}
      </div>
      <Footer />
    </div>
  );
};

export default LostItemSimilarity;
