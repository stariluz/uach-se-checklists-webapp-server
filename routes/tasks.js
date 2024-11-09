const express = require('express');
const router = express.Router();
const controller = require('../controllers/tasks');

router.post('/', controller.createTask);

router.get('/:task_id', controller.getTask);

router.get('/list', controller.getTasks);

router.patch('/:task_id', controller.updateTasks);

router.put('/:task_id', controller.replaceTasks);

router.delete('/:task_id', controller.deleteTask);

module.exports = router;
