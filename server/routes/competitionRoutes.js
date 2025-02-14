const express = require('express');
const {getCompetitionPhoto, getCompetitionPhotos, joinCompetition, createCompetition, getCompetitions, getCompetitionById, applicationVote } = require('../controllers/competitionController');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { upload } = require('../controllers/photoController');
const multer = require('multer');


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


/**
 * @swagger
 * /competition/{id}/join:
 *   post:
 *     summary: Dołącz do konkursu, przesyłając zdjęcie
 *     description: Użytkownik dołącza do konkursu, przesyłając zdjęcie.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID konkursu, do którego chcesz dołączyć
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Tytuł zdjęcia
 *               description:
 *                 type: string
 *                 description: Opis zdjęcia
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Obraz do przesłania
 *     responses:
 *       200:
 *         description: Zdjęcie zostało dodane do konkursu
 *       400:
 *         description: Błąd walidacji lub brakujący parametr
 *       401:
 *         description: Brak autoryzacji
 *       500:
 *         description: Błąd serwera
 */
router.post('/:id/join', upload.single('image'), joinCompetition);

/**
 * @swagger
 * /competition/vote:
 *   post:
 *     summary: Głosowanie na zdjęcie w konkursie
 *     description: Użytkownik oddaje głos na zdjęcie konkursowe.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               competitionId:
 *                 type: string
 *                 description: ID konkursu, w którym znajduje się zdjęcie
 *               photoId:
 *                 type: string
 *                 description: ID zdjęcia, na które oddajemy głos
 *     responses:
 *       201:
 *         description: Głos został oddany
 *       400:
 *         description: Użytkownik już głosował
 *       403:
 *         description: Nie można głosować na własne zdjęcie
 *       404:
 *         description: Konkurs lub zdjęcie nie istnieje
 *       500:
 *         description: Błąd serwera
 */
router.post('/vote', verifyToken, applicationVote);

/**
 * @swagger
 * /competition/{id}/photos:
 *   get:
 *     summary: Pobiera wszystkie zdjęcia powiązane z konkursem
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID konkursu
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista zdjęć w konkursie
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID zdjęcia
 *                   title:
 *                     type: string
 *                     description: Tytuł zdjęcia
 *                   description:
 *                     type: string
 *                     description: Opis zdjęcia
 *                   imageUrl:
 *                     type: string
 *                     description: URL obrazu
 *                   userId:
 *                     type: string
 *                     description: ID użytkownika, który dodał zdjęcie
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Data dodania zdjęcia
 *                   likes:
 *                     type: integer
 *                     description: Liczba polubień zdjęcia
 *       404:
 *         description: Konkurs nie znaleziony
 */
router.get('/:id/photos', getCompetitionPhotos);

/**
 * @swagger
 * /competition/photo/{competitionId}/{userId}:
 *   get:
 *     summary: Pobierz zdjęcie zwycięzcy konkursu
 *     description: Zwraca zdjęcie powiązane z użytkownikiem, który wygrał konkurs
 *     parameters:
 *       - in: path
 *         name: competitionId
 *         required: true
 *         description: ID konkursu
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID użytkownika
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Zdjęcie zwycięzcy konkursu
 *       404:
 *         description: Zdjęcie nie znalezione
 */
router.get('/photo/:photoId/view', verifyToken, getCompetitionPhoto);

module.exports = router;
