const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sign-up', user_controller.sign_up_get)

router.post('/sign-up', user_controller.sign_up_post)

router.get('/log-in', user_controller.log_in_get)

router.post('/log-in', user_controller.log_in_post)

module.exports = router;
