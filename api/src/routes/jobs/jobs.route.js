const { Router } = require('express');
const functions = require("../../functions/Functions_user");
const { Profession } = require("../../db.js")

const jobs = Router()

jobs.get("/", (req, res, next) => {
    functions.getAllJobs()
    .then(jobs => {
        return jobs ? res.send(jobs) : `No se encontraron trabajos registrados`
    }, error => {
        return res.status(404).send(error)
    })
    
})


// RUTA QUE CREA TRABAJOS
jobs.post("/create", async (req, res, next) =>{
    const { name } = req.body;
    const jobsMinuscule = name.toLowerCase();
    try {
        const [newJob, created] = await Profession.findOrCreate({
            where:{
                name: jobsMinuscule,
            },
            defaults:{
                name: jobsMinuscule,
            }
        })

        if(!created)  res.status(200).send(`The Profession cannot be created, the Job "${jobsMinuscule}" has already exist`);
        return res.status(201).send(`The Profession "${jobsMinuscule}" created successfully`);
        
    } catch (error) {
        console.log(error)
        next(error)
    }
    
})

module.exports = jobs;