const FoundItem = require("../model/FoundItem");      
const path = require("path");
const jwt = require("jsonwebtoken");


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

module.exports = { create };
