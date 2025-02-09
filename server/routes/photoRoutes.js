const express = require('express');
const { getPhotoImage, createPhoto, getPhotos, getPhotoById, updatePhoto, deletePhoto, upload } = require('../controllers/photoController');
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


router.get('/:id/view', getPhotoImage); 
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

module.exports = router;
