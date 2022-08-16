const { Op } = require("sequelize");
const { User, Professional } = require("../db")

// ORDER A - Z 
const orderA_z = async() => {
    try{
        const users = await Professional.findAll({
            order: [
               ["name", "ASC"] 
            ]
        })
        return users
    }catch(e){
        console.log(e)
        return {error: e}
    }
}

// ORDER Z - A
const orderZ_a = async() => {
    try{
        const users = await Professional.findAll({
            order: [
               ["name", "DESC"] 
            ]
        })
        return users
    }catch(e){
        console.log(e)
        return {error: e}
    }
}

// RATING + -
const orderRating_Max_Min = async() => {
    try{
        const users = await Professional.findAll({
            order: [
               ["rating", "ASC"] 
            ]
        })
        return users
    }catch(e){
        console.log(e)
        return {error: e}
    }
}

// RATING - +
const orderRating_Min_Max = async() => {
    try{
        const users = await Professional.findAll({
            order: [
               ["rating", "DESC"] 
            ]
        })
        return users
    }catch(e){
        console.log(e)
        return {error: e}
    }
}

// BY NAME
const filterByName = async(name) => {
    try{
        const user = await Professional.findAll({
           where: {
               Name: {[Op.iLike]: name}
           }
        })
        return user
    }catch(e){
        console.log(e)
        return {error: e}
    }
}

// BY JOB
const filterByJob = async(job) => {
    try{
        const users = await Professional.findAll({
            where: {
                name_job: {[Op.iLike]: job}
            }
        })
        return users
    }catch(e){
        console.log(e)
        return {error: e}
    }
}

// GET ALL PROFESIONALS 
const getAllProfessionals= async() => {
    try{
        const users = await Professional.findAll()
        return users
    }catch(e){
        console.log(e)
        return {error: e}
    }
}

// GET PROFESIONAL BY ID
const getAllPorById= async(id) => {
    try{
        const users = await User.findByPk(id * 1)
        return users
    }catch(e){
        console.log(e)
        return {error: e}
    } 
}

module.export = {
    orderA_z,
    orderZ_a,
    orderRating_Max_Min,
    orderRating_Min_Max,
    filterByName, 
    filterByJob,
    getAllProfessionals, 
    getAllPorById
}

