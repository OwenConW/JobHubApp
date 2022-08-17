const { default: axios } = require('axios');
const { Router } = require('express');
const { User, Op} = require("../../db.js")
const functions = require("../../functions/Functions_user")

const users = Router()

users.get("/", (req, res, next) => {
    const {name, profession, rating} = req.query;
    functions.filterByQueris(name, profession, rating)
    .then(professionals => {
        return res.status(200).send(professionals)
    })
    .catch(e => {
        return res.status(404).send(e)
    })
})

users.get("/:id", (req, res, next) => {
    const { id } = req.params
    functions.getProffesionalById(id * 1)
    .then(professional => {
        return res.status(200).send(professional)
    })
    .catch(e => {
        return res.status(404).send(e)
    })
})

module.exports = users;