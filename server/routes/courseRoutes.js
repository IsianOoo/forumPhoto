const express = require('express');
const { createCourse, getCourses, getCourseById, updateCourse, deleteCourse } = require('../controllers/courseController');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware')

router.use(verifyToken).post('/', createCourse);   
router.get('/', getCourses);     
router.get('/:id', getCourseById); 
router.use(verifyToken).put('/:id', updateCourse);  
router.use(verifyToken).delete('/:id', deleteCourse); 

module.exports = router;
