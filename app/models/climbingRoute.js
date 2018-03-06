'use strict'

const mongoose = require('mongoose')

const climbinRouteSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true
  },
  gymGrade: {
    type: String,
    required: true
  },
  routeSetter: {
    type: String,
    required: true
  },
  routeType: {
    type: String,
    required: true
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  _wall: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wall',
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

climbinRouteSchema.virtual('ratings', {
  ref: 'Rating',
  localField: '_id',
  foreignField: '_climbingRoute',
  justOne: false
})

const ClimbingRoute = mongoose.model('ClimbingRoute', climbinRouteSchema)

module.exports = ClimbingRoute
