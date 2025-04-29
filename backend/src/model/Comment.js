const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Yorumun sahibi
    mealId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meal",
      required: true,
    }, // Yorum yapılan yemek
    text: { type: String, required: true }, // Yorum metni
    rating: { type: Number, min: 1, max: 5, required: true } // Puanlama
  },
  { timestamps: true }
);
module.exports = mongoose.model("Comment", commentSchema);