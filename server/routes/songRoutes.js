const express = require('express')
const { createSong, displayTopSongs } = require('../controllers/songController')

const router = express.Router()

router.route('/create').post(createSong)

router.route('/displayTopSongs').get(displayTopSongs)

module.exports = router
