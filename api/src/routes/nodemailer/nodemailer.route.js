const { default: axios } = require('axios');
const { Router } = require('express');
const transporter  = require("../../functions/mailer")
// const Profession = require('../../models/Profession.js');

const mails = Router()

mails.get("/premiumspam", (req, res, next) => {
    const { mail, name} = req.query
    transporter.sendMail({
        from: `"Job Hub App" <jobhub@gmail.com>`,
        to: mail,
        subject: "Obten nuestro premium hoy!!!",
        html: `
        <h1>Hola ${name}!!!</h1>
        <h2>Ya conoces las ventajas de ser premium en JobHub?</h2>
        <h3>- Ayudan en linea las 24 horas!</h3>
        <h3>- Tu perfil aparecera en las primeras busquedas!</h3>
        <h3>- Alimentaras a tu familia todos los meses sin ningun tipo de problema! xd</h2>
        <h2>Y mucho mas que podras descubrir en nuestra <a href="https://www.instagram.com/owenconw/?hl=es-la">Pagina</a>!</h3>
        <b>Visita nuestra pagina hoy y no te pierdas la oportunidad de obtener tu premium! </b>
        <br></br>
        <br></br>
        <b>Saludos! Job Hub team</b><br></br>
        <b>©JobHubApp 2022</b>
        `
    })
    .then(() => {
        return res.send(`Mail enviado con éxito a ${mail}`)
    })
    .catch(e => {
        console.log(e)
        return res.status(404).send(e)
    }) 
})


mails.get("/welcome", (req, res, next) => {
    const { mail, name} = req.query
    console.log("datos:", mail, name)
    transporter.sendMail({
        from: `"Job Hub App" <jobhub@gmail.com>`,
        to: mail,
        subject: "Bienvenido a JobHubApp!",
        html: `
        <h1>Hola ${name}!!!</h1>
        <br></br>
        
        <b>©JobHubApp 2022</b>
        `
    })
    .then(() => {
        return res.send(`Mail enviado con éxito a ${mail}`)
    })
    .catch(e => {
        console.log(e)
        return res.status(404).send(e)
    }) 
})


module.exports = mails;