'use strict'

// AbstractController::ActionNotFound \

const ActionNotFound = function (message) {
  this.name = 'ActionNotFound'
  this.message = message || 'ActionNotFound'
}

ActionNotFound.prototype = Object.create(Error.prototype)
ActionNotFound.prototype.constructor = ActionNotFound

module.exports = ActionNotFound
