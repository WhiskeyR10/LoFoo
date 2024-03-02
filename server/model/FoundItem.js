const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const FoundItemSchema = new Schema(
  {
    name: {
      type: [String],
      required: true,
    },
    images: {
      type: [String],
    },
    color: {
      type: [String],
      required: true,
    },
    category: {
      type: [String],
      required: true,
    },
    brand: {
      type: [String],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId, // Use the correct type
      ref: "User", // Reference the user model name
      required: true,
    },
    
    similarity: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FoundItem", FoundItemSchema);
