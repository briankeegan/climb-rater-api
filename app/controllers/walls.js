'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Wall = models.wall

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Wall.find()
    .populate({ path: '_section', select: 'name' })
    .populate({ path: 'climbingRoutes', select: '_id _wall color gymGrade ' })
    .then(walls => res.json({
      walls: walls.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    wall: req.wall.toJSON({ virtuals: true, user: req.user })
  })
}

const create = (req, res, next) => {
  const wall = Object.assign(req.body.wall, {
    _owner: req.user._id
  })
  Wall.create(wall)
        .then(wall =>
          res.status(201)
            .json({
              wall: wall.toJSON({ user: req.user })
            }))
        .catch(next)
}

const update = (req, res, next) => {
  delete req.body.wall._owner  // disallow owner reassignment.

  req.wall.update(req.body.wall)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.wall.remove()
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
  { method: setModel(Wall), only: ['show'] },
  { method: setModel(Wall, { forUser: true }), only: ['update', 'destroy'] }
] })
