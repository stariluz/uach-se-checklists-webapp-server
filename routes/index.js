const express = require('express');
const controller = require('../controllers/index');
const router = express.Router();

/* GET home page. */
router.get('/', controller.home);

router.post('/login', controller.login);
router.post('/signup', controller.signup);
router.post('/logout', controller.logout);

module.exports = router;
