'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Rating = models.rating

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Rating.find()
    .populate({ path: '_climbingRoute ' })
    .then(ratings => res.json({
      ratings: ratings.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    rating: req.rating.toJSON({ virtuals: true, user: req.user })
  })
}

const create = (req, res, next) => {
  const rating = Object.assign(req.body.rating, {
    _owner: req.user._id
  })
  Rating.create(rating)
        .then(rating =>
          res.status(201)
            .json({
              rating: rating.toJSON({ user: req.user })
            }))
        .catch(next)
}

const update = (req, res, next) => {
  delete req.body.rating._owner  // disallow owner reassignment.

  req.rating.update(req.body.rating)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.rating.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Rating), only: ['show'] },
  { method: setModel(Rating, { forUser: true }), only: ['update', 'destroy'] }
] })
