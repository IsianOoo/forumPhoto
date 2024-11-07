const express = require('express');
const { createCompetition, getCompetitions, getCompetitionById, updateCompetition, deleteCompetition, joinCompetition, getApplications, getUsersApplications, applicationVote} = require('../controllers/competitionController');
const verifyToken = require('../middleware/authMiddleware');
const permitOnlyAdmin = require('../middleware/adminPermissionMiddleware');
const router = express.Router();

router.use(verifyToken).get('/user', getUsersApplications)
router.use(verifyToken).post('/', createCompetition);  
router.get('/', getCompetitions);     
router.get('/:id', getCompetitionById); 
router.use(verifyToken).put('/:id', updateCompetition);  
router.use(verifyToken).delete('/:id', deleteCompetition); 
router.use(verifyToken).post('/:id/join', joinCompetition);
router.use(verifyToken).get('/:id/applications', getApplications)
router.use(verifyToken).post('/:id/applications/:id/vote', applicationVote);


module.exports = router;
