'use strict'

const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
  climberGrade: {
    type: String,
    required: true
  },
  climberRating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  _climbingRoute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClimbingRoute',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret, options) {
      const userId = (options.user && options.user._id) || false
      ret.editable = userId && userId.equals(doc._owner)
      return ret
    }
  }
})

const Rating = mongoose.model('Rating', ratingSchema)

module.exports = Rating
