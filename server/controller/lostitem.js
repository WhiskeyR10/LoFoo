// controllers/lostitem.js
const LostItem = require("../model/lostitem")
const FoundItem = require("../model/FoundItem")
const path = require("path")

const  {ObjectId} = require("mongoose").Types;

// Tokenize and clean text
function tokenizeAndClean(text) {
  const excludeWords = new Set(["the","i","I","my","My","a","on","in","is","lost","found","there","at"]);

  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "") // Remove punctuation
    .split(/\s+/) // Split into words
    .filter(word => word.length > 0 && !excludeWords.has(excludeWords)); // Remove empty words and exclude some specific words
}

// Calculate cosine similarity between two text strings
function calculateCosineSimilarity(text1, text2) {
  const words1 = tokenizeAndClean(text1);
  const words2 = tokenizeAndClean(text2);

  const uniqueWords = new Set([...words1, ...words2]);

  const vector1 = Array.from(uniqueWords).map(word =>
    words1.includes(word) ? 1 : 0
  );
  const vector2 = Array.from(uniqueWords).map(word =>
    words2.includes(word) ? 1 : 0
  );

  let dotProduct = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;

  for (let i = 0; i < uniqueWords.size; i++) {
    dotProduct += vector1[i] * vector2[i];
    magnitude1 += vector1[i] ** 2;
    magnitude2 += vector2[i] ** 2;
  }

  const similarity = dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2));
  return similarity;
}

const create = async (req, res, next) => {

// this for uploading image
try {
  let image_name = Date.now() + req.files.images.name;

  await req.files.images.mv(path.join(__dirname, '../uploads/' + image_name))
 
  const { name, color, category, brand, description, date, created_by } = req.body;

  const relativeImagePath = `/uploads/${image_name}`;

  const lostItem = await LostItem.create({
    name,
    color,
    category,
    brand,
    date,
    description,
    images:[relativeImagePath],
    created_by: new ObjectId(),
  });

    const foundItems = await FoundItem.find();

    const similarityResults = foundItems.map(foundItem => ({
      foundItem,
      similarity: calculateCosineSimilarity(lostItem.description, foundItem.description),
    }));

    similarityResults.sort((a, b) => b.similarity - a.similarity);

    similarityResults.forEach(({ foundItem, similarity }) => {
      console.log(`Cosine Similarity with Found Item (${foundItem.name}): ${similarity}`);
    });

    res.status(201).send({
      msg: "Lost item created successfully",
      lostItem,
      similarityResults,
    });
  } catch (err) {
    next(err);
  }
};

const getRecentLostItems = async (req, res, next) => {
  try {
    // const recentLostItems = await LostItem.find().sort({ date: -1 }).limit(1);
    const recentLostItems = await LostItem.find().sort({ date: -1 }).limit(0);

    const foundItems = await FoundItem.find();

    const results = recentLostItems.map((lostItem) => {
      const similarityResults = foundItems.map((foundItem) => ({
        foundItem,
        similarity: calculateCosineSimilarity(
          lostItem.description,
          foundItem.description
        ),
      }));

      similarityResults.sort((a, b) => b.similarity - a.similarity);

      return {
        lostItem,
        similarityResults,
      };
    });

    res.status(200).send(results);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  getRecentLostItems,
};
