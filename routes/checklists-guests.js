const express = require('express');
const router = express.Router();
const controller = require('../controllers/checklists-guests');

router.post('/', controller.createChecklistGuest);

router.get('/:checklistId', controller.getChecklistGuests);

router.patch('/:checklistGuestId', controller.updateChecklistGuest);

router.delete('/:checklistGuestId', controller.deleteChecklistGuest);

module.exports = router;
