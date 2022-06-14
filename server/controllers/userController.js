const User = require('../models/userModel')
const Song = require('../models/songModel')
const Artist = require('../models/artistModel')

const userLogin = async (req, res) => {
  const { name, email } = req.body

  if (!name || !email) {
    res.status(400).json({ error: 'Please Enter all the fields' })
    return
  }

  let user = await User.findOne({
    email: email
  })

  if (!user) {
    user = await User.create({
      name,
      email
    })
  }

  res.status(201).json(user)
}

function alreadyRated (userId, ratings) {
  for (let i = 0; i < ratings.length; i++) {
    if (ratings[i].userId === userId) {
      return true
    }
  }

  return false
}

const updateSongRating = async (req, res) => {
  const { songId, userId, ratingGiven } = req.body
  const song = await Song.findById({ _id: songId })
  const artists = song.artists
  let newRatings

  if (alreadyRated(userId, song.ratings)) {
    for (let i = 0; i < song.ratings.length; i++) {
      if (song.ratings[i].userId === userId) {
        song.ratings[i].rating = ratingGiven
        newRatings = song.ratings
        break
      }
    }
  } else {
    song.ratings.push({
      userId: userId,
      rating: ratingGiven
    })
    newRatings = song.ratings
  }

  let totalRatings = 0
  song.ratings.forEach(rating => {
    totalRatings += rating.rating
  })

  const newAverageRating = totalRatings / newRatings.length

  await Song.findByIdAndUpdate(
    {
      _id: songId
    },
    {
      $set: {
        ratings: newRatings,
        averageRating: newAverageRating
      }
    }
  )

  artists.forEach(async artistId => {
    const artist = await Artist.findById({
      _id: artistId
    }).populate('songs')

    let totalRatings = 0
    console.log(artist.songs)
    for (let i = 0; i < artist.songs.length; i++) {
      console.log(artist.songs[i].averageRating)
      totalRatings = artist.songs[i].averageRating
    }

    await Artist.findByIdAndUpdate(
      {
        _id: artistId
      },
      {
        $set: {
          averageRating: totalRatings / artist.songs.length
        }
      }
    )
  })

  res.status(201).send('rating updated')
}

module.exports = {
  userLogin,
  updateSongRating
}
