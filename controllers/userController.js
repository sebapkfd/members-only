const User = require('../models/user');
const Msg = require('../models/msg');
const passport = require('../passport/setup');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

exports.index = (req, res, next) => {
    Msg.find()
    .populate('user')
    .exec((err, msgs) => {
        if (err) { return next(err) }
        res.render("index", { title: 'Welcome', user: req.user, messages: msgs });
    })
}

exports.sign_up_get = function(req, res, next) {
    res.render('sign_up', { title: 'Sign Up' });
}

exports.sign_up_post = [
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
                            username: req.body.username,
                            password: hashedPassword,
                            status: 'user'
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

exports.become_member_get = (req, res, next) => {
    if (req.user && req.user.status === 'user') {
        res.render('join_form', { title: 'Become a Member!', user: req.user, text: 'Become member'});
    }
    else {
        res.redirect('/')
    }
}

exports.become_member_post = [
    body('password', 'Must not be empty').trim().isLength({ min:1 }).escape(),

    (req, res, next) => {
        if (req.user && req.user.status === 'user') {
            const errors = validationResult(req);
            if (req.body.password === 'member') {
                const user = new User(
                    {
                        username: req.user.username,
                        password: req.user.password,
                        status: 'member',
                        _id: req.user.id
                    }
                )
                if (errors.isEmpty()) {
                    User.findByIdAndUpdate(req.user.id, user, (err, userUpdated) => {
                        if (err) { return next(err) }
                        res.redirect('/')
                    })
                }
            }
            else {
                res.redirect('/become-member')
            }
        }
        else {
            res.redirect('/');
        }
    }
]

exports.become_admin_get = (req, res, next) => {
    if (req.user && req.user.status === 'member') {
        res.render('join_form', { title: 'Become an Admin!', user: req.user, text: 'Become admin'});
    }
    else {
        res.redirect('/')
    }
}

exports.become_admin_post = [
    body('password', 'Must not be empty').trim().isLength({ min:1 }).escape(),

    (req, res, next) => {
        if (req.user && req.user.status === 'member') {
            const errors = validationResult(req);
            if (req.body.password === 'admin') {
                const user = new User(
                    {
                        username: req.user.username,
                        password: req.user.password,
                        status: 'admin',
                        _id: req.user.id
                    }
                )
                if (errors.isEmpty()) {
                    User.findByIdAndUpdate(req.user.id, user, (err, userUpdated) => {
                        if (err) { return next(err) }
                        res.redirect('/')
                    })
                }
            }
            else {
                res.redirect('/become-admin')
            }
        }
        else {
            res.redirect('/');
        }
    }
]

exports.profile = (req, res, next) => {
    User.findById(req.params.id)
    .exec((err, result) => {
        if (err) { return(next) }
        res.render('profile', {title: `${result.username}`, user: result})
    })
}