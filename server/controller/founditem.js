const FoundItem = require("../model/FoundItem");      
const path = require("path");
const { ObjectId } = require("mongoose").Types;
const create = async (req, res, next) => {  
  try {   
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
    created_by: new ObjectId(),
  });

      // Send response
      res.status(201).json({
        message: "Found item created successfully",
        founditem,
      });
    } catch (err) {
      // Pass error to the error handling middleware
      next(err);
    }
  };

module.exports = { create };