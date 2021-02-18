const User = require('../models/user');

exports.sign_up_get = function(req, res, next) {
    res.render('sign_up', { title: 'Sign Up' });
}

exports.sign_up_post = function(req, res, next) {

}

exports.log_in_post = function(req, res, next) {
    res.render('log_in', { title: 'Log in' });
}

exports.log_in_post = function(req, res, next) {
    res.render('log_in', { title: 'Log in' });
}