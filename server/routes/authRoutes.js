const express = require('express')
const router = express.Router()
const cors = require('cors')
const verifyToken = require('../middleware/authMiddleware')
const {test,registerUser,loginUser,getProfile} = require('../controllers/authController')


router.use(
    cors({
        credentials:true,
        origin:'http://localhost:5173'
    })
)

router.get('/',test)

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: ID użytkownika w MongoDB
 *         name:
 *           type: string
 *           description: Imię użytkownika
 *         email:
 *           type: string
 *           format: email
 *           description: Adres email użytkownika
 *         password:
 *           type: string
 *           description: Hasło użytkownika (przechowywane jako hash)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data utworzenia użytkownika
 */

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
router.post('/register', registerUser);

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
router.post('/login', loginUser);

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
router.use(verifyToken).get('/profile',getProfile)

module.exports = router