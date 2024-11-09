const express = require('express');
const router = express.Router();
const controller = require('../controllers/tasks-groups');

router.post('/', controller.createTaskGroup);

router.get('/:tasks_group_id', controller.getTaskGroup);

router.get('/', controller.getTaskGroups);

router.patch('/:tasks_group_id', controller.updateTaskGroup);

router.put('/:tasks_group_id', controller.replaceTaskGroup);

router.delete('/:tasks_group_id', controller.deleteTaskGroup);

router.get('/tasks/:tasks_group_id', controller.getTasksGroup);

module.exports = router;
