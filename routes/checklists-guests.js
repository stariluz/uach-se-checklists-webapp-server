const express = require('express');
const router = express.Router();
const controller = require('../controllers/checklists-guests');

router.post('/', controller.createChecklistGuest);

router.get('/:checklist_guest_id', controller.getChecklistGuest);

router.get('/', controller.getChecklistGuests);

router.patch('/:checklist_guest_id', controller.updateChecklistGuest);

router.put('/:checklist_guest_id', controller.replaceChecklistGuest);

router.delete('/:checklist_guest_id', controller.deleteChecklistGuest);

router.get('/users/:checklist_guest_id', controller.getChecklistGuestUsers);

module.exports = router;
