const mongoose = require('mongoose')

const songSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dateOfRelease: { type: Date, required: true },
  coverImage: { type: String, required: true },
  artists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' }],
  totalPeopleRated: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0 }
})

const Song = mongoose.model('Song', songSchema)

module.exports = Song
