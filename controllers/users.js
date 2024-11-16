const express = require('express');
const bcrypt = require('bcrypt');
const { User,Checklist} = require('../db');
const { where } = require('sequelize');

async function createUser(req, res, next) {
    let google_token = req.body.google_token;
    let email = req.body.email;
    let salt = await bcrypt.genSalt(10);

    const googleTokenHash = await bcrypt.hash(google_token, salt);

    User.create({
        google_token: googleTokenHash,
        email: email,
        salt: salt
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

function getUserChecklists(req, res, next) {
    User.findAll({include:['checklist']}).then(objects => res.json(objects)).catch(ex => res.send(ex));
}

module.exports = {createUser, getUser, getUsers, deleteUser, getUserChecklists}