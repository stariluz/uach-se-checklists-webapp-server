const express = require('express');
const { TaskGroup, Task } = require('../db');
const { where } = require('sequelize');

function createTaskGroup(req, res, next) {
    const title = req.body.title;
    const created_at = req.body.created_at;
    const updated_at = req.body.updated_at;

    TaskGroup.create({
        title : title,
        created_at: created_at,
        updated_at: updated_at
    }).then(object => res.json(object))
    .catch(ex => res.send(ex));
}

function getTaskGroup(req, res, next) {
    const CheckGuest_id = req.params.TaskGroup_id;
    TaskGroup.findByPk(CheckGuest_id)  
            .then(object => res.json(object))
            .catch(ex => res.send(ex));
}

function getTaskGroups(req, res, next) {
    TaskGroup.findAll()
            .then(object => res.json(object))
            .catch(ex => res.send(ex));
}

function deleteTaskGroup(req, res, next) {
    const TaskGroup_id = req.params.TaskGroup_id;
    TaskGroup.destroy({ where: {id: TaskGroup_id}})
    .then(object => res.json(object))
    .catch(ex => res.send(ex));
}

function getTasksToGroup() {
    TaskGroup.findAll({include:['task']}).then(objects => res.json(objects)).catch(ex => res.send(ex));
}


module.exports = {createTaskGroup, getTaskGroup, getTaskGroups, deleteTaskGroup,getTasksToGroup}
