const Competition = require('../models/competition')
const Application = require('../models/application')
const User = require('../models/user')
const permitOnlyAdmin = require('../middleware/adminPermissionMiddleware');

const createCompetition = async (req, res) => {
	permitOnlyAdmin(req,res)
	try {
		const { title, description, prize, endDate } = req.body

		if (!endDate || new Date(endDate) <= new Date()) {
			return res.status(400).json({ error: 'Valid end date is required and should be in the future' })
		}
		const competition = await Competition.create({ title, description, endDate, prize, userId: req.userId })
		res.json(competition)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

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
	const { photoId } = req.body
	await Competition.findById(req.params.id)
	const application = await Application.create({ userId: req.userId, competitionId: req.params.id, photoId: photoId })
	res.json()
}

const getApplications = async (req, res) => {
    const application = await Application.find({competitionId:req.params.id})
    res.json({application})
}

const getUsersApplications = async (req, res) =>{
    const applications = await Application.find({userId:req.userId})
    res.json({applications})
}

const applicationVote = async (req, res) =>{
	const user = await User.findById({_id:req.userId})
	const application = await Application.findById({_id:req.params.id})
	const joined = application.votes.some((vote)=>{return vote._id == req.userId})

	if(joined){
		return res.json({message: "You already voted"});
	}
	application.votes.push({_id: req.userId});
	await application.save();
	res.json({})
}

module.exports = {
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
