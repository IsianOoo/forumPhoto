const express = require('express')
const router = express.Router()
const cors = require('cors')
const verifyToken = require('../middleware/authMiddleware')
const {editUser, logoutUser, test, registerUser, loginUser, getProfile } = require('../controllers/authController')

router.use(
	cors({
		credentials: true,
		origin: 'http://localhost:5173',
	})
)

router.get('/', test)

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Rejestracja nowego użytkownika
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Imię użytkownika
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Adres email użytkownika
 *               password:
 *                 type: string
 *                 description: Hasło użytkownika
 *     responses:
 *       201:
 *         description: Użytkownik zarejestrowany pomyślnie
 *       400:
 *         description: Błąd walidacji lub użytkownik już istnieje
 */
router.post('/register', registerUser)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logowanie użytkownika
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Adres email użytkownika
 *               password:
 *                 type: string
 *                 description: Hasło użytkownika
 *     responses:
 *       200:
 *         description: Zwraca token JWT po poprawnym zalogowaniu
 *       401:
 *         description: Niepoprawne dane logowania
 */
router.post('/login', loginUser)

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Pobranie profilu zalogowanego użytkownika
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Zwraca dane użytkownika
 *       401:
 *         description: Brak autoryzacji
 */
router.use(verifyToken).get('/profile', getProfile)

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Wylogowanie użytkownika
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Użytkownik został pomyślnie wylogowany
 */
router.post('/logout', verifyToken, logoutUser)

/**
 * @swagger
 * /auth/profile:
 *   put:
 *     summary: Edytuj profil użytkownika
 *     description: Pozwala zalogowanemu użytkownikowi edytować swoje imię i adres e-mail
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nowe imię użytkownika
 *               email:
 *                 type: string
 *                 description: Nowy adres e-mail użytkownika
 *     responses:
 *       200:
 *         description: Profil użytkownika został pomyślnie zaktualizowany
 *       401:
 *         description: Brak autoryzacji
 *       404:
 *         description: Użytkownik nie znaleziony
 */

router.put('/profile', verifyToken, editUser);

module.exports = router
