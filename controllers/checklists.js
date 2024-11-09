const express = require('express');
const { Checklist, Task} = require('../db');
const { where } = require('sequelize');

function createChecklist(req, res, next) {
    //TO DO: Se necesita definir la relacion de user_id con user
    const title = req.body.title;
    const due_date = req.body.due_date;
    const completeness = req.body.completeness;
    const url = req.body.url;
    //const created_at = req.body.created_at;
    //const updated_at = req.body.updated_at;

    Checklist.create({
        title: title,
        due_date: due_date,
        completeness: completeness,
        url: url
        //created_at: created_at,
        //updated_at: updated_at
    }).then(object => res.json(object))
    .catch(ex => res.send(ex));
}

function getChecklist(req, res, next) {
    const checklist_id = req.params.Checklist_id;
    Checklist.findByPk(checklist_id)  
            .then(object => res.json(object))
            .catch(ex => res.send(ex));
}

function getChecklists(req, res, next) {
    Checklist.findAll()
            .then(object => res.json(object))
            .catch(ex => res.send(ex));
}


function updateChecklist(req, res, next) {
    const checklist_id = req.params.checklist_id;
    Checklist.findByPk(checklist_id)
    .then(object => {
        const title = req.body.title ? req.body.title: object.body.title ;
        const due_date = req.body.due_date ? req.body.due_date: object.body.due_date;
        const completeness = req.body.completeness ? req.body.completeness: object.body.completeness;
        const url = req.body.url ? req.body.url : object.body.url;
        //No se como funciona lo de url, si en caso de actualizar la url es diferente
        // EN caso de cualqueir cosa el url le puse que ia asigne, utilice el que ya tenia
        //const create_at = object.body.create_at;
        //const updated_at = req.body.updated_at ? req.body.updated_at : object.body.updated_at;
        object.update({
            title: title,
            due_date: due_date,
            completeness: completeness,
            url: url
            //create_at: create_at,
            //updated_at:updated_at
        }).then(obj => res.json(obj))
          .catch(ex => res.send(ex))
    }).catch(ex => res.send(ex));
}


function replaceChecklist(req, res, next) {
    const checklist_id = req.params.checklist_id;
    Checklist.findByPk(checklist_id)
    .then(object => {
        const title = req.body.title ? req.body.title: "" ;
        const due_date = req.body.due_date ? req.body.due_date: "";
        const completeness = req.body.completeness ? req.body.completeness: false ;
        const url = req.body.url ? req.body.url : object.body.url;
        //No se como funciona lo de url, si en caso de actualizar la url es diferente
        // EN caso de cualqueir cosa el url le puse que ia asigne, utilice el que ya tenia
        //const create_at = object.body.create_at;
        //const updated_at = req.body.updated_at ? req.body.updated_at : object.body.updated_at;
        object.update({
            title: title,
            due_date: due_date,
            completeness: completeness,
            url: url
            //create_at: create_at,
            //updated_at:updated_at
        }).then(obj => res.json(obj))
          .catch(ex => res.send(ex))
    }).catch(ex => res.send(ex));
}

function deleteChecklist(req, res, next) {
    const checklist_id = req.params.checklist_id;
    Checklist.destroy({ where: {id: checklist_id}})
    .then(object => res.json(object))
    .catch(ex => res.send(ex));
}

function getChecklistTasks() {
    Checklist.findAll({include:['tasks']}).then(objects => res.json(objects)).catch(ex => res.send(ex));
}

function getChecklistTaskGroups() {
    Checklist.findAll({include:['tasksGroups']}).then(objects => res.json(objects)).catch(ex => res.send(ex));
}

module.exports = {createChecklist, getChecklist, getChecklists, updateChecklist, replaceChecklist, deleteChecklist, getChecklistTasks, getChecklistTaskGroups}