const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

module.exports = (passport, db) => {
  passport.use(
    'local-signup',
    new LocalStrategy((username, password, done) => {
      db.query("SELECT uid FROM accounts WHERE username = $1", [username], (err, res) => {
        if(err) {
          return done(err)
        }
        // if a user is found, return error message
        if(res.rows.length) {
          return done(null, false, {message: "Username is already taken."})
        }
        // no user found, create account
        bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS), (err, hashedPassword) => {
          if(err) {
            return done(err)
          }

          db.query(
            "INSERT INTO accounts (username, password) VALUES ($1, $2) RETURNING uid, username", 
            [username, hashedPassword],
            (err, res) => {
              if(err) {
                return done(err)
              }

              return done(null, {uid: res.rows[0].uid, username: res.rows[0].username})
            })
        })
      })
    })
  )

  passport.use(
    'local-login',
    new LocalStrategy((username, password, done) => {
      db.query("SELECT * FROM accounts WHERE username = $1", [username], (err, user) => {
        if(err) {
          return done(err)
        }
        // if no user found
        if(!user.rows.length) {
          return done(null, false, {message: "No user with that username found."})
        }
        // user found, compare password
        bcrypt.compare(password, user.rows[0].password, (err, res) => {
          if(err) {
            return done(err)
          }
          // wrong password
          if(!res) {
            return done(null, false, {message: "Wrong password."})
          }

          return done(null, {uid: user.rows[0].uid, username: user.rows[0].username})
        })
      })
    })
  )

  passport.serializeUser((user, done) => {
    done(null, user.uid)
  })

  passport.deserializeUser((uid, done) => {
    db.query("SELECT * FROM accounts WHERE uid = $1", [uid], (err, user) => {
      if(err) {
        return done(err)
      }
      return done(null, user.rows[0])
    })
  })
}