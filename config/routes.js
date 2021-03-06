'use strict'

module.exports = require('lib/wiring/routes')

// create routes

// what to run for `GET /`
.root('root#root')
.resources('sections', { only: ['index', 'show'] })
.resources('walls', { only: ['index', 'show'] })
.resources('climbingRoutes', { only: ['index', 'show'] })
.resources('ratings')

// users of the app have special requirements
.post('/sign-up', 'users#signup')
.post('/sign-in', 'users#signin')
.delete('/sign-out/:id', 'users#signout')
.patch('/change-password/:id', 'users#changepw')
.resources('users', { only: ['index', 'show'] })

// all routes created
