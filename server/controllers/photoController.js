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
        const photos = await Photo.find().select('_id title description userId createdAt');

        
        const formattedPhotos = photos.map(photo => ({
            _id: photo._id,
            title: photo.title,
            description: photo.description,
            imageUrl: `http://localhost:8000/photo/${photo._id}/view`,
            userId: photo.userId,
            createdAt: photo.createdAt
        }));

        res.json(formattedPhotos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getPhotoImage = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id);
        if (!photo || !photo.image.data) {
            return res.status(404).json({ error: "Photo not found" });
        }

        res.set({
            'Content-Type': photo.image.contentType,
            'Cache-Control': 'public, max-age=31536000', 
            'Access-Control-Allow-Origin': '*'
        });

        res.send(photo.image.data);
    } catch (error) {
        console.error("Error fetching image:", error);
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

module.exports = { createPhoto, getPhotos, getPhotoById, updatePhoto, deletePhoto, upload,getPhotoImage}