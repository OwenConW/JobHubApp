const { Op } = require("sequelize");
const { User, Profession } = require("../db")

// GET PROFESSIONAL BY NAME AND FILTER BY PROFESSION AND/OR RATING
const filterByQueris = async(name, profession, rating) => {  
    try{
        let options = {};
        let where = {};
        name ? where.name = {[Op.substring]: name.toLowerCase()} : null;
        profession ?  where.jobs = {[Op.contains]: profession} : null;
        rating ?  options.order =  [["rating", rating]] : null;
        options.where = where;
        const user = await User.findAll(options)
        return user
    }catch(e){
        console.log(e)
        throw new Error(e)
    }
}

// GET PROFESSIONAL BY ID
const getProffesionalById = async(id) => {
    try{
        const users = await User.findByPk(id * 1)
        return users
    }catch(e){
        console.log(e)
        throw new Error(e)
    } 
}



// GET ALL JOBS
const getAllJobs = async() => {
    try{
        const jobs = Profession.findAll()
        return jobs;
    }catch(e){
        console.log(e)
        throw new Error(e)
    }
}



module.exports = {
    filterByQueris,
    getProffesionalById,
    getAllJobs
}

