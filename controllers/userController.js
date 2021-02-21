const User = require('../models/user');
const passport = require('../passport/setup');
const bcrypt = require('bcryptjs');

exports.sign_up_get = function(req, res, next) {
    res.render('sign_up', { title: 'Sign Up' });
}

//If err redirect to sign up

exports.sign_up_post = function(req, res, next) {
    if (req.body.password === req.body.confirm) {
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) {
                return next(err)
            }
            else {
                const user = new User(
                    {
                        first_name: req.body.firstname,
                        last_name: req.body.lastname,
                        username: req.body.username,
                        password: hashedPassword,
                        status: 'member'
                    }
                )
                user.save((err) => {
                    if (err) { return next(err) }
                    res.redirect('/')
                    // return
                })
            }
        })
    }
    else {
        res.redirect('/sign-up');
    }
}

exports.log_in_get = function(req, res, next) {
    res.render('log_in', { title: 'Log in' });
}

exports.log_in_post = ('/log_in', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

exports.log_out = function(req, res) {
    req.logout();
    res.redirect('/');
}