'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Section = models.section

/* GET home page. */
const root = (req, res, next) => {
  Section.find()
    .populate({ path: 'walls',
      populate: {
        path: 'climbingRoutes',
        populate: {
          path: 'ratings'
        }
      }
    })
    .then(sections => res.json({
      sections: sections.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

module.exports = controller({
  root
})
