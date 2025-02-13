const Competition = require('../models/competition')
const Application = require('../models/application')
const ApplicationVotes = require('../models/applicationVotes')
const CompetitionPhoto = require('../models/competitionPhoto');
const User = require('../models/user')
const permitOnlyAdmin = require('../middleware/adminPermissionMiddleware');
const cron = require('node-cron');

cron.schedule('*/10 * * * * *', async () => {
	try {
		const endedCompetitions = await Competition.find({
			endDate: { $lte: new Date() },
			winner: { $exists: false }
		});

		for (const competition of endedCompetitions) {
			const applications = await Application.find({ competitionId: competition._id }).sort({ votes: -1 });

			if (applications.length > 0) {
				const winner = applications[0]; 
				competition.winner = winner.userId; 
				await competition.save();
				console.log(`Winner announced for competition ${competition._id}`);
			}
		}
	} catch (error) {
		console.error('Error selecting winner:', error);
	}
});

const createCompetition = async (req, res) => {
    try {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden - Only admins can create competitions' });
        }

        const { title, description, prize, endDate } = req.body;

        if (!endDate || new Date(endDate) <= new Date()) {
            return res.status(400).json({ error: 'Valid end date is required and should be in the future' });
        }

        const userId = req.user.id;

        const competition = await Competition.create({title,description,endDate,prize,userId});

        res.status(201).json({ message: 'Competition created successfully', competition });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCompetitions = async (req, res) => {
	const competitions = await Competition.find()
	res.json(competitions)
}

const getCompetitionById = async (req, res) => {
	const competition = await Competition.findById(req.params.id)
	res.json(competition)
}

const updateCompetition = async (req, res) => {
	const { title, description, prize } = req.body
	const competition = await Competition.findByIdAndUpdate(req.params.id, { title, description }, { new: true })
	res.json(competition)
}

const deleteCompetition = async (req, res) => {
	await Competition.findByIdAndDelete(req.params.id)
	res.json({ message: 'Competition deleted successfully' })
}

const joinCompetition = async (req, res) => { 
    try {
        const { title, description } = req.body;
        const userId = req.user?.id;
        const competitionId = req.params.id;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized. No user found." });
        }

        if (!title || !description || !req.file) {
            return res.status(400).json({ error: "Title, description, and image are required." });
        }

        const competition = await Competition.findById(competitionId);
        if (!competition) {
            return res.status(404).json({ error: "Competition not found" });
        }

        const existingPhoto = await CompetitionPhoto.findOne({ competitionId, userId });
        if (existingPhoto) {
            return res.status(400).json({ error: "You have already submitted a photo for this competition" });
        }

        const competitionPhoto = new CompetitionPhoto({
            title,
            description,
            image: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            },
            userId: userId,
            competitionId,
        });

        await competitionPhoto.save();
        res.status(201).json({ message: "Successfully joined competition", competitionPhoto });
    } catch (error) {
        console.error("Błąd w joinCompetition:", error);
        res.status(500).json({ error: error.message });
    }
};
const getApplications = async (req, res) => {
    const application = await Application.find({competitionId:req.params.id})
    res.json({application})
}

const getUsersApplications = async (req, res) =>{
    const applications = await Application.find({userId:req.userId})
    res.json({applications})
}

const applicationVote = async (req, res) => {
    try {
        const { competitionId, photoId } = req.body;
        const userId = req.user?.id;

        const competition = await Competition.findById(competitionId);
        if (!competition) {
            return res.status(404).json({ error: "Competition not found" });
        }

        const application = await Application.findOne({ competitionId, photoId });
        if (!application) {
            return res.status(404).json({ error: "Photo not found in competition" });
        }

        if (application.userId.toString() === userId) {
            return res.status(403).json({ error: "You cannot vote for your own photo" });
        }

        const existingVote = await ApplicationVotes.findOne({ userId, competitionId, photoId });
        if (existingVote) {
            return res.status(400).json({ error: "You have already voted for this photo" });
        }

        const vote = new ApplicationVotes({ userId, competitionId, photoId });
        await vote.save();

        res.status(201).json({ message: "Vote submitted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCompetitionPhotos = async (req, res) => {
    try {
        const { id } = req.params;

        const photos = await CompetitionPhoto.find({ competitionId: id })
            .select('_id title description userId createdAt likes');

        const formattedPhotos = photos.map(photo => ({
            _id: photo._id,
            title: photo.title,
            description: photo.description,
            imageUrl: `http://localhost:8000/competition/photo/${photo._id}/view`,
            userId: photo.userId,
            createdAt: photo.createdAt,
            likes: photo.likes.length
        }));

        res.json(formattedPhotos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
	getCompetitionPhotos,
	createCompetition,
	getCompetitions,
	getCompetitionById,
	updateCompetition,
	deleteCompetition,
	joinCompetition,
    getApplications,
    getUsersApplications,
	applicationVote,

}
