const express = require('express');
const router = express.Router();
const controller = require('../controllers/rol-permissions');

router.post('/', controller.createRolPermission);

router.get('/:rol_permission_id', controller.getRolPermission);

router.get('/', controller.getRolPermissions);

router.delete('/:rol_permission_id', controller.deleteRolPermission);

module.exports = router;
