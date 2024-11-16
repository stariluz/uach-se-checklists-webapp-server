const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../db');

function home(req, res, next) {
    res.render('index', { title: 'Express' });
}

function login(req, res, next) {
    const email = req.body.email;
    const google_token = req.body.google_token;

    console.log("Email:", email);
    console.log("Google Token:", google_token);

    User.findOne({ where: { email: email } }).then(user => {
        if (user) {
            console.log("Usuario encontrado:", user);
            bcrypt.compare(google_token, user.google_token, (err, result) => {
                if (err) {
                    console.error("Error al comparar el token:", err);
                    return res.status(500).json({
                        msg: "Error interno del servidor",
                        obj: null
                    });
                }
                if (result) {
                    console.log("Token válido");
                    const token = jwt.sign({ id: user.id }, 'acf9a3305987428411d54a7d4b2fdff6', { expiresIn: '1h' });
                    return res.status(200).json({
                        msg: "Sesión iniciada correctamente",
                        token: token
                    });
                } else {
                    console.log("Token inválido");
                    return res.status(401).json({
                        msg: "Usuario y/o contraseña incorrectos",
                        obj: null
                    });
                }
            });
        } else {
            console.log("Usuario no encontrado");
            return res.status(404).json({
                msg: "Usuario no encontrado",
                obj: null
            });
        }
    }).catch(err => {
        console.error("Error al buscar el usuario:", err);
        return res.status(500).json({
            msg: "Error interno del servidor",
            obj: null
        });
    });
}

module.exports = { home, login };