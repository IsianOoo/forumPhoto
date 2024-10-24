const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
});

const CourseModel = mongoose.model('Course', courseSchema);

module.exports = CourseModel;