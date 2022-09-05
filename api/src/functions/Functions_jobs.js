const { User, Profession } = require("../db")

// FUNCION PARA CREAR TRABAJOS
const postJobs = async (jobsMinuscule) =>{
    try {
        const [newJob, created] = await Profession.findOrCreate({
            where:{
                name: jobsMinuscule,
            },
            defaults:{
                name: jobsMinuscule,
            }
        })

        if(!created)  return `The Profession cannot be created, the Job "${jobsMinuscule}" has already exist`;
        return `The Profession "${jobsMinuscule}" created successfully`;
    } catch (error) {
        console.log(error)
        throw error
    }
}

// GET ALL JOBS
const getAllJobs = async() => {
    try{
        const jobs = await Profession.findAll()
        return jobs;
    }catch(error){
        console.log(error)
        throw error
    }
}

module.exports = {
    postJobs,
    getAllJobs,
}

