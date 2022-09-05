const { Router } = require('express');
const functions = require("../../functions/Functions_jobs")
const { Profession } = require("../../db.js")

const jobs = Router()

jobs.get("/", async (req, res, next) => {
    try {
        const jobs = await functions.getAllJobs();
        res.status(200).json(jobs) 
    } catch (error) {
        console.log(error)
            next(error)
    }
})


// RUTA QUE CREA TRABAJOS
jobs.post("/create", async (req, res, next) =>{
    const { name } = req.body;
    const jobsMinuscule = name.toLowerCase();
        try {
            const newJob = await functions.postJobs( jobsMinuscule )
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