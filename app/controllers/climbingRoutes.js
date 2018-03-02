'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const ClimbingRoute = models.climbingRoute

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  ClimbingRoute.find()
    .populate({ path: '_wall', select: 'number' })
    .then(climbingRoutes => res.json({
      climbingRoutes: climbingRoutes.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    climbingRoute: req.climbingRoute.toJSON({ virtuals: true, user: req.user })
  })
}

const create = (req, res, next) => {
  const climbingRoute = Object.assign(req.body.climbingRoute, {
    _owner: req.user._id
  })
  ClimbingRoute.create(climbingRoute)
        .then(climbingRoute =>
          res.status(201)
            .json({
              climbingRoute: climbingRoute.toJSON({ user: req.user })
            }))
        .catch(next)
}

const update = (req, res, next) => {
  delete req.body.climbingRoute._owner  // disallow owner reassignment.

  req.climbingRoute.update(req.body.climbingRoute)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.climbingRoute.remove()
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
  { method: setModel(ClimbingRoute), only: ['show'] },
  { method: setModel(ClimbingRoute, { forUser: true }), only: ['update', 'destroy'] }
] })
