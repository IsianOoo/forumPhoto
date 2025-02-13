const Course = require('../models/course');


const createCourse = async (req, res) => {
    try {
        const { title, description, content, category, difficulty, duration, language } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized. No user found." });
        }

        if (!title || !description || !content || !category || !difficulty || !duration || !language) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newCourse = new Course({
            title,
            description,
            content,
            category,
            difficulty,
            duration,
            language,
            userId,
            thumbnail: req.file ? {
                data: req.file.buffer,
                contentType: req.file.mimetype
            } : undefined
        });

        await newCourse.save();
        res.status(201).json({ message: "Course created successfully", course: newCourse });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().select("_id title description content userId category difficulty duration language createdAt");

        const formattedCourses = courses.map(course => ({
            _id: course._id,
            title: course.title,
            description: course.description,
            content: course.content,
            userId: course.userId,
            category: course.category,
            difficulty: course.difficulty,
            duration: course.duration,
            language: course.language,
            createdAt: course.createdAt,
            thumbnailUrl: course.thumbnail ? `http://localhost:8000/course/${course._id}/thumbnail` : null 
        }));

        res.json(formattedCourses);
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
        const { title, description, content, category, difficulty, duration, language } = req.body;
        const { id } = req.params;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized. No user found." });
        }

        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ error: "Course not found." });
        }

        if (course.userId.toString() !== userId) {
            return res.status(403).json({ error: "You can only update your own courses." });
        }

        if (title) course.title = title;
        if (description) course.description = description;
        if (content) course.content = content;
        if (category) course.category = category;
        if (difficulty) course.difficulty = difficulty;
        if (duration) course.duration = duration;
        if (language) course.language = language;
        if (req.file) {
            course.thumbnail = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        }

        await course.save();
        res.status(200).json({ message: "Course updated successfully", course });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized. No user found." });
        }

        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ error: "Course not found." });
        }

        if (course.userId.toString() !== userId) {
            return res.status(403).json({ error: "You can only delete your own courses." });
        }

        await course.deleteOne();
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCourseThumbnail = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course || !course.thumbnail || !course.thumbnail.data) {
            return res.status(404).json({ error: "Thumbnail not found" });
        }

        res.set({
            'Content-Type': course.thumbnail.contentType,
            'Cache-Control': 'public, max-age=31536000', 
            'Access-Control-Allow-Origin': '*'
        });

        res.send(course.thumbnail.data);
    } catch (error) {
        console.error("Error fetching thumbnail:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {getCourseThumbnail, deleteCourse, updateCourse, createCourse, getCourses, getCourseById };