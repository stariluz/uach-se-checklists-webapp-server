const express = require('express');
const router = express.Router();
const controller = require('../controllers/rol-permissions');

router.post('/create', controller.createRolPermission);

router.get('/:rol_permission_id', controller.getRolPermission);

router.get('/list', controller.getRolPermissions);

router.delete('/:rol_permission_id/delete', controller.deleteRolPermission);

module.exports = router;
