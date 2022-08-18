const { default: axios } = require('axios');
const { Router } = require('express');
const { User, Op} = require("../../db.js")
const functions = require("../../functions/Functions_user")

const users = Router()


// RUTA QUE TRAE TODOS LOS USUARIOS O FILTRA POR PROFESION Y/O RATING 
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



// RUTA QUE BUSCA O CREA USUARIOS
users.post("/", async (req, res, next) =>{
    const { name, lastName, mail, dni, phone, country, province, city, coordinate, jobs } = req.body
    const nameMinuscule = name.toLowerCase()
    const lastNameMinuscule = lastName.toLowerCase()
    try {
        if( name &&  lastName && mail && country && province && city && coordinate && jobs ){
            const [newUser, created] = await User.findOrCreate({
                where:{
                    mail,
                },
                defaults:{
                    name: nameMinuscule,
                    lastName: lastNameMinuscule,
                    dni,
                    phone,
                    country,
                    province,
                    city,
                    coordinate,
                    jobs,
                }
            })
            if(!created)  res.status(200).send(`The User cannot be created, the email "${mail}" has already been used`)
            return res.status(201).send(`The User "${name}" created successfully`)
        } return res.status(200).send("Missing data")
        
    } catch (error) {
        console.log(error)
        next(error)
    }
    
})


// RUTA QUE BUSCA USUARIOS POR ID
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