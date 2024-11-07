const express = require('express');
const { createPhoto, getPhotos, getPhotoById, updatePhoto, deletePhoto} = require('../controllers/photoController');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware')

router.use(verifyToken).post('/', createPhoto);
router.get('/', getPhotos);   
router.get('/:id', getPhotoById); 
router.use(verifyToken).put('/:id', updatePhoto);  
router.use(verifyToken).delete('/:id', deletePhoto); 

module.exports = router;
