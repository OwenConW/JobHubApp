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
    transporter.sendMail({
        from: `"Job Hub App" <jobhub@gmail.com>`,
        to: mail,
        subject: "Bienvenido a JobHubApp!",
        html: `
        <h1>Hola ${name}!!!</h1>
        <br></br>
        <h2>Te agradecemos por navegar por nuestra página web!</h2>
        <h2>Recorda que podes publicar tus empleos y contactar con empleadores a $0 costo!</h2><br></br>
        <h2>Si quieres colaborar y formar parte de la familia JobHub recorda que podes acceder a la membresia premium y a todas sus ventajas</h2>
        <h2>por el costo de ARS$4000 por un año!!</h2>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
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


mails.get("/bienvenido/premium", (req, res, next) => {
    const { mail, name} = req.query
    transporter.sendMail({
        from: `"Job Hub App" <jobhub@gmail.com>`,
        to: mail,
        subject: "Muchas gracias por unirte a la familia JobHub!",
        html: `
        <h1 style="text-transform: capitalize; display: inline">¡¡${name}</h1><h1 style="display: inline"> bienvenido a la familia!!</h1>
        <br></br>
        <h2>Estamos muy contentos y agradecidos con que te hayas unido a nuestro bando!</h2>
        <h2>Recorda que tendras acceso a todos los beneficios durante 1 año!</h2><br></br>
        <h2>Y aun hay mas, la siguiente vez si renuevas tu suscripcion costara tan solo ARS$3000 por haber pasado todo un año compartiendo nuestros ideales.</h2>
        <h2>Esperamos que podamos ayudarte a conseguir mucho trabajo y te volvemos a agradecer ${name}!</h2>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
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