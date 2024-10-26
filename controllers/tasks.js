const express = require('express');
const { Task } = require('../db');
const { where } = require('sequelize');

function createTask(req, res, next) {
    const title = req.body.title;
    const due_date = req.body.due_date;
    const completed_at = req.body.completed_at;
    const created_at = req.body.created_at;
    const updated_at = req.body.updated_at;

    Task.create({
        title : title,
        due_date : due_date,
        completed_at : completed_at,
        created_at: created_at,
        updated_at: updated_at
    }).then(object => res.json(object))
    .catch(ex => res.send(ex));
}

function getTask(req, res, next) {
    const CheckGuest_id = req.params.Task_id;
    Task.findByPk(CheckGuest_id)  
            .then(object => res.json(object))
            .catch(ex => res.send(ex));
}

function getTasks(req, res, next) {
    Task.findAll()
            .then(object => res.json(object))
            .catch(ex => res.send(ex));
}

function deleteTask(req, res, next) {
    const Task_id = req.params.Task_id;
    Task.destroy({ where: {id: Task_id}})
    .then(object => res.json(object))
    .catch(ex => res.send(ex));
}


module.exports = {createTask, getTask, getTasks, deleteTask}