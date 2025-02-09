const Photo = require('../models/photo');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const createPhoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Brak pliku' });
        }

        const { title, description } = req.body;
        const newPhoto = new Photo({
            title,
            description,
            image: {
                data: req.file.buffer, 
                contentType: req.file.mimetype
            },
            userId: req.userId
        });

        await newPhoto.save();
        res.status(201).json({ message: 'Zdjęcie zapisane w bazie!', photo: newPhoto });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




const getPhotos = async (req, res) => {
    try {
        const photos = await Photo.find().select('_id title description image.contentType userId createdAt');
        
        const formattedPhotos = photos.map(photo => ({
            _id: photo._id,
            title: photo.title,
            description: photo.description,
            contentType: photo.image.contentType, 
            userId: photo.userId,
            createdAt: photo.createdAt
        }));

        res.json(formattedPhotos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getPhotoById = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id);
        if (!photo) {
            return res.status(404).json({ error: "Zdjęcie nie znalezione" });
        }

        if (!photo.image || !photo.image.data) {
            return res.status(500).json({ error: "Brak danych obrazu w bazie" });
        }

        res.set('Content-Type', photo.image.contentType);
        res.send(photo.image.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updatePhoto = async (req, res) => {
    const { title, description, imageUrl } = req.body
    const photo = await Photo.findByIdAndUpdate(req.params.id, { title, description, imageUrl }, { new: true })
    res.json(photo)
}

const deletePhoto = async (req, res) => {
    await Photo.findByIdAndDelete(req.params.id)
    res.json({ message: 'Photo deleted successfully' })
}

module.exports = { createPhoto, getPhotos, getPhotoById, updatePhoto, deletePhoto, upload}