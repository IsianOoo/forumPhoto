const Course = require('../models/course');


const createCourse = async (req, res) => {
    try {
        const { title, description, content } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized. No user found." });
        }

        if (!title || !description || !content) {
            return res.status(400).json({ error: "Title, description, and content are required." });
        }

        const newCourse = new Course({
            title,
            description,
            content,
            userId: userId,
        });

        await newCourse.save();
        res.status(201).json({ message: "Course created successfully", course: newCourse });
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

const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, content } = req.body;
        const userId = req.user?.id;

        const course = await Course.findById(id).select('title description content userId');
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        if (course.userId.toString() !== userId) {
            return res.status(403).json({ error: "You can only update your own courses" });
        }

        course.title = title || course.title;
        course.description = description || course.description;
        course.content = content || course.content;
        await course.save();

        res.json({ message: "Course updated successfully", course });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id; 

        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        if (course.userId.toString() !== userId) {
            return res.status(403).json({ error: "You can only delete your own courses" });
        }

        await course.deleteOne();
        res.json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {deleteCourse, updateCourse, createCourse, getCourses, getCourseById };