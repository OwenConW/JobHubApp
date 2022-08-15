const { default: axios } = require('axios');
const { Router } = require('express');
const { User, Op} = require("../../db.js")

const users = Router()


users.get("/", (req, res, next) => {
    User.findAll()
    .then(us => {
        return res.send(us)
    })
})

module.exports = users;