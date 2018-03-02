'use strict'

const mongoose = require('mongoose')

const wallSchema = new mongoose.Schema({
  number: {
    type: Number,
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
  },
  _section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
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

const Wall = mongoose.model('Wall', wallSchema)

module.exports = Wall
