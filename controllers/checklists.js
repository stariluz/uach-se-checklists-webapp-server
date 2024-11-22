const express = require('express');
const { Checklist, Task } = require('../db');
const { where } = require('sequelize');
const jwt = require('jsonwebtoken');

function createChecklist(req, res, next) {
    const title = req.body.title;
    const due_date = req.body.due_date;
    const completeness = req.body.completeness;
    const url = req.body.url;
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Asegúrate de que JWT_SECRET está configurado.
    const userId = decoded.id; // Asume que el ID del usuario está en el payload del token.

    Checklist.create({
        title: title,
        due_date: due_date,
        completeness: completeness,
        url: url,
        userId: userId,
    }).then(object => res.json(object))
        .catch(ex => res.send(ex));
}

async function getChecklist(req, res, next) {
    console.log("ENTRA")
    const checklist_id = req.params.checklist_id;
    const user_id = req.params.user_id;

    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Asegúrate de que JWT_SECRET está configurado.
    const session_user_id = decoded.id; // Asume que el ID del usuario está en el payload del token.

    const checklist = await Checklist.findByPk(checklist_id, {
        include: [
            {
                model: ChecklistGuest,
                as: 'guest',
                include: [{
                    model: User, as: 'user'
                }],
            },
        ],
    });

    if (!checklist) {
        console.error('Checklist no encontrada'); 
        return res.status(404).json({ msg: 'Checklist no encontrada' });
    }

    // Verificar si el usuario es el propietario
    if (checklist.userId === session_user_id) {
        console.error();
        return res.status(200).json({ checklist });
    }

    // Verificar si el usuario está invitado
    const guest = checklist.guest.find((guest) => guest.user.id === user_id);
    if (guest) {
        return res.status(200).json({ checklist }); 
    }

    // Si no es propietario ni invitado
    return res.status(403).json({ msg: 'No tienes acceso a esta checklist' });
}

function getChecklists(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Asegúrate de que JWT_SECRET está configurado.
        const userId = decoded.id; // Asume que el ID del usuario está en el payload del token.

        Checklist.findAll({ where: { userId } })
            .then(object => res.json(object))
            .catch(ex => res.send(ex));

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error finding checklists by users' });
    }
}


function updateChecklist(req, res, next) {
    const checklist_id = req.params.checklist_id;
    Checklist.findByPk(checklist_id)
        .then(object => {
            const title = req.body.title ? req.body.title : object.body.title;
            const due_date = req.body.due_date ? req.body.due_date : object.body.due_date;
            const completeness = req.body.completeness ? req.body.completeness : object.body.completeness;
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
            const title = req.body.title ? req.body.title : "";
            const due_date = req.body.due_date ? req.body.due_date : "";
            const completeness = req.body.completeness ? req.body.completeness : false;
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
    Checklist.destroy({ where: { id: checklist_id } })
        .then(object => res.json(object))
        .catch(ex => res.send(ex));
}

function getChecklistTasks() {
    Checklist.findAll({ include: ['tasks'] }).then(objects => res.json(objects)).catch(ex => res.send(ex));
}

function getChecklistTaskGroups() {
    Checklist.findAll({ include: ['tasksGroups'] }).then(objects => res.json(objects)).catch(ex => res.send(ex));
}

module.exports = { createChecklist, getChecklist, getChecklists, updateChecklist, replaceChecklist, deleteChecklist, getChecklistTasks, getChecklistTaskGroups }