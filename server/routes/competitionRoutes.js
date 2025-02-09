const express = require('express');
const { createCompetition, getCompetitions, getCompetitionById } = require('../controllers/competitionController');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Competition:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - endDate
 *       properties:
 *         id:
 *           type: string
 *           description: ID konkursu w MongoDB
 *         title:
 *           type: string
 *           description: Tytuł konkursu
 *         description:
 *           type: string
 *           description: Opis konkursu
 *         endDate:
 *           type: string
 *           format: date
 *           description: Data zakończenia konkursu
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data utworzenia konkursu
 */

/**
 * @swagger
 * /competition:
 *   post:
 *     summary: Dodaj nowy konkurs
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Competition'
 *     responses:
 *       201:
 *         description: Konkurs dodany pomyślnie
 */
router.use(verifyToken).post('/', createCompetition);

/**
 * @swagger
 * /competition:
 *   get:
 *     summary: Pobierz listę wszystkich konkursów
 *     responses:
 *       200:
 *         description: Lista konkursów
 */
router.get('/', getCompetitions);

/**
 * @swagger
 * /competition/{id}:
 *   get:
 *     summary: Pobierz konkurs po ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Szczegóły konkursu
 */
router.get('/:id', getCompetitionById);

module.exports = router;
