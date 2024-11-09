const express = require('express');
const { RolPermission} = require('../db');
const { where } = require('sequelize');

function createRolPermission(req, res, next) {
    //const created_at = req.body.created_at;
    //const updated_at = req.body.updated_at;

    RolPermission.create({
        //created_at: created_at,
        //updated_at: updated_at
    }).then(object => res.json(object))
    .catch(ex => res.send(ex));
}

function getRolPermission(req, res, next) {
    const rolPermission_id = req.params.rolPermission_id;
    RolPermission.findByPk(rolPermission_id)  
            .then(object => res.json(object))
            .catch(ex => res.send(ex));
}

function getRolPermissions(req, res, next) {
    RolPermission.findAll()
            .then(object => res.json(object))
            .catch(ex => res.send(ex));
}

function deleteRolPermission(req, res, next) {
    const RolPermission_id = req.params.RolPermission_id;
    RolPermission.destroy({ where: {id: RolPermission_id}})
    .then(object => res.json(object))
    .catch(ex => res.send(ex));
}

module.exports = {createRolPermission, getRolPermission, getRolPermissions, deleteRolPermission}