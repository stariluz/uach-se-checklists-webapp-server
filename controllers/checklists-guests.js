const express = require('express')

function createChecklistGuest(req, res, next) {
    res.send(`POST => /checklists-guests/create/ => ${req.body.checklist_id} ${req.body.user_id} ${req.body.rol_id}`);
}

function getChecklistGuest(req, res, next) {
    res.send(`GET => /checklists-guests/${req.params.checklist_guest_id}`);
}

function getChecklistsGuests() {
    res.send(`GET => /checklists-guests/list`);
}

function updateChecklistGuest() {
    cres.send(`PATCH => /checklists-guests/${req.params.checklist_guest_id}/update => ${req.body.checklist_id} ${req.body.user_id} ${req.body.rol_id}`);
}

function replaceChecklistGuest() {
    res.send(`PUT => /checklists-guests/${req.params.checklist_guest_id}/replace => ${req.body.checklist_id} ${req.body.user_id} ${req.body.rol_id}`);
}

function deleteChecklistGuest() {
    res.send(`DELETE => /checklists-guests/${req.params.checklist_guest_id}/delete`);
}

function getChecklistGuestUsers() {
    res.send(`GET => /checklists-guests/${req.params.checklist_guest_id}/users`);
}

module.exports = {createChecklistGuest, getChecklistGuest, getChecklistsGuests, updateChecklistGuest, replaceChecklistGuest, deleteChecklistGuest, getChecklistGuestUsers}