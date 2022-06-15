const mongoose = require('mongoose')

const artistSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: { type: String, required: true },
  bio: { type: String, required: true },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  averageRating: { type: Number, default: 0 }
})

const Artist = mongoose.model('Artist', artistSchema)

module.exports = Artist
