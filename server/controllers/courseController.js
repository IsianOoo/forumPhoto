const Course = require('../models/course');


const createCourse = async (req, res) => {
    try {
        const { title, description, content } = req.body;
        if (!title || !description || !content) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const course = await Course.create({
            title,
            description,
            content,
            instructor: req.userId
        });

        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('instructor', 'name email');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('instructor', 'name email');
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createCourse, getCourses, getCourseById };