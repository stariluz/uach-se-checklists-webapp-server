const express = require('express');
const router = express.Router();
const controller = require('../controllers/permissions');

router.post('/create', controller.createPermission);

router.get('/:permission_id', controller.getPermission);

router.get('/list', controller.getPermissions);

//router.patch('/:permission_id/update', controller.updatePermission);

//router.put('/:permission_id/replace', controller.replacePermission);

router.delete('/:permission_id/delete', controller.deletePermission);

module.exports = router;
