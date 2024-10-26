const express = require('express');
const { User,Checklist} = require('../db');
const { where } = require('sequelize');

function createUser(req, res, next) {
    const google_token = req.body.google_token;
    const email = req.body.email;
    const created_at = req.body.created_at;
    const updated_at = req.body.updated_at;

    User.create({
        google_token: google_token,
        email: email,
        created_at: created_at,
        updated_at: updated_at
    }).then(object => res.json(object))
    .catch(ex => res.send(ex));
}

function getUser(req, res, next) {
    const user_id = req.params.user_id;
    User.findByPk(user_id)  
            .then(object => res.json(object))
            .catch(ex => res.send(ex));
}

function getUsers(req, res, next) {
    User.findAll()
            .then(object => res.json(object))
            .catch(ex => res.send(ex));
}

function deleteUser(req, res, next) {
    const user_id = req.params.user_id;
    User.destroy({ where: {id: user_id}})
    .then(object => res.json(object))
    .catch(ex => res.send(ex));
}

function getUserChecklists() {
    User.findAll({include:['checklist']}).then(objects => res.json(objects)).catch(ex => res.send(ex));
    }

module.exports = {createUser, getUser, getUsers, deleteUser, getUserChecklists}