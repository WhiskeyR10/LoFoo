const express = require("express");
const { create } = require("../controller/founditem");
const { getRecentFoundItems, sendMail } = require('../controller/founditem');


const router = express.Router();

router.post("/",create);
router.get('/recent', getRecentFoundItems);
router.post('/sendMail', sendMail);

module.exports = router;
