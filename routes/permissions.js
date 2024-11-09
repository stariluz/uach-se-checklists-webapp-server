const express = require('express');
const router = express.Router();
const controller = require('../controllers/permissions');

router.post('/', controller.createPermission);

router.get('/:permission_id', controller.getPermission);

router.get('/list', controller.getPermissions);

router.patch('/:permission_id', controller.updatePermission);

router.put('/:permission_id', controller.replacePermission);

router.delete('/:permission_id', controller.deletePermission);

module.exports = router;
