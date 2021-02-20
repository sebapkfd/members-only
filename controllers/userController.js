const User = require('../models/user');
const passport = require('../passport/setup');

exports.sign_up_get = function(req, res, next) {
    res.render('sign_up', { title: 'Sign Up' });
}

exports.sign_up_post = function(req, res, next) {
    const user = new User(
        {
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            status: 'member'
        }
    )
    user.save((err) => {
        if (err) { return next(err) }
        res.redirect('/')
    })
}

exports.log_in_get = function(req, res, next) {
    res.render('log_in', { title: 'Log in' });
}

exports.log_in_post =
    ('/log_in',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/log-in',
        failureFlash: true,
        passReqToCallback: true,
    }));