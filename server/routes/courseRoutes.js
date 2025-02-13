const express = require('express');
const {getCourseThumbnail, updateCourse, createCourse, getCourses, getCourseById, deleteCourse } = require('../controllers/courseController');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const multer = require("multer");


const upload = multer({ storage: multer.memoryStorage() });

/**
 * @swagger
 * /course:
 *   post:
 *     summary: Tworzenie nowego kursu
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
 *                 description: Tytuł kursu
 *               description:
 *                 type: string
 *                 description: Opis kursu
 *               content:
 *                 type: string
 *                 description: Treść kursu
 *               category:
 *                 type: string
 *                 description: Kategoria kursu
 *               difficulty:
 *                 type: string
 *                 enum: [Beginner, Intermediate, Advanced]
 *                 description: Poziom trudności
 *               duration:
 *                 type: number
 *                 description: Czas trwania kursu (w godzinach)
 *               language:
 *                 type: string
 *                 description: Język kursu
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Miniaturka kursu
 *     responses:
 *       201:
 *         description: Kurs został utworzony
 *       400:
 *         description: Nieprawidłowe dane wejściowe
 *       401:
 *         description: Brak autoryzacji
 */
router.post("/", verifyToken, upload.single("thumbnail"), createCourse);

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

/**
 * @swagger
 * /course/{id}:
 *   delete:
 *     summary: Usuwanie kursu
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID kursu do usunięcia
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Kurs został pomyślnie usunięty
 *       401:
 *         description: Brak autoryzacji
 *       403:
 *         description: Brak uprawnień do usunięcia kursu
 *       404:
 *         description: Kurs nie znaleziony
 */
router.delete("/:id", verifyToken, deleteCourse);

/**
 * @swagger
 * /course/{id}:
 *   put:
 *     summary: Aktualizacja kursu
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID kursu do aktualizacji
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
 *                 description: Nowy tytuł kursu
 *               description:
 *                 type: string
 *                 description: Nowy opis kursu
 *               content:
 *                 type: string
 *                 description: Nowa treść kursu
 *               category:
 *                 type: string
 *                 description: Kategoria kursu
 *               difficulty:
 *                 type: string
 *                 enum: [Beginner, Intermediate, Advanced]
 *                 description: Poziom trudności
 *               duration:
 *                 type: number
 *                 description: Czas trwania kursu (w godzinach)
 *               language:
 *                 type: string
 *                 description: Język kursu
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Miniaturka kursu
 *     responses:
 *       200:
 *         description: Kurs został pomyślnie zaktualizowany
 *       400:
 *         description: Nieprawidłowe dane wejściowe
 *       401:
 *         description: Brak autoryzacji
 *       403:
 *         description: Brak uprawnień do edycji kursu
 *       404:
 *         description: Kurs nie znaleziony
 */
router.put("/:id", verifyToken, upload.single("thumbnail"), updateCourse);


/**
 * @swagger
 * /course/{id}/thumbnail:
 *   get:
 *     summary: Pobierz miniaturkę kursu
 *     description: Pobiera obraz miniaturki kursu jako plik binarny.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID kursu
 *     responses:
 *       200:
 *         description: Zwraca plik obrazu miniaturki
 *         content:
 *           image/*:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Miniaturka nie istnieje lub kurs nie znaleziony
 */
router.get('/:id/thumbnail', getCourseThumbnail);


module.exports = router;