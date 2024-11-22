const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../db');

function home(req, res, next) {
    res.render('index', { title: 'Express' });
}

async function login(req, res, next) {
    try {
        const email = req.body.email;
        const google_token = req.body.google_token;

        console.log(email, google_token);

        const user = await User.findOne({ where: { email: email } });

        if (user) {
            const result = await bcrypt.compare(google_token, user.google_token);

            if (result) {
                console.log("Token válido");
                const token = jwt.sign({ id: user.id }, 'acf9a3305987428411d54a7d4b2fdff6', { expiresIn: '14d' });
                return res.status(200).json({
                    msg: "Sesión iniciada correctamente",
                    token: token,
                    user: {
                        id: user.id,
                        picture_url: user.picture_url,
                        email: user.email,
                    }
                });
            } else {
                return res.status(401).json({
                    msg: "Este usuario creo cuenta con otra cuenta de google",
                    obj: null
                });
            }
        } else {
            console.log("Usuario no encontrado");
            return res.status(404).json({
                msg: "Usuario no encontrado",
                obj: null
            });
        }
    } catch (error) {
        console.error("Error al buscar el usuario:", error);
        return res.status(500).json({
            msg: "Error buscando al usuario",
            obj: null
        });
    }
}

async function signup(req, res, next) {
    try {
        const email = req.body.email;
        const picture_url = req.body.picture_url;
        const google_token = req.body.google_token;
        let salt = await bcrypt.genSalt(10);
        const googleTokenHash = await bcrypt.hash(google_token, salt);
        try {
            const existentUser = await User.findOne({ where: { email: email } });
            if (!existentUser) {
                const user = await User.create({
                    google_token: googleTokenHash,
                    picture_url: picture_url,
                    email: email,
                    salt: salt
                });

                if (user) {
                    const token = jwt.sign({ id: user.id }, 'acf9a3305987428411d54a7d4b2fdff6', { expiresIn: '14d' });
                    return res.status(200).json({
                        msg: "Cuenta creada correctamente",
                        token: token,
                        user: {
                            id: user.id,
                            picture_url: user.picture_url,
                            email: user.email,
                        }
                    });
                }
            } else {
                console.log("Usuario ya existente:", existentUser);
                return res.status(500).json({
                    msg: "Usuario ya existente",
                    obj: null
                });
            }
        } catch (error) {
            console.error("Error al traer el usuario:", error);
            return res.status(400).json({
                msg: "Ya tienes un usuario, intenta iniciar sesión.",
                obj: null
            });
        }
    } catch (err) {
        console.error("Error al crear el usuario:", err);
        return res.status(500).json({
            msg: "Error interno del servidor",
            obj: null
        });
    }
}
async function logout(req, res, next) {
    try {
        res.clearCookie('token');  // Suponiendo que el token está almacenado en una cookie

        // También puedes enviar un mensaje confirmando el logout
        return res.status(200).json({
            msg: "Sesión cerrada correctamente"
        });
    } catch (err) {
        console.error("Error al cerrar sesión:", err);
        return res.status(500).json({
            msg: "Error interno del servidor",
            obj: null
        });
    }
}

module.exports = { home, login, signup, logout };