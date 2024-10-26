const express = require('express');
const { Rol } = require('../db');
const { where } = require('sequelize');

function createRol(req, res, next) {
    const title = req.body.title;
    const created_at = req.body.created_at;
    const updated_at = req.body.updated_at;

    Rol.create({
        title : title,
        created_at: created_at,
        updated_at: updated_at
    }).then(object => res.json(object))
    .catch(ex => res.send(ex));
}

function getRol(req, res, next) {
    const CheckGuest_id = req.params.Rol_id;
    Rol.findByPk(CheckGuest_id)  
            .then(object => res.json(object))
            .catch(ex => res.send(ex));
}

function getRols(req, res, next) {
    Rol.findAll()
            .then(object => res.json(object))
            .catch(ex => res.send(ex));
}

function deleteRol(req, res, next) {
    const Rol_id = req.params.Rol_id;
    Rol.destroy({ where: {id: Rol_id}})
    .then(object => res.json(object))
    .catch(ex => res.send(ex));
}


module.exports = {createRol, getRol, getRols, deleteRol}