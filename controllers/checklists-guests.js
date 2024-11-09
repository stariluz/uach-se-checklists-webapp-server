const express = require('express');
const { ChecklistGuest,Checklist, User} = require('../db');
const { where } = require('sequelize');
const checklistGuest = require('../models/checklist-guest');

function createChecklistGuest(req, res, next) {
    // TO DO: Definir las relaciones entre el checklistGuest, su userid y rolid 
    // const created_at = req.body.created_at;
    // const updated_at = req.body.updated_at;

    ChecklistGuest.create({
        // created_at: created_at,
        // updated_at: updated_at
    }).then(object => res.json(object))
    .catch(ex => res.send(ex));
}

function getChecklistGuest(req, res, next) {
    const ChecklistGuest_id = req.body.ChecklistGuest_id;
    ChecklistGuest.findByPk(ChecklistGuest_id)  
            .then(object => res.json(object))
            .catch(ex => res.send(ex));
}

function getChecklistGuests(req, res, next) {
    ChecklistGuest.findAll()
            .then(object => res.json(object))
            .catch(ex => res.send(ex));
}

function updateChecklistGuest(req, res, next) {
    const checklist_guest_id = req.params.checklist_guest_id;
    const checklist_id = req.body.checklist_id;
    const user_id = req.body.user_id;
    const rol_id = req.body.rol_id;

    // Buscar el Checklist primero
    Checklist.findByPk(checklist_id)
        .then(checklist => {
            if (!checklist) {
                res.status(404).json({ error: "Checklist no encontrado" });
            } else {
                // Luego buscar el User
                User.findByPk(user_id)
                    .then(user => {
                        if (!user) {
                            res.status(404).json({ error: "User no encontrado" });
                        } else {
                            // Después buscar el Rol
                            Rol.findByPk(rol_id)
                                .then(rol => {
                                    if (!rol) {
                                        res.status(404).json({ error: "Rol no encontrado" });
                                    } else {
                                        // Finalmente buscar y actualizar ChecklistGuest
                                        ChecklistGuest.findByPk(checklist_guest_id)
                                            .then(checklistGuest => {
                                                if (!checklistGuest) {
                                                    res.status(404).json({ error: "ChecklistGuest no encontrado" });
                                                } else {
                                                    // Actualizar ChecklistGuest
                                                    // const created_at = checklistGuest.created_at;
                                                    // const updated_at = req.body.updated_at ? req.body.updated_at : checklistGuest.body.updated_at;

                                                    checklistGuest.update({
                                                        // created_at: created_at,
                                                        // updated_at: updated_at
                                                    })
                                                    .then(updatedChecklistGuest => res.json(updatedChecklistGuest))
                                                    .catch(ex => res.send(ex));
                                                }
                                            })
                                            .catch(ex => res.send(ex));
                                    }
                                })
                                .catch(ex => res.send(ex));
                        }
                    })
                    .catch(ex => res.send(ex));
            }
        })
        .catch(ex => res.send(ex));
}



function replaceChecklistGuest(req, res, next) {
    const checklist_guest_id = req.params.checklist_guest_id;
    const checklist_id = req.body.checklist_id;
    const user_id = req.body.user_id;
    const rol_id = req.body.rol_id;

    // Buscar el Checklist primero
    Checklist.findByPk(checklist_id)
        .then(checklist => {
            if (!checklist) {
                res.status(404).json({ error: "Checklist no encontrado" });
            } else {
                // Luego buscar el User
                User.findByPk(user_id)
                    .then(user => {
                        if (!user) {
                            res.status(404).json({ error: "User no encontrado" });
                        } else {
                            // Después buscar el Rol
                            Rol.findByPk(rol_id)
                                .then(rol => {
                                    if (!rol) {
                                        res.status(404).json({ error: "Rol no encontrado" });
                                    } else {
                                        // Finalmente buscar y actualizar ChecklistGuest
                                        ChecklistGuest.findByPk(checklist_guest_id)
                                            .then(checklistGuest => {
                                                if (!checklistGuest) {
                                                    res.status(404).json({ error: "ChecklistGuest no encontrado" });
                                                } else {
                                                    // Actualizar ChecklistGuest
                                                    const title = req.body.title ? checklistGuest.title : "";
                                                    const created_at = checklistGuest.created_at;
                                                    const updated_at = req.body.updated_at ? req.body.updated_at : checklistGuest.body.updated_at;

                                                    checklistGuest.update({
                                                        title: title,
                                                        created_at: created_at,
                                                        updated_at: updated_at
                                                    })
                                                    .then(updatedChecklistGuest => res.json(updatedChecklistGuest))
                                                    .catch(ex => res.send(ex));
                                                }
                                            })
                                            .catch(ex => res.send(ex));
                                    }
                                })
                                .catch(ex => res.send(ex));
                        }
                    })
                    .catch(ex => res.send(ex));
            }
        })
        .catch(ex => res.send(ex));
}


function deleteChecklistGuest(req, res, next) {
    const ChecklistGuest_id = req.params.ChecklistGuest_id;
    ChecklistGuest.destroy({ where: {id: ChecklistGuest_id}})
    .then(object => res.json(object))
    .catch(ex => res.send(ex));
}

function getChecklistGuestUsers() {
    Checklist.findAll({include:['users']}).then(objects => res.json(objects)).catch(ex => res.send(ex));
}

module.exports = {createChecklistGuest, getChecklistGuest, getChecklistGuests, updateChecklistGuest, replaceChecklistGuest, deleteChecklistGuest, getChecklistGuestUsers}