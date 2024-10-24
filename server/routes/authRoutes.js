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
router.post('/register',registerUser)
router.post('/login',loginUser)
router.use(verifyToken).get('/profile',getProfile)

module.exports = router