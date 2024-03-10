// const FoundItem = require("../model/FoundItem");      
// const path = require("path");
// const jwt = require("jsonwebtoken");


// const create = async (req, res, next) => {  
//   try {
    
//     const token = req.headers?.authorization?.split(" ")[1]
//     console.log(token);
//     if (!token) {
//       return res.status(401).send({ message: 'Unauthorized' });
//     }

//     try{
//       const decoded = jwt.verify(token, 'WHISKY');
//       const userId = decoded._id;

//       let image_name = Date.now() + req.files.images.name;
//       await req.files.images.mv(path.join(__dirname, '../uploads/' + image_name))
//       const { name, color, category, brand, description, date, created_by } = req.body;

//       const relativeImagePath = `/uploads/${image_name}`;

//       const founditem = await FoundItem.create({
//         name,
//         color,
//         category,
//         brand,
//         date,
//         description,
//         images:[relativeImagePath],
//         created_by: userId,
//       });

//       // const foundItemId = founditem._id;

//       // lostItemMatchingQueue.add({ foundItemId});

//       res.status(201).json({
//         message: "Found item created successfully",
//         founditem,
//       });
//     } catch (err) {
//       return res.status(401).send({ message: 'Invalid token' });
//     }
//   } catch (err) {
//       next(err);
//     }
//   };

// module.exports = { create };
const LostItem = require("../model/lostitem")
const FoundItem = require("../model/FoundItem");   
const User = require("../model/User")
const {tokenizeAndClean, calculateCosineSimilarity} = require("../Algorithm/cosineSimilarity")
const path = require("path");
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

    try{
      const decoded = jwt.verify(token, 'WHISKY');
      const userId = decoded._id;

      let image_name = Date.now() + req.files.images.name;
      await req.files.images.mv(path.join(__dirname, '../uploads/' + image_name))
      const { name, color, category, brand, description, date, created_by } = req.body;

      const relativeImagePath = `/uploads/${image_name}`;

      const founditem = await FoundItem.create({
        name,
        color,
        category,
        brand,
        date,
        description,
        images:[relativeImagePath],
        created_by: userId,
      });

      // const foundItemId = founditem._id;

      // lostItemMatchingQueue.add({ foundItemId});

      res.status(201).json({
        message: "Found item created successfully",
        founditem,
      });
    } catch (err) {
      return res.status(401).send({ message: 'Invalid token' });
    }
  } catch (err) {
      next(err);
    }
  };

  
const getRecentFoundItems = async(req,res,next) => {
  try{
    const recentFoundItems = await FoundItem.findOne().sort({createdAt: -1})

    if(!recentFoundItems) {
      return res.status(404).json({ message: "No Found item found"});
    }

    const lostitems = await LostItem.find({ category: recentFoundItems.category});

    const similarityResults = lostitems.map((lostItem) => ({
      lostItem,
      similarity: calculateCosineSimilarity(recentFoundItems.description, lostItem.description),
    }));

    similarityResults.sort((a, b) => b.similarity - a.similarity);
    res.status(200).json({ message: "Similarity results", results: similarityResults , recentFoundItems});
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
    const lostDetails = await User.findById({_id: req.body.userId});
    const foundDetails = await User.findById({_id: userId});
    console.log(lostDetails,"Hello Mail!")
    console.log(data)
    const renderedMJML = ejs.render(mjmlTemplate,{data});
    const { html } = mjml2html(renderedMJML);
    console.log(req.body,'Body body');
    const info = await transporter.sendMail({
      from: foundDetails.email,
      to: lostDetails.email,
      subject: "On regards to the posted lost item",
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
  getRecentFoundItems,
  sendMail,
};
