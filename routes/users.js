const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');

router.post('/create', controller.createUser);

router.get('/:user_id', controller.getUser);

router.get('/:user_id/list', controller.getUsers);

router.delete('/:user_id/delete', controller.deleteUser);

router.get('/:user_id/checklists', controller.getUserChecklists)

module.exports = router;
