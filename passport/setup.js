const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/user');

passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({ username: username}, (err, user) => {
            if (err) { return done(err) }
            if (!user) { //must be changed, it reveals info
                return done(null, false, { message: 'Incorrect data'});
            }
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                  // passwords match! log user in
                  return done(null, user)
                } else {
                  // passwords do not match!
                  return done(null, false, { message: "Incorrect data" })
                }
            })
        })
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

module.exports = passport;