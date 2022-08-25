const { default: axios } = require('axios');
const { Router } = require('express');
const { Message } = require("../../db.js")
const { Op } = require("sequelize")
const functions = require("../../functions/Functions_user");
const Review = require('../../models/Review.js');
// const Profession = require('../../models/Profession.js');

const message = Router()

message.post("/", (req, res, next) => {
    const {conversationId, sender, text } = req.body;
    Message.create({
        conversationId: conversationId * 1,
            sender: sender * 1,
            text
    })
    .then(message => {
        return res.send(message)
    })
    .catch(e => {
        console.log(e)
        return res.send(e)
    })
})

message.get("/:conversationId", (req, res, next) => {
    Message.findAll({
        where: {
            conversationId: {
                [Op.eq]: req.params.conversationId * 1
            },
        }, 
    })
    .then(messages => {
        return res.send(messages)
    }, e => {
        console.log(e)
        return res.send(e)
    })
})


module.exports = message;