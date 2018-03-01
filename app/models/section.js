'use strict'

const mongoose = require('mongoose')

const sectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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

// Placholders for future virtual attributes based on children schemas
// sectionSchema.virtual('types').get(function () {
// })
//
// sectionSchema.virtual('grades').get(function () {
// })
//
// sectionSchema.virtual('routeNumbers').get(function () {
// })

const Section = mongoose.model('Section', sectionSchema)

module.exports = Section
