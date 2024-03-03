
"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LostItemSimilarity = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [contactFormData, setContactFormData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      
      setLoading(true);
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

  const handleContactFormChange = (value) => {
    setContactFormData({ ...contactFormData, [currentItemId]: value });
  };

  const handleContactButtonClick = (itemId) => {
    setShowForm(true);
    setCurrentItemId(itemId);
  };

  const handleSendButtonClick = async (userId, itemId) => {
    setShowForm(false);
      toast.success('Email sent successfully!', {
      hideProgressBar: true,
      autoClose: 1000,
      position: 'top-right'
    });

    const headers = {
      'Content-type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    const response = await axios.post(
      "http://localhost:8000/api/lostitems/sendMail",
      {
        userId,
        itemId,
        textareaValue: contactFormData[itemId],
      },{headers}
    );
    setContactFormData({ ...contactFormData, [itemId]: "" });
    // console.log(userId, itemId, contactFormData[itemId], "Datas found!");

  };

  return (
    <div className="lost-item-similarity">
          <ToastContainer />
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
                      <button
                        onClick={() => handleContactButtonClick(result.foundItem._id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Contact me
                      </button>
                      {showForm && currentItemId === result.foundItem._id && (
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
                                value={contactFormData[result.foundItem._id] || ""}
                                onChange={(e) => handleContactFormChange(e.target.value)}
                                rows="4"
                                cols="50"
                                className="w-full border rounded-md p-2"
                              />
                            </label>
                            <button
                              onClick={() => handleSendButtonClick(result.foundItem.created_by, result.foundItem._id)}
                              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                              Send
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {data && !loading && data.results.length === 0 && <p className="text-center">No matching found items.</p>}
      </div>
      <Footer />
    </div>
  );
};

export default LostItemSimilarity;
