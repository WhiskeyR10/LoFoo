const express = require("express");
const { create } = require("../controller/lostitem");
const { getRecentLostItems } = require('../controller/lostitem');


const router = express.Router();

// Create a lost item
router.post("/", create);
router.get('/recent', getRecentLostItems);

module.exports = router;