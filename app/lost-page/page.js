
'use client';
import React, { useEffect , useState} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import jwt_decode from 'jsonwebtoken';



const LostPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if(!token) {
      setErrorMessage("Missing JWT token. Please log in.");
    } else {
      try {
        jwt_decode(token);
      } catch (error) {
        setErrorMessage('Invalid JWT token. Please log in again.');
      }
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append('name', event.target.itemName.value);
    formData.append('color', event.target.color.value);
    formData.append('category', event.target.category.value);
    formData.append('brand', event.target.itemBrand.value);
    formData.append('date', event.target.itemDate.value);
    formData.append('time', event.target.itemTime.value);
    formData.append('images', event.target.itemImage.files[0]);
    formData.append('description', event.target.additionalInfo.value);

    try {
        const headers = {
          'Content-type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        };

        const res = await axios.post('http://localhost:8000/api/lostitems', formData, { headers });


        router.push('/test-page');
        console.log(res.data.lostItem);
      } catch (err) {
        console.error(err);
      }
    }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto mt-8 mb-5 p-6 bg-white shadow-md rounded-md max-w-md mx-auto">
          <form onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold mb-8 text-center">Report a Lost Item</h1>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemName">
                What was lost?
              </label>
              <input
                type="text"
                id="itemName"
                name="itemName"
                className="border rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Item name"
                required
              />
            </div>

            {/* Color */}
            <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">
    Color
  </label>
  <select
    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500" name='color'
    required
  >
    <option value="" disabled selected>Select a color</option>
    <option value="red">Red</option>
    <option value="blue">Blue</option>
    <option value="green">Green</option>
    <option value="yellow">Yellow</option>
    <option value="pink">Pink</option>
    <option value="black">Black</option>
    <option value="white">White</option>
    {/* Add more color options as needed */}
  </select>
</div>



            {/* Category */}
            <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">
    Category
  </label>
  <select
    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500" name='category'
    required
  >
    <option value="">Select a category</option>
    <option value="electronics">Electronics</option>
    <option value="home-appliances">Home Appliances</option>
    <option value="clothing">Clothing</option>
    <option value="furniture">Furniture</option>
  </select>
</div>


            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemBrand">
                Brand
              </label>
              <input
                type="text"
                id="itemBrand"
                name="itemBrand"
                className="border rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"  placeholder="Brand name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemDate">
                Date Lost
              </label>
              <input
                type="date"
                id="itemDate"
                name="itemDate"
                className="border rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemTime">
                Time Lost
              </label>
              <input
                type="time"
                id="itemTime"
                name="itemTime"
                className="border rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemImage">
                Upload Image
              </label>
              <input type="file" id="itemImage" name="itemImage" accept="image/*" className="py-2" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="additionalInfo">
                Description
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                rows="4"
                className="border rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>

            <div className="text-center">
            
        
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded mr-4 hover:bg-red-500"
              >
                Report
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LostPage;

