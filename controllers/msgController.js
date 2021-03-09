const Msg = require('../models/msg');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');

exports.new_msg_get = (req, res, next) => {
    res.render('msg_form', { title: 'Write a New Message', user: req.user})
}

exports.new_msg_post = [
    body('title', 'Must not be empty').trim().isLength({ min: 1, max: 20 }).escape(),
    body('text', 'Must not be empty').trim().isLength({ min: 1, max: 200}).escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        const msg = new Msg(
            {
                title: req.body.title,
                text: req.body.text,
                user: req.user,
                timestamp: new Date().toLocaleString()
            }
        )
        if (errors.isEmpty()) {
            msg.save((err) => {
                if (err) { return next(err) }
                res.redirect('/');
            })
        }
    }
]

exports.delete_get = (req, res, next) => {
    Msg.findById(req.params.id)
    .populate('user')
    .exec((err, result) => {
        if (err) { return next(err) }
        res.render('delete', {title: 'Delete Message', msg: result});
    })
}

exports.delete_post = (req, res, next) => {
    Msg.findById(req.params.id)
    .populate('user')
    .exec((err) => {
        if (err) { return next(err) }
        else {
            Msg.findByIdAndRemove(req.body.msgid, function deleteMsg(err) {
                if (err) { return next(err) }
                res.redirect('/')
            })
        }
    })
}