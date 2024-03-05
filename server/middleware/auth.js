const jwt = require("jsonwebtoken")
require('dotenv').config;
const User = require('../model/User')
async function checkAuthentication(req, res, next) {

  let token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    if (!user.isAdmin) {
        return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({msg: "Unauthenticated",});
  }
}

module.exports = { checkAuthentication }
