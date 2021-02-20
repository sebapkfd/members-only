const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", { title: 'Welcome', user: req.user });
});

router.get('/sign-up', user_controller.sign_up_get)

router.post('/sign-up', user_controller.sign_up_post)

router.get('/log-in', user_controller.log_in_get)

router.post('/log-in', user_controller.log_in_post)

router.get('/log-out', user_controller.log_out)

module.exports = router;
