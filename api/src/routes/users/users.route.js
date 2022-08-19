const { default: axios } = require('axios');
const { Router } = require('express');
const { User, Profession, Op} = require("../../db.js")
const functions = require("../../functions/Functions_user");
// const Profession = require('../../models/Profession.js');

const users = Router()


// RUTA QUE TRAE TODOS LOS USUARIOS O FILTRA POR PROFESION Y/O RATING 
users.get("/", (req, res, next) => {
    const {name, rating, profession } = req.query;
    functions.filterByQueris(name, profession, rating)
    .then(professionals => {
        return res.status(200).send(professionals);
    })
    .catch(e => {
        return res.status(404).send(e);
    })
})



// RUTA QUE BUSCA O CREA USUARIOS
users.post("/", async (req, res, next) =>{
    const { name, last_Name, mail, dni, image, phone, country, postal_code, city, coordinate, jobs } = req.body;
    const nameMinuscule = name.toLowerCase();
    const lastNameMinuscule = last_Name.toLowerCase();
    //const jobsMinuscule = jobs.toLowerCase();
    try {
        if( name &&  last_Name && mail && country  && city && coordinate && jobs ){
            const [newUser, created] = await User.findOrCreate({
                where:{
                    mail,
                },
                defaults:{
                    name: nameMinuscule,
                    last_Name: lastNameMinuscule,
                    image,
                    dni,
                    postal_code,
                    phone,
                    country,
                    city,
                    coordinate,
                    
                }
            })
            let jobFind = await Profession.findAll({
                where:{
                    name:{
                        [Op.or]: jobs
                    }
                }
            })
            await newUser.addProfession(jobFind)

            if(!created)  res.status(200).send(`The User cannot be created, the email "${mail}" has already been used`);
            return res.status(201).send(`The User "${name}" created successfully`);
        } return res.status(200).send("Missing data");
        
    } catch (error) {
        console.log(error)
        next(error)
    }
    
})

// RUTA QUE CREA RESEÑAS


// RUTA QUE BUSCA USUARIOS POR ID
users.get("/:id", (req, res, next) => {
    const { id } = req.params;
    functions.getProffesionalById(id * 1)
    .then(professional => {
        return res.status(200).send(professional);
    })
    .catch(e => {
        return res.status(404).send(e);
    })
})


module.exports = users;