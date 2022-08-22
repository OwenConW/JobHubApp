const { default: axios } = require('axios');
const { Router } = require('express');
const { User, Profession, Op} = require("../../db.js")
const functions = require("../../functions/Functions_user");
const Review = require('../../models/Review.js');
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
    const { name, last_Name, mail, dni, image, phone, country, city, coordinate, jobs, isProfessional } = req.body;
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
                    phone,
                    country,
                    city,
                    coordinate,
                    isProfessional
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


//RUTA PARA EDITAR EL USUARIO

// users.put('/:id', async (req, res) => {
//     const { id } = req.params
//     const { name, last_Name, description, image, date_of_Birth, mail, dni,  phone, country, city, coordinate, jobs } = req.body;
//     try {
//         const userUpdated = await User.findOne({ where: { id }, include: Profession })

//         const oldJobs = userUpdated.jobs.map(job => job.dataValues.id)
//         await userUpdated.removeProfession(oldJobs)
        
//         const professionDB = await Profession.findAll({ where: { name: { [Op.or]: jobs } } })
//         await userUpdated.addTypes(professionDB.map(job => job.dataValues.id))

//         userUpdated.set({
//             name,
//             last_Name,
//             image,
//             mail,
//             date_of_Birth,
//             dni,
//             description,
//             phone,
//             country,
//             city,
//             coordinate,
//         })
//         await userUpdated.save()
//         res.status(200).send(`The user "${name}" updated successfully`)
//     } catch (error) {
//         console.log(error);
//         res.status(400).send(error)
//     }
// })



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