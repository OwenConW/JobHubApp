const { Router } = require('express');
const functions = require("../../functions/Functions_user");
const functionsJob = require("../../functions/Functions_jobs")
const { Profession } = require("../../db.js")

const jobs = Router()

jobs.get("/", (req, res, next) => {
    functions.getAllJobs()
    .then(jobs => {
        return jobs ? res.status(200).send(jobs) : `No se encontraron trabajos registrados`
    }, error => {
        return res.status(404).send(error)
    })
    
})


// RUTA QUE CREA TRABAJOS
jobs.post("/create", async (req, res, next) =>{
    const { name } = req.body;
    const jobsMinuscule = name.toLowerCase();
        try {
            const newJob = await functionsJob.postJobs( jobsMinuscule )
            res.status(201).send(newJob)
        } catch (error) {
            console.log(error)
            next(error)
        }
})

// RUTA PARA ELIMINAR TRABAJOS
jobs.delete("/admin/:id", async (req, res, next)=>{
    const {id} = req.params
    try{
        await Profession.destroy({
            where:{id:id}
        }) 
        res.status(201).send("The Profession was successfully deleted")
    } catch (error) {
        next(error)
    }
})

module.exports = jobs;