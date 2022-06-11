const User = require('../models/userModel')
const Song = require('../models/songModel')
const Artist = require('../models/artistModel')

const userLogin = async (req, res) => {
  const { name, email } = req.body

  if (!name || !email) {
    res.status(400).json({ error: 'Please Enter all the fields' })
    return
  }

  const user = await User.create({
    name,
    email
  })

  res.status(201).json(user)
}

const updateSongRating = async (req, res) => {
  const { songId, ratingGiven } = req.body
  const song = await Song.findById({ _id: songId })
  const artists = song.artists

  const newTotalPeopleRated = song.totalPeopleRated + 1
  const newAverageRating =
    (song.averageRating * song.totalPeopleRated + ratingGiven) /
    (song.totalPeopleRated + 1)

  artists.forEach(async artistId => {
    const artist = await Artist.findById({
      _id: artistId
    })

    await Artist.findByIdAndUpdate(
      {
        _id: artistId
      },
      {
        $set: {
          averageRating:
            (artist.averageRating * artist.songs.length + newAverageRating) /
            artist.songs.length
        }
      }
    )
  })

  await Song.findByIdAndUpdate(
    {
      _id: songId
    },
    {
      $set: {
        totalPeopleRated: newTotalPeopleRated,
        averageRating: newAverageRating
      }
    }
  )
  res.status(201).send('rating updated')
}

module.exports = {
  userLogin,
  updateSongRating
}
