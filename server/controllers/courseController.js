const Course = require('../models/course');

const createCourse = async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const course = await Course.create({ title, description, price, instructor: req.user._id });
        res.json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getCourses = async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
};

const getCourseById = async (req, res) => {
    const course = await Course.findById(req.params.id);
    res.json(course);
};

const updateCourse = async (req, res) => {
    const { title, description, price } = req.body;
    const course = await Course.findByIdAndUpdate(req.params.id, { title, description, price }, { new: true });
    res.json(course);
};

const deleteCourse = async (req, res) => {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted successfully' });
};

module.exports = { createCourse, getCourses, getCourseById, updateCourse, deleteCourse };
