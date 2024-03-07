
// "use client"

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const EditPost = ({ postId }) => {
//   const [post, setPost] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     type: '',
//     category: [],
//     brand: [],
//     date: '',
//     description: '',
//     images: [],
//   });

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         setIsLoading(true);
//         const response = await axios.get(`http://localhost:8000/api/posts/${postId}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         setPost(response.data);
//         setFormData(response.data);
//       } catch (error) {
//         console.error('Error fetching post:', error);
//         setError('Failed to fetch post. Please try again later.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPost();
//   }, [postId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setIsLoading(true);
//       await axios.put(`http://localhost:8000/api/posts/${postId}`, formData, {
//         headers: {
//           'Content-type':'multipart/form-data',  
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       alert('Post updated successfully');
//       window.location.href = 'userprofile-page'; // Redirect the user back to the profile page after editing
//     } catch (error) {
//       console.error('Error updating post:', error);
//       alert('Failed to update post. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-md">
//       <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
//       {post && (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="block w-full border border-gray-300 rounded-md px-4 py-2" />
//           <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">Save Changes</button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default EditPost;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditPost = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: [],
    color: [],
    category: [],
    brand: [],
    date: '',
    description: '',
    images: [],
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:8000/api/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setPost(response.data);
        setFormData({
          name: response.data.name,
          color: response.data.color,
          category: response.data.category,
          brand: response.data.brand,
          date: response.data.date,
          description: response.data.description,
          images: response.data.images,
          // ... other fields, excluding type
        });
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to fetch post. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const postData = {
        name: formData.name,
        color: formData.color,
        category: formData.category,
        brand: formData.brand,
        date: formData.date,
        description: formData.description,
        //images: formData.images,
        // ... other fields (exclude type)
      };

      await axios.put(
        `http://localhost:8000/api/posts/${postId}`,
        postData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      alert('Post updated successfully');
      window.location.href = 'userprofile-page'; // Redirect the user
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      {post && (
        <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="block w-full border border-gray-300 rounded-md px-4 py-2"
        />
        {/* <input
          type="text"
          name="images"
          value={formData.images}
          onChange={handleInputChange}
          placeholder="Images"
          className="block w-full border border-gray-300 rounded-md px-4 py-2"
        /> */}
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleInputChange}
          placeholder="Color"
          className="block w-full border border-gray-300 rounded-md px-4 py-2"
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          placeholder="Category"
          className="block w-full border border-gray-300 rounded-md px-4 py-2"
        />
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleInputChange}
          placeholder="Brand"
          className="block w-full border border-gray-300 rounded-md px-4 py-2"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          placeholder="Date"
          className="block w-full border border-gray-300 rounded-md px-4 py-2"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="block w-full border border-gray-300 rounded-md px-4 py-2"
        ></textarea>
        {/* <input
          type="text"
          name="created_by"
          value={formData.created_by}
          onChange={handleInputChange}
          placeholder="Created By"
          className="block w-full border border-gray-300 rounded-md px-4 py-2"
        /> */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
        >
          Save Changes
        </button>
      </form>
      )}
    </div>
  );
};

export default EditPost;
