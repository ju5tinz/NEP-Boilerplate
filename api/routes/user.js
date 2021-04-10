const router = require('express').Router()
const userController = require('../controllers/user')

// all routes prefixed with /user
module.exports = (passport) => {
  router.post('/register', passport.authenticate('local-signup'), userController.register)
  router.post('/login', passport.authenticate('local-login'), userController.login)
  router.get('/logout', userController.logout)

  return router
}