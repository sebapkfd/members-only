const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');
const msg_controller = require('../controllers/msgController');

router.get("/", user_controller.index);

router.get('/sign-up', user_controller.sign_up_get)

router.post('/sign-up', user_controller.sign_up_post)

router.get('/log-in', user_controller.log_in_get)

router.post('/log-in', user_controller.log_in_post)

router.get('/log-out', user_controller.log_out)

router.get('/new-message', msg_controller.new_msg_get)

router.post('/new-message', msg_controller.new_msg_post)

router.get('/become-member', user_controller.become_member_get)

router.post('/become-member', user_controller.become_member_post)

router.get('/become-admin', user_controller.become_admin_get)

router.post('/become-admin', user_controller.become_admin_post)

router.delete('/', msg_controller.delete_post);

module.exports = router;
