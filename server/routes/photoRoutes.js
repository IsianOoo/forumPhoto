const express = require('express');
const {likePhoto, addComment, getPhotoImage, createPhoto, getPhotos, getPhotoById, updatePhoto, deletePhoto, upload } = require('../controllers/photoController');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

/**
 * @swagger
 * /photo/{id}/view:
 *   get:
 *     summary: Pobierz obraz jako plik binarny
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Zwraca plik obrazu
 *       404:
 *         description: Zdjęcie nie znalezione
 */

/**
 * @swagger
 * /photo/{id}/view:
 *   get:
 *     summary: Pobierz obraz jako plik binarny
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Zwraca plik obrazu
 *       404:
 *         description: Zdjęcie nie znalezione
 */
router.get('/:id/view', getPhotoImage); 

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
router.get('/:id', getPhotoById);


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

/**
 * @swagger
 * /photo/{id}/like:
 *   post:
 *     summary: Polubienie zdjęcia
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
 *         description: Zdjęcie zostało polubione lub odlubione
 */
router.use(verifyToken).post('/:id/like', likePhoto);

/**
 * @swagger
 * /photo/{id}/comment:
 *   post:
 *     summary: Dodanie komentarza do zdjęcia
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
 *               content:
 *                 type: string
 *                 description: Treść komentarza
 *     responses:
 *       200:
 *         description: Komentarz został dodany
 */
router.use(verifyToken).post('/:id/comment', addComment);


module.exports = router;
