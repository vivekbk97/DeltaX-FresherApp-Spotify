const Song = require('../models/songModel')
const Artist = require('../models/artistModel')

const createArtist = async (req, res) => {
  const { name, dob, bio } = req.body
  try {
    const artist = await Artist.create({
      name: name,
      dob: dob,
      bio: bio
    })
    res.status(201).json(artist)
  } catch (error) {
    res.status(400).send(error)
  }
}

const displayTopArtists = async (req, res) => {
  const artistsToDisplay = await Artist.find({})
    .sort({ averageRating: -1 })
    .find({ limit: 10 })
    .populate('songs', { name: 1 })
  res.status(201).json(artistsToDisplay)
}

const displayAllArtists = async (req, res) => {
  const allArtists = await Artist.find({}).sort({ name: 1 })
  res.status(201).json(artistsToDisplay)
}

module.exports = {
  createArtist,
  displayTopArtists,
  displayAllArtists
}
