const express = require('express');
const { createPhoto, getPhotos, getPhotoById, updatePhoto, deletePhoto, upload } = require('../controllers/photoController');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

router.use(verifyToken).post('/', upload.single('image'), createPhoto);
router.get('/:id', getPhotoById);


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Photo:
 *       type: object
 *       required:
 *         - title
 *         - imagePath
 *         - userId
 *       properties:
 *         id:
 *           type: string
 *           description: ID zdjęcia w MongoDB
 *         title:
 *           type: string
 *           description: Tytuł zdjęcia
 *         description:
 *           type: string
 *           description: Opis zdjęcia (opcjonalny)
 *         filename:
 *           type: string
 *           description: Nazwa pliku zdjęcia
 *         imagePath:
 *           type: string
 *           description: Ścieżka do zdjęcia na serwerze
 *         mimetype:
 *           type: string
 *           description: Typ pliku (np. image/jpeg)
 *         userId:
 *           type: string
 *           description: ID użytkownika, który dodał zdjęcie
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data utworzenia zdjęcia
 */

/**
 * @swagger
 * /photo:
 *   post:
 *     summary: Dodaj nowe zdjęcie
 *     security:
 *       - bearerAuth: []
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
 *                 description: Opis zdjęcia (opcjonalny)
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Plik obrazu do przesłania
 *     responses:
 *       201:
 *         description: Zdjęcie dodane pomyślnie
 *       400:
 *         description: Błąd w danych wejściowych
 */
router.use(verifyToken).post('/', upload.single('image'), createPhoto);

/**
 * @swagger
 * /photo:
 *   get:
 *     summary: Pobierz listę wszystkich zdjęć
 *     responses:
 *       200:
 *         description: Zwraca listę zdjęć
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Photo'
 */
router.get('/', getPhotos);

/**
 * @swagger
 * /photo/{id}:
 *   get:
 *     summary: Pobierz zdjęcie po ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Szczegóły zdjęcia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Photo'
 *       404:
 *         description: Zdjęcie nie znalezione
 */
router.get('/:id', getPhotoById);

/**
 * @swagger
 * /photo/{id}:
 *   put:
 *     summary: Aktualizuj zdjęcie
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Nowy tytuł zdjęcia
 *               description:
 *                 type: string
 *                 description: Nowy opis zdjęcia
 *               imagePath:
 *                 type: string
 *                 description: Nowa ścieżka do zdjęcia
 *     responses:
 *       200:
 *         description: Zdjęcie zaktualizowane pomyślnie
 *       400:
 *         description: Błąd w danych wejściowych
 *       404:
 *         description: Zdjęcie nie znalezione
 */
router.use(verifyToken).put('/:id', updatePhoto);

/**
 * @swagger
 * /photo/{id}:
 *   delete:
 *     summary: Usuń zdjęcie
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Zdjęcie zostało usunięte
 *       404:
 *         description: Zdjęcie nie znalezione
 */
router.use(verifyToken).delete('/:id', deletePhoto);

module.exports = router;
