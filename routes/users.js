const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');

router.post('/', controller.createUser);

router.get('/:user_id', controller.getUser);

router.get('/', controller.getUsers);

router.delete('/:user_id', controller.deleteUser);

router.get('/checklists/:user_id', controller.getUserChecklists)

module.exports = router;
