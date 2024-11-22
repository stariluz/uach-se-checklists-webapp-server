const express = require('express');
const router = express.Router();
const controller = require('../controllers/checklists');

router.post('/', controller.createChecklist);

router.get('/:userId/:checklistId', controller.getChecklist);

router.get('/', controller.getChecklists);

router.patch('/:checklistId', controller.updateChecklist);

router.put('/:checklistId', controller.replaceChecklist);

router.delete('/:checklistId', controller.deleteChecklist);

// router.get('/:checklistId/tasks', controller.getChecklistTasks);

router.get('/tasks/:checklistId', controller.getChecklistTasks);
// router.get('/:checklistId/tasks-groups', controller.getChecklistTaskGroups);

router.get('/tasks-groups/:checklistId', controller.getChecklistTaskGroups);

module.exports = router;
