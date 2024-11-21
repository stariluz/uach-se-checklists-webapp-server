const express = require('express')

function createPermission(req, res, next) {
    res.send(`POST => /permissions/create/ => ${req.body.description}`);
}

function getPermission(req, res, next) {
    res.send(`GET => /permissions/${req.params.permission_id}`);
}

function getPermissions() {
    res.send(`GET => /permissions/list`);
}

function updatePermission() {
    cres.send(`PATCH => /permissions/${req.params.permission_id}/update => ${req.body.description}`);
}

function replacePermission() {
    res.send(`PUT => /permissions/${req.params.permission_id}/replace => ${req.body.description}`);
}

function deletePermission() {
    res.send(`DELETE => /permissions/${req.params.permission_id}/delete`);
}

module.exports = {createPermission, getPermission, getPermissions, updatePermission, replacePermission, deletePermission}