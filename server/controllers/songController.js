const Song = require('../models/songModel')
const Artist = require('../models/artistModel')

const createSong = async (req, res) => {
  const { name, dateOfRelease, coverImage, artists, language } = req.body

  try {
    const song = await Song.create({
      name: name,
      dateOfRelease: dateOfRelease,
      coverImage: coverImage,
      artists: artists,
      language: language
    })

    artists.forEach(async artistId => {
      await Artist.findByIdAndUpdate(
        {
          _id: artistId
        },
        {
          $push: {
            songs: song._id
          }
        }
      )
    })

    res.status(201).json(song)
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
}

const displayTopSongs = async (req, res) => {
  const songsToDisplay = await Song.find({})
    .sort({ averageRating: -1 })
    .find({ limit: 10 })
    .populate('artists', { name: 1, _id: 0 })
  res.status(201).json(songsToDisplay)
}

module.exports = {
  createSong,
  displayTopSongs
}
