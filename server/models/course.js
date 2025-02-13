const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    thumbnail: {
        data: Buffer,
        contentType: String
    },
    category: { type: String, required: true }, 
    difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], required: true },
    duration: { type: Number, required: true }, 
    language: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Course", courseSchema);