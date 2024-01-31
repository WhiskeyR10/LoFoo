const express = require("express");
//const { checkAuthentication } = require("../middleware/auth");

const { index, create } = require("../controller/founditem");

const router = express.Router();

router.post("/",create);

module.exports = router;
