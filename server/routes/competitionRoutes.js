const express = require('express');
const { createCompetition, getCompetitions, getCompetitionById, updateCompetition, deleteCompetition } = require('../controllers/competitionController');
const router = express.Router();


router.post('/', createCompetition);  
router.get('/', getCompetitions);     
router.get('/:id', getCompetitionById); 
router.put('/:id', updateCompetition);  
router.delete('/:id', deleteCompetition); 

module.exports = router;
