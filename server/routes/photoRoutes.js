const express = require('express');
const { createPhoto, getPhotos, getPhotoById, updatePhoto, deletePhoto} = require('../controllers/photoController');
const router = express.Router();

router.post('/', createPhoto);
router.get('/', getPhotos);   
router.get('/:id', getPhotoById); 
router.put('/:id', updatePhoto);  
router.delete('/:id', deletePhoto); 

module.exports = router;
