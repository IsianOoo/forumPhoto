const Photo = require('../models/photo')

const createPhoto = async (req, res) => {
	try {
		const { title, description, imageUrl } = req.body
		const photo = await Photo.create({ title, description, imageUrl, userId: req.userId })
		res.json(photo)
	} catch (error) {
		console.log(req.user)
		res.status(400).json({ error: error.message })
	}
}

const getPhotos = async (req, res) => {
	const photos = await Photo.find()
	res.json(photos)
}

const getPhotoById = async (req, res) => {
	const photo = await Photo.findById(req.params.id)
	res.json(photo)
}

const updatePhoto = async (req, res) => {
	const { title, description, imageUrl } = req.body
	const photo = await Photo.findByIdAndUpdate(req.params.id, { title, description, imageUrl }, { new: true })
	res.json(photo)
}

const deletePhoto = async (req, res) => {
	await Photo.findByIdAndDelete(req.params.id)
	res.json({ message: 'Photo deleted successfully' })
}

module.exports = { createPhoto, getPhotos, getPhotoById, updatePhoto, deletePhoto }
