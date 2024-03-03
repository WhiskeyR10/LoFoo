// controllers/lostitem.js
const LostItem = require("../model/lostitem")
const FoundItem = require("../model/FoundItem")
const User = require("../model/User")
const path = require("path")
const {tokenizeAndClean, calculateCosineSimilarity} = require("../Algorithm/cosineSimilarity")
const jwt = require("jsonwebtoken");
const transporter = require("../config/transporter");
const mjml2html = require("mjml");
const ejs = require("ejs");
const fs = require("fs");

const create = async (req, res, next) => {
  try {
    
    const token = req.headers?.authorization?.split(" ")[1]
    console.log(token);
    if (!token) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    try {
      
      const decoded = jwt.verify(token, 'WHISKY');
      console.log(decoded);
      const userId = decoded._id;
      console.log(userId);
      const { name, color, category, brand, description, date, created_by } = req.body;

      const image_name = Date.now() + req.files.images.name;
      await req.files.images.mv(path.join(__dirname, '../uploads/' + image_name));

      const relativeImagePath = `/uploads/${image_name}`;

      const lostItem = await LostItem.create({
        name,
        color,
        category,
        brand,
        description,
        date,
        images: [relativeImagePath],
        created_by: userId,
      });

      res.status(201).send({
        msg: "Lost item created successfully",
        lostItem,
      });

    } catch (err) {
      return res.status(401).send({ message: 'Invalid token' });
    }
  } catch (err) {
    next(err);
  }
};

const getRecentLostItems = async(req,res,next) => {
  try{
    const recentLostItems = await LostItem.findOne().sort({createdAt: -1})

    if(!recentLostItems) {
      return res.status(404).json({ message: "No lost item found"});
    }

    const founditems = await FoundItem.find({ category: recentLostItems.category});

    const similarityResults = founditems.map((foundItem) => ({
      foundItem,
      similarity: calculateCosineSimilarity(recentLostItems.description, foundItem.description),
    }));

    similarityResults.sort((a, b) => b.similarity - a.similarity);
    res.status(200).json({ message: "Similarity results", results: similarityResults , recentLostItems});
  } catch (err) { 
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const sendMail = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1]
  console.log(token);
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  const decoded = jwt.verify(token, 'WHISKY');
      console.log(decoded);
      const userId = decoded._id;
      console.log(userId,"Message");
  try {
    const mjmlTemplate = fs.readFileSync(
      path.resolve(__dirname, "../config/mail.mjml"),
      "utf8"
    ); 
    const data = { text: req.body.textareaValue }; 
    const foundDetails = await User.findById({_id: req.body.userId});
    const lostDetails = await User.findById({_id: userId});
    console.log(foundDetails,"Hello Mail!")
    console.log(data)
    const renderedMJML = ejs.render(mjmlTemplate,{data});
    const { html } = mjml2html(renderedMJML);
    console.log(req.body,'Body body');
    const info = await transporter.sendMail({
      from: lostDetails.email,
      to: foundDetails.email,
      subject: "Result",
      html: html, 
    });
    return res.status(200).json({message: "Mail sent successfully"});
  } catch (error) {
    console.error("Error sending mail:", error);
    return res.status(500).json( error.message );
  }
}

module.exports = {
  create,
  getRecentLostItems,
  sendMail,
};


