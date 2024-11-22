const express = require('express');
const { Task } = require('../db');
const { where } = require('sequelize');

function createTask(req, res, next) {
    const title = req.body.title;
    const due_date = req.body.due_date;
    const checklistId = req.body.checklistId;

    // @todo Check permissions

    Task.create({
        title: title,
        checklistId: checklistId,
        due_date: due_date,
    }).then(object => res.json(object))
        .catch(ex => res.send(ex));
}

function getTask(req, res, next) {
    const taskId = req.params.taskId;
    // @todo Check permissions
    Task.findByPk(taskId)
        .then(object => res.json(object))
        .catch(ex => res.send(ex));
}

function getTasks(req, res, next) {
    Task.findAll()
        .then(object => res.json(object))
        .catch(ex => res.send(ex));
}

function updateTasks(req, res, next) {
    const taskId = req.params.taskId;
    // @todo Check permissions
    Task.findByPk(taskId).then(object => {
        const title = req.body.title ? req.body.title : object.title;
        const due_date = req.body.due_date ? req.body.due_date : object.due_date || null;
        object.update({
            title: title,
            due_date: due_date,
        }).then(obj => {
            return res.json(obj)
        })
            .catch(ex => {
                console.log("NO ENCONTRO", ex);
                return res.json(ex)
            })
    }).catch(ex => {
        console.log("NO ENCONTRO", ex);
        return res.json(ex)
    });
}


function changeCompleteTask(req, res, next) {
    const taskId = req.params.taskId;
    // @todo Check permissions
    Task.findByPk(taskId).then(object => {
        const is_complete = req.body.is_complete!=undefined ? req.body.is_complete : object.is_complete;
        const completed_at = is_complete ? req.body.completed_at ? req.body.completed_at : object.completed_at : null;
        // const completed_by = req.body.completed_by ? req.body.completed_by : object.completed_by;
        object.update({
            is_complete: is_complete,
            completed_at: completed_at,
            // completed_by: completed_by
        }).then(obj => {
            return res.json(obj)
        })
            .catch(ex => {
                console.log("NO ENCONTRO", ex);
                return res.json(ex)
            })
    }).catch(ex => {
        console.log("NO ENCONTRO", ex);
        return res.json(ex)
    });
}

function replaceTasks(req, res, next) {
    const taskId = req.params.taskId;
    Task.findByPk(taskId)
        .then(object => {
            const title = req.body.title ? req.body.title : "";
            const due_date = req.body.due_date ? req.body.due_date : "";;
            //const createdAt = object.createdAt ;
            //const updatedAt = req.body.updatedAt ? req.body.updatedAt : object.updatedAt;

            // Revisar las fechas de completado, puede haber fallas de la fecha de actualizado
            object.update({
                title: title,
                due_date: due_date,
                //createdAt:createdAt,
                //updatedAt:updatedAt
            }).then(obj => res.json(obj))
                .catch(ex => res.send(ex))
        }).catch(ex => res.send(ex));
}

function deleteTask(req, res, next) {
    const taskId = req.params.taskId;
    Task.destroy({ where: { id: taskId } })
        .then(object => res.json(object))
        .catch(ex => res.send(ex));
}


module.exports = { createTask, getTask, getTasks, updateTasks, replaceTasks, deleteTask, changeCompleteTask }
