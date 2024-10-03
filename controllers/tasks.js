const express = require('express')

function createTasks(req, res, next) {
    res.send(`POST => /tasks/create/ => ${req.body.checklist_id} ${req.body.task_group_id} ${req.body.title} ${req.body.due_date}`);
}

function getTask(req, res, next) {
    res.send(`GET => /tasks/${req.params.task_id}`);
}

function getTasks() {
    res.send(`GET => /tasks/list`);
}

function updateTasks() {
    res.send(`PATCH => /tasks/${req.params.task_id}/update => ${req.body.task_group_id} ${req.body.title} ${req.body.due_date} ${req.body.completed_at} ${req.body.completed_by}`);
}

function replaceTasks() {
    res.send(`PUT => /tasks/${req.params.task_id}/replace => ${req.body.task_group_id} ${req.body.title} ${req.body.due_date} ${req.body.completed_at} ${req.body.completed_by}`);
}

function deleteTasks() {
    res.send(`DELETE => /tasks/${req.params.task_id}/delete`);
}

module.exports = {createTasks, getTask, getTasks, updateTasks, replaceTasks, deleteTasks}