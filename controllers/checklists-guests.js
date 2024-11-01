const express = require('express');
const { ChecklistGuest} = require('../db');
const { where } = require('sequelize');

function createGuestToChecklist(req, res, next) {
    const created_at = req.body.created_at;
    const updated_at = req.body.updated_at;

    ChecklistGuest.create({
        created_at: created_at,
        updated_at: updated_at
    }).then(object => res.json(object))
    .catch(ex => res.send(ex));
}

function getChecklistGuest(req, res, next) {
    const ChecklistGuest_id = req.params.ChecklistGuest_id;
    ChecklistGuest.findByPk(ChecklistGuest_id)  
            .then(object => res.json(object))
            .catch(ex => res.send(ex));
}

function getChecklistGuests(req, res, next) {
    ChecklistGuest.findAll()
            .then(object => res.json(object))
            .catch(ex => res.send(ex));
}

function deleteChecklistGuest(req, res, next) {
    const ChecklistGuest_id = req.params.ChecklistGuest_id;
    ChecklistGuest.destroy({ where: {id: ChecklistGuest_id}})
    .then(object => res.json(object))
    .catch(ex => res.send(ex));
}

module.exports = {createGuestToChecklist, getChecklistGuest, getChecklistGuests, deleteChecklistGuest}