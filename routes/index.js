const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');
const msg_controller = require('../controllers/msgController');

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", { title: 'Welcome', user: req.user });
});

router.get('/sign-up', user_controller.sign_up_get)

router.post('/sign-up', user_controller.sign_up_post)

router.get('/log-in', user_controller.log_in_get)

router.post('/log-in', user_controller.log_in_post)

router.get('/log-out', user_controller.log_out)

router.get('/new-message', msg_controller.new_msg_get)

router.post('/new-message', msg_controller.new_msg_post)

module.exports = router;
