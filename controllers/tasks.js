const express = require('express');
const { Task } = require('../db');
const { where } = require('sequelize');

function createTask(req, res, next) {
    //TO DO: Falta definir la relacion de checklist_id, tasks_group_id y complete_by
    const title = req.body.title;
    const due_date = req.body.due_date;
    const completed_at = req.body.completed_at;
    //const created_at = req.body.created_at;
    //const updated_at = req.body.updated_at;

    Task.create({
        title : title,
        due_date : due_date,
        completed_at : completed_at
        //created_at: created_at,
        //updated_at: updated_at
    }).then(object => res.json(object))
    .catch(ex => res.send(ex));
}

function getTask(req, res, next) {
    const task_id = req.params.task_id;
    Task.findByPk(task_id)  
            .then(object => res.json(object))
            .catch(ex => res.send(ex));
}

function getTasks(req, res, next) {
    Task.findAll()
            .then(object => res.json(object))
            .catch(ex => res.send(ex));
}

function updateTasks(req, res, next) {
    const task_id = req.params.task_id;
    Task.findByPk(task_id)
    .then(object => {
        const title = req.body.title ? req.body.title: object.body.title ;
        const due_date = req.body.due_date ? req.body.due_date: object.body.due_date;
        const complete_at = req.body.complete_at ? req.body.complete_at: object.body.complete_at;
        //const created_at = object.body.created_at;
        //const updated_at = req.body.updated_at ? req.body.complete_at: object.body.updated_at;

        // Revisar las fechas de completado, puede haber fallas de la fecha de actualizado
        object.update({
            title: title,
            due_date: due_date,
            complete_at:complete_at
            //created_at:created_at,
            //updated_at:updated_at
        }).then(obj => res.json(obj))
          .catch(ex => res.send(ex))
    }).catch(ex => res.send(ex));
}


function replaceTasks(req, res, next) {
    const task_id = req.params.task_id;
    Task.findByPk(task_id)
    .then(object => {
        const title = req.body.title ? req.body.title : "";
        const due_date = req.body.due_date ? req.body.due_date : "";;
        const complete_at = req.body.complete_at ? req.body.complete_at : "";;
        //const created_at = object.body.created_at ;
        //const updated_at = req.body.updated_at ? req.body.updated_at : object.body.updated_at;

        // Revisar las fechas de completado, puede haber fallas de la fecha de actualizado
        object.update({
            title: title,
            due_date: due_date,
            complete_at:complete_at
            //created_at:created_at,
            //updated_at:updated_at
        }).then(obj => res.json(obj))
          .catch(ex => res.send(ex))
    }).catch(ex => res.send(ex));
}

function deleteTask(req, res, next) {
    const task_id = req.params.Task_id;
    Task.destroy({ where: {id: task_id}})
    .then(object => res.json(object))
    .catch(ex => res.send(ex));
}


module.exports = {createTask, getTask, getTasks, updateTasks, replaceTasks, deleteTask}
