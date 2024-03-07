const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
require("dotenv").config()
const User = require("../model/User");
const LostItem = require("../model/lostitem");
const FoundItem = require("../model/FoundItem");
const {checkAuthentication, normalUserAuth} = require("../middleware/auth");

const router = express.Router();

// Server side validation for user signup

const SignupSchema = Joi.object({
  fname: Joi.string().required(),

  lname: Joi.string().required(),

  phone: Joi.number().required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),

  repeat_password: Joi.ref("password"),
});

router.post("/api/signup", async (req, res, next) => {
  try {
    // Server side validaiton

    let { error } = SignupSchema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });

    if (error?.details) {
      res.status(400).send({
        errors: error?.details,
      });
      return;
    }

    // Password hashing

    let hashed = await bcrypt.hash(req.body.password, 10);

    let user = await User.create({ ...req.body, password: hashed, isAdmin: false });

    user = user.toObject()
    delete user.password

    res.send(user);
  } catch (err) {
    next(err);
  }
});

// Server side validation for user signin

const SigninSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

// User signin endpoint

router.post("/api/signin", async (req, res, next) => {
  try {
    let { error } = SigninSchema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });

    if (error?.details) {
      res.status(400).send({
        errors: error?.details,
      });
      return;
    }

    let user = await User.findOne({ email: req.body.email }).select("+password");

    if (user) {
      let matched = await bcrypt.compare(req.body.password, user.password);
      if (matched) {

        let userObj = user.toObject();
        delete userObj.email;
        delete userObj.password;
        
        userObj.isAdmin = userObj.isAdmin || false; 

        let token = jwt.sign({ ...userObj, isAdmin: userObj.isAdmin }, process.env.JWT_SECRET);
        res.send({ msg: "Logged in successfully", token, isAdmin: userObj.isAdmin });
        return;
        
      }
    }
    res.status(401).send({msg: "Invalid credentials",});
  } catch (err) {
    next(err);
  }
});


router.post("/api/register/admin",checkAuthentication, async (req, res, next) => {
  try {
    
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Forbidden: Admin access required" });
    }

    
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    
    const hashed = await bcrypt.hash(password, 10);

    
    let user = await User.create({ ...req.body, password: hashed, isAdmin: true });

    
    user = user.toObject();
    delete user.password;

    
    res.status(201).json(user);
  } catch (error) {
    
    next(error);
  }
});


router.get("/admin/dashboard", checkAuthentication, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Forbidden: Admin access required" });
  }
  res.send("Welcome to admin dashboard!");
});

router.get("/admin/users", checkAuthentication, async (req, res, next) => {
  try {
      
      if (!req.user.isAdmin) {
          return res.status(403).json({ message: "Forbidden: Admin access required" });
      }
      
      
      const users = await User.find({});
      
      res.json(users);
  } catch (error) {
      
      next(error);
  }
});


router.delete("/admin/users/:id", checkAuthentication, async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Forbidden: Admin access required" });
    }

    const userId = req.params.id; // Retrieve ID from request parameter


    const deletedUser = await deleteUserById(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" }); // Specific message
  }
});

router.get("/api/profile", normalUserAuth, async (req, res, next) => {
  try {
    const userId = req.user._id; 

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});


router.get("/api/user/:userId/posts", normalUserAuth, async (req, res, next) => {
  try {
    const userId = req.params.userId;
    
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const lostItems = await LostItem.find({ created_by: userId });
    const foundItems = await FoundItem.find({ created_by: userId });
 
    const userPosts = [
      ...lostItems.map(item => ({ ...item.toObject(), type: 'lost' })),
      ...foundItems.map(item => ({ ...item.toObject(), type: 'found' }))
    ];

    return res.status(200).json(userPosts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.route('/api/posts/:postId')
.get(normalUserAuth, async (req, res) => {
  try {
    // Fetch the post data based on the `postId` parameter
    const { postId } = req.params; // Extract the postId from the request parameters

    // Find the post in both LostItem and FoundItem models based on their types
    let post = await LostItem.findById(postId);
    if (!post) {
      post = await FoundItem.findById(postId);
    }

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Send the retrieved post data in the response
    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

// .put(normalUserAuth, async (req, res) => {
//   const { postId } = req.params;
//   const { type, ...updatedPostData } = req.body; // Destructure and remove 'type' from updatedPostData

//   try {
//     // 1. Validate type parameter
//     if (!type || (type !== 'lost' && type !== 'found')) {
//       return res.status(400).json({ message: 'Invalid post type' });
//     }

//     // 2. Find the post based on type and ID
//     let post;
//     if (type === 'lost') {
//       post = await LostItem.findById(postId);
//     } else if (type === 'found') {
//       post = await FoundItem.findById(postId);
//     } else {
//       // This should not be reached due to validation in step 1
//       console.error('Unexpected type value:', type);
//       return res.status(500).json({ message: 'Internal server error' });
//     }

//     // 3. Check if the post exists and the user owns it
//     if (!post || post.created_by.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: 'Unauthorized: Access denied' });
//     }

//     // 4. Update the post and handle potential errors
//     let updatedPost;
//     try {
//       if (type === 'lost') {
//         updatedPost = await LostItem.findByIdAndUpdate(postId, updatedPostData, { new: true });
//       } else if (type === 'found') {
//         updatedPost = await FoundItem.findByIdAndUpdate(postId, updatedPostData, { new: true });
//       }
//     } catch (error) {
//       console.error('Error updating post:', error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }

//     // 5. Send the updated post object in the response
//     if (updatedPost) {
//       res.status(200).json(updatedPost);
//     } else {
//       res.status(404).json({ message: 'Post not found' });
//     }
//   } catch (err) {
//     console.error('Unexpected error:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

.put(normalUserAuth, async (req, res) => {
  const { postId } = req.params;
  const updatedPostData = req.body; // Remove destructuring to keep 'type' field intact

  try {
    // Check for the post ID in both LostItem and FoundItem schemas
    const foundPost = await LostItem.findById(postId) || await FoundItem.findById(postId);

    if (!foundPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user owns the post
    if (foundPost.created_by.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized: Access denied' });
    }

    // Update the post based on its schema
    const updatedPost = await foundPost.constructor.findByIdAndUpdate(postId, updatedPostData, { new: true });

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/api/posts/:postId', normalUserAuth, async (req, res) => {
  const { postId } = req.params;

  try {
    // Check if the post belongs to the currently authenticated user
    let post;
    if (req.body.type === 'lost') {
      post = await LostItem.findById(postId);
    } else if (req.body.type === 'found') {
      post = await FoundItem.findById(postId);
    } else {
      return res.status(400).json({ message: 'Invalid post type' });
    }

    if (!post || post.created_by.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized: Access denied' });
    }

    // Delete the post
    if (req.body.type === 'lost') {
      await LostItem.findByIdAndDelete(postId);
    } else if (req.body.type === 'found') {
      await FoundItem.findByIdAndDelete(postId);
    } else {
      return res.status(500).json({ message: 'Internal server error' }); // Unexpected error
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

async function deleteUserById(userId) {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      
      throw new Error('User not found');
    }
    return deletedUser; 
  } catch (error) {
    
    console.error(error);
    throw error; 
  }
}

module.exports = router;