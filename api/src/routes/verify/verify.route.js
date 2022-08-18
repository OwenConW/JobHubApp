const { Router } = require('express');
const { User, Op} = require("../../db.js")

const verify = Router()


// RUTA QUE VERIFICA SI EXISTE UN USUARIO EN LA BASE DE DATOS
verify.get("/", (req, res, next) => {
    const { mail } = req.body;
    if(mail){
        User.findOne({where: {mail}})
        .then(user => {
            return user ? res.send(true) : res.send(false)
        })
        .catch(e => {
            console.log(e)
            return res.status(404).send(e)
        })
    }else{
        return res.status(404).send("Please send a mail")
    }

})


module.exports = verify