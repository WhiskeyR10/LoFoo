const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
require("dotenv").config()
const User = require("../model/User");
const {checkAuthentication} = require("../middleware/auth");

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
        
        userObj.isAdmin = userObj.isAdmin || false; // Set `isAdmin` to false if not an admin

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
    // Check if the logged-in user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Forbidden: Admin access required" });
    }

    // Validation logic for admin registration...
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash the password for security
    const hashed = await bcrypt.hash(password, 10);

    // Create the admin user
    let user = await User.create({ ...req.body, password: hashed, isAdmin: true });

    // Remove sensitive information from the response
    user = user.toObject();
    delete user.password;

    // Respond with the created admin user
    res.status(201).json(user);
  } catch (error) {
    // Pass any errors to the error handling middleware
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
      // Check if the authenticated user is an admin
      if (!req.user.isAdmin) {
          return res.status(403).json({ message: "Forbidden: Admin access required" });
      }
      
      // Retrieve all users
      const users = await User.find({});
      
      res.json(users);
  } catch (error) {
      // Handle errors
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