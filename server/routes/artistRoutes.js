const express = require('express')
const {
  createArtist,
  displayAllArtists,
  displayTopArtists
} = require('../controllers/artistController')

const router = express.Router()

router.post('/create', createArtist)
router.get('/displayTopArtists', displayTopArtists)
router.get('/displayAllArtists', displayAllArtists)

module.exports = router
