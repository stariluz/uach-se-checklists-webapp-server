const express = require('express')

function createTasksGroup(req, res, next) {
    res.send(`POST => /tasks-groups/create/ => ${req.body.checklist_id} ${req.body.title}`);
}

function getTasksGroup(req, res, next) {
    res.send(`GET => /tasks-groups/${req.params.tasks_group_id}`);
}

function getTasksGroups() {
    res.send(`GET => /tasks-groups/list`);
}

function updateTasksGroup() {
    res.send(`PATCH => /tasks-groups/${req.params.tasks_group_id}/update => ${req.body.checklist_id} ${req.body.title}`);
}

function replaceTasksGroup() {
    res.send(`PUT => /tasks-groups/${req.params.tasks_group_id}/replace => ${req.body.checklist_id} ${req.body.title}`);
}

function deleteTasksGroup() {
    res.send(`DELETE => /tasks-groups/${req.params.tasks_group_id}/delete`);
}

function getTasksTasksGroup() {
    res.send(`GET => /tasks-groups/${req.params.tasks_group_id}/tasks`);
}

module.exports = {createTasksGroup, getTasksGroup, getTasksGroups, updateTasksGroup, replaceTasksGroup, deleteTasksGroup, getTasksTasksGroup}