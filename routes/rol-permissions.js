const express = require('express');
const router = express.Router();
const controller = require('../controllers/rol-permissions');

router.post('/create', controller.create);

router.get('/:rol_permission_id', );

router.get('/list', );

router.delete('/:rol_permission_id/delete', );

module.exports = router;
