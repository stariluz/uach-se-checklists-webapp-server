const express = require('express');
const { Rol } = require('../db');

function createRol(req, res, next) {
    const title = req.body.title;
    //const created_at = req.body.created_at;
    //const updated_at = req.body.updated_at;

    Rol.create({
        title : title,
        //created_at: created_at,
        //updated_at: updated_at
    }).then(object => res.json(object))
    .catch(ex => res.send(ex));
}

function getRol(req, res, next) {
    const rol_id = req.params.rol_id;
    Rol.findByPk(rol_id)  
            .then(object => res.json(object))
            .catch(ex => res.send(ex));
}

function getRoles(req, res, next) {
    Rol.findAll()
            .then(objects => res.json(objects))
            .catch(ex => res.send(ex));
}


function updateRol(req, res, next) {
    const rol_id = req.params.rol_id;
    Rol.findByPk(rol_id)
    .then(object => {
        const title = req.body.title ? req.body.title: object.body.title ;
        //const created_at = object.body.created_at;
        //const updated_at = req.body.updated_at ? req.body.complete_at: object.body.updated_at;

        // Revisar las fechas de completado, puede haber fallas de la fecha de actualizado
        object.update({
            title: title
            //created_at:created_at,
            //updated_at:updated_at
        }).then(obj => res.json(obj))
          .catch(ex => res.send(ex))
    }).catch(ex => res.send(ex));
}


function replaceRol(req, res, next) {
    const rol_id = req.params.rol_id;
    Rol.findByPk(rol_id)
    .then(object => {
        const title = req.body.title ? req.body.title : "";
        //const created_at = object.body.created_at ;
        //const updated_at = req.body.updated_at ? req.body.updated_at : object.body.updated_at;

        // Revisar las fechas de completado, puede haber fallas de la fecha de actualizado
        object.update({
            title: title
            //created_at:created_at,
            //updated_at:updated_at
        }).then(obj => res.json(obj))
          .catch(ex => res.send(ex))
    }).catch(ex => res.send(ex));
}

function deleteRol(req, res, next) {
    const rol_id = req.params.rol_id;
    Rol.destroy({ where: {id: rol_id}})
    .then(object => res.json(object))
    .catch(ex => res.send(ex));
}


function getRolPermissions() {
    Rol.findAll({include:['permissions']}).then(objects => res.json(objects)).catch(ex => res.send(ex));
}


module.exports = {createRol, getRol, getRoles, updateRol, replaceRol,deleteRol, getRolPermissions}