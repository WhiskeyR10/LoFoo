
"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import EditPost from '../components/EditPost'; // Import the EditPost component

const UserProfile = () => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editPostId, setEditPostId] = useState(null); // State to track the post being edited

  useEffect(() => {
    const checkLoginAndFetchProfile = async () => {
      const isLoggedIn = localStorage.getItem('token');

      if (isLoggedIn) {
        try {
          setIsLoading(true);

          // Fetch user profile
          const response = await axios.get('http://localhost:8000/api/profile', {
            headers: {
              Authorization: `Bearer ${isLoggedIn}`
            }
          });
          setUser(response.data);

          // Fetch user posts
          const postsResponse = await axios.get(`http://localhost:8000/api/user/${response.data._id}/posts`, {
            headers: {
              Authorization: `Bearer ${isLoggedIn}`
            }
          });
          setPosts(postsResponse.data);
        } catch (err) {
          console.error('Error fetching user profile:', err);
          setError(err);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Show notification and redirect
        toast.error('You need to be logged in to access the profile page', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.push('/login-page');
      }
    };

    checkLoginAndFetchProfile();
  }, []);

  // Function to set the postId of the post being edited
  const handleEditPost = (postId) => {
    setEditPostId(postId);
  };

  // Function to clear the postId when editing is finished
  const handleFinishEdit = () => {
    setEditPostId(null);
  };

  // Function to update a post
  const updatePost = async (postId, updatedData) => {
    try {
      setIsLoading(true);
      const response = await axios.put(`http://localhost:8000/api/posts/${postId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const updatedPosts = posts.map(post => post._id === postId ? response.data : post);
      setPosts(updatedPosts);
      toast.success('Post updated successfully');
      handleFinishEdit(); // Clear the postId after editing is finished
    } catch (err) {
      console.error('Error updating post:', err);
      setError(err);
      toast.error('Failed to update post. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to delete a post
  const deletePost = async (postId, postType) => {
    try {
      const confirmation = window.confirm('Are you sure you want to delete this post?');
      if (confirmation) {
        setIsLoading(true);
        await axios.delete(`http://localhost:8000/api/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          data: {
            type: postType 
          }
        });
        const updatedPosts = posts.filter(post => post._id !== postId);
        setPosts(updatedPosts);
        toast.success('Post deleted successfully');
      }
    } catch (err) {
      console.error('Error deleting post:', err);
      setError(err);
      toast.error('Failed to delete post. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex justify-center items-center mt-8">
        <div className="max-w-md w-full p-6 bg-white shadow-md rounded-md">
          {isLoading && <p className="text-center">Loading...</p>}
          {error && <p className="text-center text-red-500">Error: {error.message}</p>}
          {!isLoading && !error && !user && (
            <p className="text-center">User not found.</p>
          )}
          {!isLoading && !error && user && (
            <div>
              <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">{user.fname} {user.lname}</h1>
              <div className="border-t border-b border-gray-200 py-4">
                <p className="text-gray-600">Email: {user.email}</p>
                <p className="text-gray-600">Phone No: {user.phone}</p>
              </div>
            </div>
          )}
          {posts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mt-8 mb-4 text-center text-gray-800">User Posts</h2>
              <ul>
                {posts.map(post => (
                  <li key={post._id} className="border border-gray-200 p-4 rounded-md mb-4">
                    <h3 className="text-xl font-bold mb-2">{post.name}</h3>
                    <p><strong>Type:</strong> {post.type}</p>
                    <p><strong>Color:</strong> {post.color.join(', ')}</p>
                    <p><strong>Category:</strong> {post.category.join(', ')}</p>
                    <p><strong>Brand:</strong> {post.brand.join(', ')}</p>
                    <p><strong>Date:</strong> {new Date(post.date).toLocaleDateString()}</p>
                    <p><strong>Description:</strong> {post.description}</p>
                    {post.images && post.images.length > 0 && (
                      <div className="mt-2">
                        {post.images.map((image, index) => (
                          <img key={index} src={image} alt={`Image ${index}`} className="max-w-full h-auto mb-2" />
                        ))}
                      </div>
                    )}
                    <div className="flex justify-between mt-4">
                      {/* Render the Edit button */}
                      <button onClick={() => handleEditPost(post._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Edit</button>
                      <button onClick={() => deletePost(post._id, post.type)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete</button>
                    </div>
                    {/* Render the EditPost component only if editPostId matches */}
                    {editPostId === post._id && <EditPost postId={post._id} updatePost={updatePost} />}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default UserProfile;

