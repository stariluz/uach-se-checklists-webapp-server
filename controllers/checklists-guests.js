const express = require('express');
const { ChecklistGuest, Checklist, User } = require('../db');
const { where, Op } = require('sequelize');

function createChecklistGuest(req, res, next) {
    // @todo Check permissions
    const checklistId = req.body.checklistId;
    const email = req.body.email;

    User.findOne({ where: { email } })
        .then(user => {
            if (!user) {
                throw new Error('User not found');
            }
            const userId = user.id;

            return ChecklistGuest.create({
                role: 'SPECTATOR',
                checklistId: checklistId,
                userId: userId,
            });
        })
        .then(object => res.json(object))
        .catch(ex => {
            console.error(ex);
            res.status(400).send({ error: ex.message });
        });

}

function getChecklistGuests(req, res, next) {
    // @todo Check permissions
    const checklistId = req.params.checklistId;
    ChecklistGuest.findAll({
        where: { checklistId: checklistId, role: { [Op.ne]: 'OWNER' } },
        include: [{
            model: User,
            as: 'user'
        }],
    }).then(obj => {
        res.json(obj);
    }).catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving checklist guest data' });
    });
}

function updateChecklistGuest(req, res, next) {
    // @todo Check permissions
    const checklistGuestId = req.params.checklistGuestId;

    ChecklistGuest.findByPk(
        checklistGuestId
    ).then(checklistGuest => {
        if (!checklistGuest) {
            res.status(404).json({ error: "ChecklistGuest no encontrado" });
        } else {
            const role = req.body.role ? req.body.role : object.role;
            checklistGuest.update({
                role: role
            }).then(obj => {
                return res.json(obj)
            }).catch(ex => {
                console.log("Error", ex);
                return res.json(ex)
            })
        }
    }).catch(ex => {
        console.log("Error", ex);
        return res.json(ex)
    });
}


function deleteChecklistGuest(req, res, next) {
    // @todo Check permissions
    const checklistId = req.params.checklistId;
    const userId = req.params.userId;
    ChecklistGuest.destroy({
        where: { checklistId: checklistId, userId: userId }
    }).then(obj => {
        console.log(obj);
        return res.json(obj)
    }).catch(ex => {
        console.log("Error", ex);
        return res.json(ex)
    })
}


module.exports = { createChecklistGuest, getChecklistGuests, updateChecklistGuest, deleteChecklistGuest, }