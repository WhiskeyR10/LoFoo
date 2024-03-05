"use client"

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AdminRegisterPage = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    phone: '',
    email: '',
    password: '',
    repeat_password:''
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/register/admin', formData);
      console.log('Admin Registration successful:', response.data);
      
      router.push('/login-page');

    } catch (error) {
      console.error('Admin Registration failed:', error.response.data);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="bg-gray-200 flex-grow flex items-center justify-center">
        <div className="bg-gray-50 p-8 rounded shadow-md max-w-md w-full">
          <h2 className="text-3xl font-bold mb-4 text-center">Admin Register</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
                First Name
              </label>
              <input
                type="text"
                id="fname"
                name="fname"
                className="mt-1 p-2 w-full border rounded-md"
                value={formData.fname}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
                Last Name
              </label>
              <input
                type="text"
                id="lname"
                name="lname"
                className="mt-1 p-2 w-full border rounded-md"
                value={formData.lname}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="mt-1 p-2 w-full border rounded-md"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded-md"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border rounded-md"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label htmlFor="repeat_password" className="block text-sm font-medium text-gray-600">Re-enter Password</label>
              <input
                type="password"
                id="repeat_password"
                name="repeat_password"
                className="mt-1 p-2 w-full border rounded-md"
                value={formData.repeat_password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
            >
              Register
            </button>
            <p className="mt-4 text-gray-600 text-center">
              Already have an account?{' '}
              <Link href="/login-page">
                Log in here
              </Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminRegisterPage;
