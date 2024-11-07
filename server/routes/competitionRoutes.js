const express = require('express');
const { createCompetition, getCompetitions, getCompetitionById, updateCompetition, deleteCompetition, joinCompetition, getApplications, getUsersApplications} = require('../controllers/competitionController');
const verifyToken = require('../middleware/authMiddleware');
const permitOnlyAdmin = require('../middleware/adminPermissionMiddleware');
const router = express.Router();

router.use(verifyToken).get('/user', getUsersApplications)
router.use(verifyToken).use(permitOnlyAdmin).post('/', createCompetition);  
router.get('/', getCompetitions);     
router.get('/:id', getCompetitionById); 
router.use(verifyToken).use(permitOnlyAdmin).put('/:id', updateCompetition);  
router.use(verifyToken).use(permitOnlyAdmin).delete('/:id', deleteCompetition); 
router.use(verifyToken).post('/:id/join', joinCompetition);
router.use(verifyToken).get('/:id/applications', getApplications)


module.exports = router;
