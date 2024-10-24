const express = require('express');
const { createCourse, getCourses, getCourseById, updateCourse, deleteCourse } = require('../controllers/courseController');
const router = express.Router();

router.post('/', createCourse);   
router.get('/', getCourses);     
router.get('/:id', getCourseById); 
router.put('/:id', updateCourse);  
router.delete('/:id', deleteCourse); 

module.exports = router;
