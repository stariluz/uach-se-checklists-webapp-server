const express = require('express');
const { TaskGroup, Checklist } = require('../db');
const { where } = require('sequelize');

function createTaskGroup(req, res, next) {
    //TO DO: Realizar la debida relacion entre checklist_id y el taskGroup
    const title = req.body.title;
    //const created_at = req.body.created_at;
    //const updated_at = req.body.updated_at;

    TaskGroup.create({
        title: title
        //created_at: created_at,
        //updated_at: updated_at
    }).then(object => res.json(object))
    .catch(ex => res.send(ex));
}

function getTaskGroup(req, res, next) {
    const task_group_id = req.params.task_group_id;
    TaskGroup.findByPk(task_group_id)  
            .then(object => res.json(object))
            .catch(ex => res.send(ex));
}

function getTaskGroups(req, res, next) {
    TaskGroup.findAll()
            .then(object => res.json(object))
            .catch(ex => res.send(ex));
}
function updateTaskGroup(req, res, next) {
    const task_group_id = req.params.task_group_id;
    const checklist_id = req.body.checklist_id;

    Checklist.findByPk(checklist_id)
        .then(checklist => {
            if (!checklist) {
                res.status(404).json({ error: "Checklist no encontrado" });
            } else {
                //Aqui en teoria ya encontro el checklist
                TaskGroup.findByPk(task_group_id)
                    .then(taskGroup => {
                        if (!taskGroup) {
                            res.status(404).json({ error: "Grupo de tareas no encontrado" });
                        } else {
                            //Aqui en teoria ya encontró el grupo de tareas
                            const title = req.body.title ? req.body.title : taskGroup.body.title;
                            //const created_at = taskGroup.body.created_at;
                            //const updated_at = req.body.updated_at ?  req.body.updated_at : taskGroup.body.title;

                            taskGroup.update({
                                title: title
                                //created_at: created_at,
                                //updated_at: updated_at
                            })
                            .then(updatedChecklist => res.json(updatedChecklist))
                            .catch(ex => res.send(ex));
                        }
                    })
                    .catch(ex => res.send(ex));
            }
        })
        .catch(ex => res.send(ex));
}




function replaceTaskGroup(req, res, next) {
    const task_group_id = req.params.task_group_id;
    const checklist_id = req.body.checklist_id;

    Checklist.findByPk(checklist_id)
        .then(checklist => {
            if (!checklist) {
                res.status(404).json({ error: "Checklist no encontrado" });
            } else {
                //Aqui en teoria ya encontro el checklist
                TaskGroup.findByPk(task_group_id)
                    .then(taskGroup => {
                        if (!taskGroup) {
                            res.status(404).json({ error: "Grupo de tareas no encontrado" });
                        } else {
                            //Aqui en teoria ya encontró el grupo de tareas
                            const title = req.body.title ? req.body.title : "";
                            //const created_at = taskGroup.body.created_at;
                            //const updated_at = req.body.updated_at ?  req.body.updated_at : taskGroup.body.title;

                            taskGroup.update({
                                title: title
                                //created_at: created_at,
                                //updated_at: updated_at
                            })
                            .then(updatedChecklist => res.json(updatedChecklist))
                            .catch(ex => res.send(ex));
                        }
                    })
                    .catch(ex => res.send(ex));
            }
        })
        .catch(ex => res.send(ex));
}

function deleteTaskGroup(req, res, next) {
    const TaskGroup_id = req.params.TaskGroup_id;
    TaskGroup.destroy({ where: {id: TaskGroup_id}})
    .then(object => res.json(object))
    .catch(ex => res.send(ex));
}

function getTasksGroup() {
    TaskGroup.findAll({include:['task']}).then(objects => res.json(objects)).catch(ex => res.send(ex));
}


module.exports = {createTaskGroup, getTaskGroup, getTaskGroups, updateTaskGroup, replaceTaskGroup, deleteTaskGroup, getTasksGroup}
