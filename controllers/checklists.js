const express = require('express');
const { Checklist,Task} = require('../db');
const { where } = require('sequelize');

function createChecklist(req, res, next) {
    const title = req.body.title;
    const due_date = req.body.due_date;
    const completeness = req.body.completeness;
    const url = req.body.url;
    const created_at = req.body.created_at;
    const updated_at = req.body.updated_at;

    Checklist.create({
        title: title,
        due_date: due_date,
        completeness: completeness,
        url: url,
        created_at: created_at,
        updated_at: updated_at
    }).then(object => res.json(object))
    .catch(ex => res.send(ex));
}

function getChecklist(req, res, next) {
    const CheckGuest_id = req.params.Checklist_id;
    Checklist.findByPk(CheckGuest_id)  
            .then(object => res.json(object))
            .catch(ex => res.send(ex));
}

function getChecklists(req, res, next) {
    Checklist.findAll()
            .then(object => res.json(object))
            .catch(ex => res.send(ex));
}

function deleteChecklist(req, res, next) {
    const Checklist_id = req.params.Checklist_id;
    Checklist.destroy({ where: {id: Checklist_id}})
    .then(object => res.json(object))
    .catch(ex => res.send(ex));
}

function getChecklistTask() {
    Checklist.findAll({include:['task']}).then(objects => res.json(objects)).catch(ex => res.send(ex));
    }

module.exports = {createChecklist, getChecklist, getChecklists, deleteChecklist, getChecklistTask}