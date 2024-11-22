const express = require('express');
const router = express.Router();
const controller = require('../controllers/tasks');

router.post('/', controller.createTask);

router.get('/:taskId', controller.getTask);

router.get('/list', controller.getTasks);

router.patch('/changeComplete/:taskId', controller.changeCompleteTask);

router.patch('/:taskId', controller.updateTasks);

router.put('/:taskId', controller.replaceTasks);

router.delete('/:taskId', controller.deleteTask);

module.exports = router;
