const jwt = require("jsonwebtoken")

function checkAuthentication(req, res, next) {

  let token = req.headers?.authorization?.split(" ")[1]

  let user = null

  try{
    user = jwt.verify(token, process.env.JWT_SECRET);
  }catch(err){

  }

  if (user) {
    req.user_id = user._id
    next();
  } else {
    res.status(401).send({
      msg: "Unauthenticated",
    });
  }
}

module.exports = { checkAuthentication }
