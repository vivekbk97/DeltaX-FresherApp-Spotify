const express = require('express')
const { createSong, displayTopSongs } = require('../controllers/songController')

const router = express.Router()

router.post('/create', createSong)

router.get('/displayTopSongs', displayTopSongs)

module.exports = router
