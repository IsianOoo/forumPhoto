const express = require('express');
const {getPhotoComments, likePhoto, addComment, getPhotoImage, createPhoto, getPhotos, getPhotoById, updatePhoto, deletePhoto, upload ,deleteComment, updateComment} = require('../controllers/photoController');
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
 *     description: Pozwala właścicielowi zdjęcia zmienić jego tytuł i opis
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID zdjęcia do aktualizacji
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
 *     responses:
 *       200:
 *         description: Zdjęcie zostało pomyślnie zaktualizowane
 *       403:
 *         description: Użytkownik nie może edytować tego zdjęcia
 *       404:
 *         description: Zdjęcie nie znalezione
 */
router.use(verifyToken).put('/:id', updatePhoto);

/**
 * @swagger
 * /photo/{id}:
 *   delete:
 *     summary: Usuń zdjęcie
 *     description: Pozwala właścicielowi zdjęcia usunąć je z bazy
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID zdjęcia do usunięcia
 *     responses:
 *       200:
 *         description: Zdjęcie zostało pomyślnie usunięte
 *       403:
 *         description: Użytkownik nie może usunąć tego zdjęcia
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

/**
 * @swagger
 * /photo/{id}/comments:
 *   get:
 *     summary: Pobierz wszystkie komentarze do zdjęcia
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista komentarzy do zdjęcia
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: string
 *                     description: ID użytkownika, który dodał komentarz
 *                   content:
 *                     type: string
 *                     description: Treść komentarza
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Data dodania komentarza
 *       404:
 *         description: Zdjęcie nie znalezione
 */
router.get('/:id/comments', getPhotoComments);

/**
 * @swagger
 * /photo/{photoId}/comment/{commentId}:
 *   delete:
 *     summary: Usuń komentarz
 *     description: Pozwala właścicielowi komentarza usunąć go ze zdjęcia
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: photoId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID zdjęcia, z którego usuwany jest komentarz
 *       - name: commentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID komentarza do usunięcia
 *     responses:
 *       200:
 *         description: Komentarz został pomyślnie usunięty
 *       403:
 *         description: Użytkownik nie może usunąć tego komentarza
 *       404:
 *         description: Zdjęcie lub komentarz nie znaleziony
 */
router.delete('/:photoId/comment/:commentId', verifyToken, deleteComment);

/**
 * @swagger
 * /photo/{photoId}/comment/{commentId}:
 *   put:
 *     summary: Aktualizuj komentarz
 *     description: Pozwala właścicielowi komentarza zmienić jego treść
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: photoId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID zdjęcia, do którego należy komentarz
 *       - name: commentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID komentarza do aktualizacji
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Nowa treść komentarza
 *     responses:
 *       200:
 *         description: Komentarz został pomyślnie zaktualizowany
 *       403:
 *         description: Użytkownik nie może edytować tego komentarza
 *       404:
 *         description: Komentarz nie znaleziony
 */
router.put('/:photoId/comment/:commentId', verifyToken, updateComment);


module.exports = router;
