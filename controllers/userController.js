const User = require('../models/user');
const passport = require('../passport/setup');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

exports.sign_up_get = function(req, res, next) {
    res.render('sign_up', { title: 'Sign Up' });
}

exports.sign_up_post = [
    body('firstname', 'Must not be empty').trim().isLength({ min:1 }).escape(),
    body('lastname', 'Must not be empty').trim().isLength({ min:1 }).escape(),
    body('username', 'Must not be empty').trim().isLength({ min:1 }).escape(),
    body('password', 'Must not be empty').trim().isLength({ min:1 }).escape(),
    body('confirm', 'Must not be empty').trim().isLength({ min:1 }).escape(),
    
    (req, res, next) => {
        const errors = validationResult(req);
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
                    if (errors.isEmpty()) {
                        user.save((err) => {
                            if (err) { return next(err) }
                            res.redirect('/')
                        })
                    }
                }
            })
        }
        else {
            res.redirect('/sign-up');
        }
    }
]

exports.log_in_get = function(req, res, next) {
    res.render('log_in', { title: 'Log in' });
}

exports.log_in_post = ('/log_in', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in"
  })
);

exports.log_out = function(req, res) {
    req.logout();
    res.redirect('/');
}