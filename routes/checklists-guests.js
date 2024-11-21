const express = require('express');
const router = express.Router();
const controller = require('../controllers/checklists-guests');

router.post('/create', controller.createChecklistGuest);

router.get('/:checklist_guest_id', controller.getChecklistGuest);

router.get('/list', controller.getChecklistsGuests);

router.patch('/:checklist_guest_id/update', controller.updateChecklistGuest);

router.put('/:checklist_guest_id/replace', controller.replaceChecklistGuest);

router.delete('/:checklist_guest_id/delete', controller.deleteChecklistGuest);

router.get('/:checklist_guest_id/users', controller.getChecklistGuestUsers);

module.exports = router;
