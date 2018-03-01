'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Section = models.section

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Section.find()
    .then(sections => res.json({
      sections: sections.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    section: req.section.toJSON({ virtuals: true, user: req.user })
  })
}

const create = (req, res, next) => {
  const section = Object.assign(req.body.section, {
    _owner: req.user._id
  })
  Section.create(section)
    .then(section =>
      res.status(201)
        .json({
          section: section.toJSON({ virtuals: true, user: req.user })
        }))
    .catch(next)
}

const update = (req, res, next) => {
  delete req.body.section._owner  // disallow owner reassignment.

  req.section.update(req.body.section)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.section.remove()
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
  { method: setModel(Section), only: ['show'] },
  { method: setModel(Section, { forUser: true }), only: ['update', 'destroy'] }
] })
