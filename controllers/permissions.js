const express = require('express');
const { Permission } = require('../db');
const { where } = require('sequelize');

function createPermission(req, res, next) {
    const description = req.body.description;
    //const created_at = req.body.created_at;
    //const updated_at = req.body.updated_at;

    Permission.create({
        description : description
        //created_at: created_at,
        //updated_at: updated_at
    }).then(object => res.json(object))
    .catch(ex => res.send(ex));
}

function getPermission(req, res, next) {
    const permission_id = req.params.permission_id;
    Permission.findByPk(permission_id)  
            .then(object => res.json(object))
            .catch(ex => res.send(ex));
}

function getPermissions(req, res, next) {
    Permission.findAll()
            .then(object => res.json(object))
            .catch(ex => res.send(ex));
}


function updatePermission(req, res, next) {
    const permission_id = req.params.permission_id;
    Permission.findByPk(permission_id)
    .then(object => {
        const description = req.body.description ? req.body.description: object.body.description ;
        //const created_at = object.body.created_at;
        //const updated_at = req.body.updated_at ? req.body.complete_at: object.body.updated_at;

        // Revisar las fechas de completado, puede haber fallas de la fecha de actualizado
        object.update({
            description: description
            //created_at:created_at,
            //updated_at:updated_at
        }).then(obj => res.json(obj))
          .catch(ex => res.send(ex))
    }).catch(ex => res.send(ex));
}


function replacePermission(req, res, next) {
    const permission_id = req.params.permission_id;
    Permission.findByPk(permission_id)
    .then(object => {
        const description = req.body.description ? req.body.description : "";
        //const created_at = object.body.created_at ;
        //const updated_at = req.body.updated_at ? req.body.updated_at : object.body.updated_at;

        // Revisar las fechas de completado, puede haber fallas de la fecha de actualizado
        object.update({
            description: description
            //created_at:created_at,
            //updated_at:updated_at
        }).then(obj => res.json(obj))
          .catch(ex => res.send(ex))
    }).catch(ex => res.send(ex));
}


function deletePermission(req, res, next) {
    const Permission_id = req.params.Permission_id;
    Permission.destroy({ where: {id: Permission_id}})
    .then(object => res.json(object))
    .catch(ex => res.send(ex));
}


module.exports = {createPermission, getPermission, getPermissions, updatePermission, replacePermission, deletePermission}