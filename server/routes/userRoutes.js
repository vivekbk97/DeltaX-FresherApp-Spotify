const express = require('express')
const { userLogin, updateSongRating } = require('../controllers/userController')

const router = express.Router()

router.post('/login', userLogin)
router.put('/updateSongRating', updateSongRating)

module.exports = router
