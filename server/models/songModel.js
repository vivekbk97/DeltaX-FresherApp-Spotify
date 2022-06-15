const mongoose = require('mongoose')

const songSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dateOfRelease: { type: String, required: true },
  coverImage: { type: String, required: true },
  artists: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true }
  ],
  ratings: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number, default: 0 }
    }
  ],
  averageRating: { type: Number, default: 0 }
})

const Song = mongoose.model('Song', songSchema)

module.exports = Song
