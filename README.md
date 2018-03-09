# Climb Rater API
### MongoDB and Express.js API


Check out the deployed [API](https://climb-rater-api.herokuapp.com/)

###  Navigation

You don’t have be logged in to navigate and view ratings.  To rate, you will have to log in.
Click on the section, and within the section pick the route.  They are organized by number and color.  You can view what the gym says it’s rated at and what others think, and what you think!

### The other side

The Front end is built with react
[repo](https://github.com/briankeegan/climb-rater)
[deployed api](https://briankeegan.github.io/climb-rater/)


### Technologies
Mongo.db
Express.js
Mongoose.js
Node.js

### Unsolved
I would like to set up administrative privileges.

### Planning and Process
I was methodical, and built one resource at  a time.
I tested with many many curl scripts, which really helped out when working with the frontend
A lot of time was spent reading about virtuals, which I found interesting and incredibly useful.

### Challenges
I had a lot of trouble designing the five resources and connecting them in a meaningful way.  Eventually with virtuals, I was able to have both user and climbingRoute point to rating.


[ERD](https://www.lucidchart.com/invitations/accept/0b8d61b8-eb68-4bc0-85d0-b7f37ec161f2)

### Dependencies

Install with `npm install`.

### Authentication

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/:id` | `users#changepw`  |
| DELETE | `/sign-out/:id`        | `users#signout`   |
| POST   | `/sections`            | `sections#create`    |
| PATCH  | `/sections/:id`        | `sections#update`  |
| DELETE | `/sections/:id`        | `sections#destroy`   |
| GET  | `/sections/`             | `sections#index`  |
| GET   | `/sections/:id`           | `sections#show`   |
| POST   | `/walls`            | `walls#create`    |
| PATCH  | `/walls/:id`        | `walls#update`  |
| DELETE | `/walls/:id`        | `walls#destroy`   |
| GET  | `/walls/`             | `walls#index`  |
| GET   | `/walls/:id`           | `walls#show`   |
| POST   | `/climbingRoutes`            | `climbingRoutes#create`    |
| PATCH  | `/climbingRoutes/:id`        | `climbingRoutes#update`  |
| DELETE | `/climbingRoutes/:id`        | `climbingRoutes#destroy`   |
| GET  | `/climbingRoutes/`             | `climbingRoutes#index`  |
| GET   | `/climbingRoutes/:id`           | `climbingRoutes#show`   |
| POST   | `/ratings`            | `ratings#create`    |
| PATCH  | `/ratings/:id`        | `ratings#update`  |
| DELETE | `/ratings/:id`        | `ratings#destroy`   |
| GET  | `/ratings/`             | `ratings#index`  |
| GET   | `/ratings/:id`           | `ratings#show`   |



#### Note
Section, Wall, ClimbingRoute are intentionally disabled.  To enable them remote `, { only: ['index', 'show'] }` from `routes.js`
