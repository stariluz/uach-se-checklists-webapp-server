const express = require('express');
const router = express.Router();
const controller = require('../controllers/checklists');

router.post('/create', controller.createChecklist);

router.get('/:checklist_id', controller.getChecklist);

router.get('/list', controller.getChecklists);

//router.patch('/:checklist_id/update', controller.updateChecklist);

//router.put('/:checklist_id/replace', controller.replaceChecklist);

router.delete('/:checklist_id/delete', controller.deleteChecklist);

//router.get('/:checklist_id/tasks', controller.getTasks);

//router.get('/:checklist_id/tasks-groups', controller.getTasksGroups);

module.exports = router;
