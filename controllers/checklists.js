const express = require('express')

function createChecklist(req, res, next) {
    res.send(`POST => /checklists/create/ => ${req.body.user_id} ${req.body.title} ${req.body.date} ${req.body.completeness}`);
}

function getChecklist(req, res, next) {
    res.send(`GET => /checklists/${req.params.checklist_id}`);
}

function getChecklists() {
    res.send(`GET => /checklists/list`);
}

function updateChecklist() {
    cres.send(`PATCH => /checklists/${req.params.checklist_id}/update => ${req.body.title} ${req.body.due_date} ${req.body.completeness}`);
}

function replaceChecklist() {
    res.send(`PUT => /checklists/${req.params.checklist_id}/replace => ${req.body.title} ${req.body.due_date} ${req.body.completeness}`);
}

function deleteChecklist() {
    res.send(`DELETE => /checklists/${req.params.checklist_id}/delete`);
}

function getTasks() {
    res.send(`GET => /checklists/${req.params.checklist_id}/tasks`);
}

function getTasksGroups() {
    res.send(`GET => /checklists/${req.params.checklist_id}/tasks-groups`);
}

module.exports = {createChecklist, getChecklist, getChecklists, updateChecklist, replaceChecklist, deleteChecklist, getTasks, getTasksGroups}