const express = require('express');
const { Checklist, Task, ChecklistGuest, User, sequelize } = require('../db');
const { where, Sequelize } = require('sequelize');
const jwt = require('jsonwebtoken');

async function createChecklist(req, res, next) {
    const title = req.body.title;
    const due_date = req.body.due_date;
    const completeness = req.body.completeness;
    const url = req.body.url;
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Asegúrate de que JWT_SECRET está configurado.
    const userId = decoded.id; // Asume que el ID del usuario está en el payload del token.

    const t = await sequelize.transaction();  // Inicia la transacción

    try {
        // Crear el Checklist
        const checklist = await Checklist.create({
            title: title,
            due_date: due_date||null,
            completeness: completeness,
            userId: userId,
        }, { transaction: t });

        // Crear el ChecklistGuest para el usuario
        await ChecklistGuest.create({
            role: 'OWNER',
            checklistId: checklist.id,
            userId: userId,  // Usamos el mismo userId para asignar el usuario como invitado
        }, { transaction: t });

        // Commit de la transacción
        await t.commit(); res.json(checklist);
    } catch (ex) {
        // Si algo falla, hacemos un rollback de la transacción
        console.error(ex);
        await t.rollback();
        res.status(500).send(ex);
    }
}

async function getChecklist(req, res, next) {
    const checklistId = req.params.checklistId;
    const userId = req.params.userId;

    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Asegúrate de que JWT_SECRET está configurado.
    const session_userId = decoded.id; // Asume que el ID del usuario está en el payload del token.

    const checklist = await Checklist.findByPk(checklistId, {
        include: [
            {
                model: ChecklistGuest,
                as: 'guest',
                where: { userId },
                include: [{
                    model: User, as: 'user'
                }],
                required: true,
            },
            {
                model: Task,
                as: 'task'
            }
        ],
    });

    if (!checklist) {
        console.error('Checklist no encontrada');
        return res.status(404).json({ msg: 'Checklist no encontrada' });
    }

    // Verificar si el usuario es el propietario
    if (checklist.userId === session_userId) {
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

async function getChecklists(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Asegúrate de que JWT_SECRET está configurado.
    const userId = decoded.id; // Asume que el ID del usuario está en el payload del token.
    Checklist.findAll({
        where: { userId },
        include: [
            {
                model: ChecklistGuest,
                as: 'guest',
                where: { userId },
                include: [{
                    model: User, as: 'user'
                }],
                required: false,
            },
        ],
        // raw: true,
    }).then(obj => {
        // Si hay resultados y hay al menos un 'guest', lo extraemos
        const checklistWithGuest = obj.map(checklist => {
            // Aquí tomamos el primer 'guest' y lo colocamos directamente en el objeto 'checklist'
            if (checklist.guest && checklist.guest.length > 0) {
                checklist.guest = checklist.guest[0];  // Asignamos el primer guest como objeto
            }
            return checklist;
        });
        res.json(checklistWithGuest);  // Lo enviamos al frontend
    }).catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving checklist data' });
    });
}


function updateChecklist(req, res, next) {
    const checklistId = req.params.checklistId;
    Checklist.findByPk(checklistId)
        .then(object => {
            const title = req.body.title ? req.body.title : object.title;
            const due_date = req.body.due_date ? req.body.due_date : object.due_date;
            const completeness = req.body.completeness ? req.body.completeness : object.completeness;
            object.update({
                title: title,
                due_date: due_date,
                completeness: completeness,
            }).then(obj => res.json(obj))
                .catch(ex => res.send(ex))
        }).catch(ex => res.send(ex));
}


function replaceChecklist(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Asegúrate de que JWT_SECRET está configurado.
    const userId = decoded.id; // Asume que el ID del usuario está en el payload del token.

    const checklistId = req.params.checklistId;
    Checklist.findByPk(checklistId)
        .then(object => {
            const title = req.body.title ? req.body.title : "";
            const due_date = req.body.due_date ? req.body.due_date : null;
            const completeness = req.body.completeness ? req.body.completeness : false;
            object.update({
                title: title,
                due_date: due_date||null,
                completeness: completeness,
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

function deleteChecklist(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Asegúrate de que JWT_SECRET está configurado.
    const userId = decoded.id; // Asume que el ID del usuario está en el payload del token.

    const checklistId = req.params.checklistId;
    Checklist.destroy({ where: { id: checklistId } })
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