const express = require('express')

function createRolPermission(req, res, next) {
    res.send(`POST => /rol-permissions/create/ => ${req.body.rol_id} ${req.body.permission_id}`);
}

function getRolPermission(req, res, next) {
    res.send(`GET => /rol-permissions/${req.params.rol_permission_id}`);
}

function getRolPermissions() {
    res.send(`GET => /rol-permissions/list`);
}

function deleteRolPermission() {
    res.send(`DELETE => /rol-permissions/${req.params.rol_permission_id}/delete`);
}

module.exports = {createRolPermission, getRolPermission, getRolPermissions, deleteRolPermission}