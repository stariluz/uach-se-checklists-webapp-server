const express = require('express')

function createUser(req, res, next) {
    res.send(`POST => /users/create/ => ${req.body.email} ${req.body.google-authoization}`);
}

function getUser(req, res, next) {
    res.send(`GET => /users/${req.params.user_id}`);
}

function getUsers() {
    res.send(`GET => /users/:user_id/list/`);
}

function deleteUser() {
    res.send(`DELETE => /users/${req.params.user_id}/delete/ => ${req.body.email}`);
}

function getUserChecklists() {
    res.send(`GET => /users/${req.params.user_id}/checklists/`);
}

module.exports = {createUser, getUser, getUsers, deleteUser, getUserChecklists}