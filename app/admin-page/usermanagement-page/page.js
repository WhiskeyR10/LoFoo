"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import AdminHeader from '../../../app/components/AdminHeader';
import AdminFooter from '../../../app/components/AdminFooter';

const UserManagement = () => {
  // State to store the list of users
  const [users, setUsers] = useState([]);
  // State to handle errors
  const [error, setError] = useState(null);

  // Function to fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/users', {
        // Include authentication header if required:
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with your token retrieval logic
        },
      });
      setUsers(response.data);
      setError(null); // Clear any previous error
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error.message || 'An error occurred fetching users.'); // Handle generic or specific errors
    }
  };

  // Function to delete a user
  const handleDeleteUser = async (userId) => {
    try {
      // Assuming this endpoint also requires authentication:
      await axios.delete(`http://localhost:8000/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Update users after successful deletion (update logic might vary):
      //setUsers(users.filter((user) => user.id !== userId));
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      setError(error.message || 'An error occurred deleting user.'); // Handle generic or specific errors
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []); // Empty dependency array to fetch once on mount

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>User Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Admin Header */}
      <AdminHeader />

      {/* Main Content */}
      <main className="container mx-auto py-8">
        <section className="p-4">
          <h2 className="text-2xl font-semibold mb-4">User Management</h2>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2">User ID</th>
                <th className="border border-gray-400 px-4 py-2">Name</th>
                <th className="border border-gray-400 px-4 py-2">Email</th>
                {/* <th className="border border-gray-400 px-4 py-2">Type</th> */}
                <th className="border border-gray-400 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="border border-gray-400 px-4 py-2">{user._id}</td>
                  <td className="border border-gray-400 px-4 py-2">{user.fname+" "+user.lname}</td>
                  <td className="border border-gray-400 px-4 py-2">{user.email}</td>
                  {/* <td className="border border-gray-400 px-4 py-2">{user.type}</td> */}
                  <td className="border border-gray-400 px-4 py-2">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {/* Admin Footer */}
      <AdminFooter />
    </div>
  );
};

export default UserManagement;
