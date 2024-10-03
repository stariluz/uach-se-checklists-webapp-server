const express = require('express');
const router = express.Router();
const controller = require('../controllers/roles');

router.post('/create', controller.createRole);

router.get('/:rol_id', controller.getRole);

router.get('/list', controller.getRoles);

router.patch('/:rol_id/update', controller.updateRole);

router.put('/:rol_id/replace', controller.replaceRole);

router.delete('/:rol_id/delete', controller.deleteRole);

router.get('/:rol_id/permissions', controller.getRolePermissions);

module.exports = router;
