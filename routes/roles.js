const express = require('express');
const router = express.Router();
const controller = require('../controllers/roles');

router.post('/', controller.createRol);

router.get('/:rol_id', controller.getRol);

router.get('/', controller.getRoles);

router.patch('/:rol_id', controller.updateRol);

router.put('/:rol_id', controller.replaceRol);

router.delete('/:rol_id/delete', controller.deleteRol);

router.get('/permissions/:rol_id', controller.getRolPermissions);

module.exports = router;
