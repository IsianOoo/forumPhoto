const Competition = require('../models/competition');

const createCompetition = async (req, res) => {
    try {
        const { title, description, prize } = req.body;

        if (!endDate || new Date(endDate) <= new Date()) {
            return res.status(400).json({ error: 'Valid end date is required and should be in the future' });
        }

        const competition = await Competition.create({ title, description, endDate, userId: req.user._id });
        res.json(competition);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getCompetitions = async (req, res) => {
    const competitions = await Competition.find();
    res.json(competitions);
};

const getCompetitionById = async (req, res) => {
    const competition = await Competition.findById(req.params.id);
    res.json(competition);
};

const updateCompetition = async (req, res) => {
    const { title, description, prize } = req.body;
    const competition = await Competition.findByIdAndUpdate(req.params.id, { title, description}, { new: true });
    res.json(competition);
};

const deleteCompetition = async (req, res) => {
    await Competition.findByIdAndDelete(req.params.id);
    res.json({ message: 'Competition deleted successfully' });
};

module.exports = { createCompetition, getCompetitions, getCompetitionById, updateCompetition, deleteCompetition };
