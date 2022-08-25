const { Router } = require('express');
const { User, Op } = require("../../db.js")

const verify = Router()


// RUTA QUE VERIFICA SI EXISTE UN USUARIO EN LA BASE DE DATOS
verify.get("/", (req, res, next) => {
    const { mail } = req.query;
    if(mail){
        User.findOne({where: {mail}})
        .then(user => {
            return user ? res.send({user: user, onboarding: false}) : res.send({onboarding: true})
        })
        .catch(e => {
            return res.status(404).send(e)
        })
    }else{
        return res.status(404).send("Please send a mail")
    }

})

module.exports = verify