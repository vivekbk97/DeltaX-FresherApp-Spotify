const express = require('express')
const {
  createArtist,
  displayAllArtists,
  displayTopArtists
} = require('../controllers/artistController')

const router = express.Router()

router.route('/create').post(createArtist)
router.route('/displayTopArtists').get(displayTopArtists)
router.route('/displayAllArtists').get(displayAllArtists)

module.exports = router
