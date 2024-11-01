const express = require('express');
const router = express.Router();
const controller = require('../controllers/tasks');

router.post('/create', controller.createTask);

router.get('/:task_id', controller.getTask);

router.get('/list', controller.getTasks);

//router.patch('/:task_id/update', controller.updateTasks);

//router.put('/:task_id/replace', controller.replaceTasks);

router.delete('/:task_id/delete', controller.deleteTask);

module.exports = router;
