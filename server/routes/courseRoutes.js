const express = require('express');
const { createCourse, getCourses, getCourseById } = require('../controllers/courseController');
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
 *     Course:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - content
 *       properties:
 *         id:
 *           type: string
 *           description: ID kursu w MongoDB
 *         title:
 *           type: string
 *           description: Tytuł kursu
 *         description:
 *           type: string
 *           description: Opis kursu
 *         content:
 *           type: string
 *           description: Zawartość kursu
 *         instructor:
 *           type: string
 *           description: ID instruktora
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data utworzenia kursu
 */

/**
 * @swagger
 * /course:
 *   post:
 *     summary: Dodaj nowy kurs
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       201:
 *         description: Kurs dodany pomyślnie
 */
router.use(verifyToken).post('/', createCourse);

/**
 * @swagger
 * /course:
 *   get:
 *     summary: Pobierz listę wszystkich kursów
 *     responses:
 *       200:
 *         description: Lista kursów
 */
router.get('/', getCourses);

/**
 * @swagger
 * /course/{id}:
 *   get:
 *     summary: Pobierz kurs po ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Szczegóły kursu
 */
router.get('/:id', getCourseById);

module.exports = router;