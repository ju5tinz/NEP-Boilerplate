const express = require('express')
const logger = require('morgan');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)

module.exports = (app, passport, db) => {
  app.use(logger('dev'))
  app.use(cors({
    origin: true,
    credentials: true,
  }))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())

  app.use(session({
    store: new pgSession({
      pool: db.pool
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30*24*60*60*1000 } // 30 days
  }))
  app.use(passport.initialize())
  app.use(passport.session())
}