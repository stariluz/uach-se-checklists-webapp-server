const express = require('express')

function createRole(req, res, next) {
    res.send(`POST => /roles/create/ => ${req.body.title}`);
}

function getRole(req, res, next) {
    res.send(`GET => /roles/${req.params.rol_id}`);
}

function getRoles() {
    res.send(`GET => /roles/list`);
}

function updateRole() {
    cres.send(`PATCH => /roles/${req.params.rol_id}/update => ${req.body.title}`);
}

function replaceRole() {
    res.send(`PUT => /roles/${req.params.rol_id}/replace => ${req.body.title}`);
}

function deleteRole() {
    res.send(`DELETE => /roles/${req.params.rol_id}/delete`);
}

function getRolePermissions() {
    res.send(`GET => /roles/${req.params.rol_id}/permissions`);
}

module.exports = {createRole, getRole, getRoles, updateRole, replaceRole, deleteRole, getRolePermissions}