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
        const photos = await Photo.find().select('_id title description userId createdAt likes comments');
        const formattedPhotos = photos.map(photo => ({
            _id: photo._id,
            title: photo.title,
            description: photo.description,
            imageUrl: `http://localhost:8000/photo/${photo._id}/view`,
            userId: photo.userId,
            createdAt: photo.createdAt,
            likes: photo.likes.length,
            comments: photo.comments 
        }));
        res.json(formattedPhotos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const likePhoto = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id);
        if (!photo) {
            return res.status(404).json({ error: "Photo not found" });
        }

        if (!photo.likes.includes(req.userId)) {
            photo.likes.push(req.userId); 
        } else {
            photo.likes = photo.likes.filter(id => id.toString() !== req.userId);
        }

        await photo.save();
        res.json({ message: "Photo liked/unliked successfully", likes: photo.likes.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const userId = req.user?.id; 

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized. No user found." });
        }

        if (!content) {
            return res.status(400).json({ error: "Comment content is required." });
        }

        const photo = await Photo.findById(id);
        if (!photo) {
            return res.status(404).json({ error: "Photo not found." });
        }

        const newComment = {
            userId: userId,
            content: content,
            createdAt: new Date(),
        };

        photo.comments.push(newComment);
        await photo.save();

        res.status(201).json({ message: "Comment added successfully", comment: newComment });
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

const getPhotoComments = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id);
        if (!photo) {
            return res.status(404).json({ error: "Photo not found" });
        }
        res.json(photo.comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        const { photoId, commentId } = req.params;
        const userId = req.user.id;

        const photo = await Photo.findById(photoId);
        if (!photo) {
            return res.status(404).json({ error: "Photo not found" });
        }

        const comment = photo.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        if (comment.userId.toString() !== userId) {
            return res.status(403).json({ error: "You can only delete your own comments" });
        }

        comment.remove();
        await photo.save();

        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {deleteComment, getPhotoComments, createPhoto,likePhoto,addComment, getPhotos, getPhotoById, updatePhoto, deletePhoto, upload,getPhotoImage}