const express = require("express");
const { create } = require("../controller/lostitem");
const { getRecentLostItems, sendBill } = require('../controller/lostitem');


const router = express.Router();

// Create a lost item
router.post("/", create);
router.get('/recent', getRecentLostItems);
router.post('/sendBill', sendBill);


module.exports = router;