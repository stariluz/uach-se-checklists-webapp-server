const express = require('express');
const router = express.Router();
const controller = require('../controllers/checklists');

router.post('/', controller.createChecklist);

router.get('/:checklist_id', controller.getChecklist);

router.get('/', controller.getChecklists);

router.patch('/:checklist_id', controller.updateChecklist);

router.put('/:checklist_id', controller.replaceChecklist);

router.delete('/:checklist_id', controller.deleteChecklist);

// router.get('/:checklist_id/tasks', controller.getChecklistTasks);

router.get('/tasks/:checklist_id', controller.getChecklistTasks);
// router.get('/:checklist_id/tasks-groups', controller.getChecklistTaskGroups);

router.get('/tasks-groups/:checklist_id', controller.getChecklistTaskGroups);

module.exports = router;
