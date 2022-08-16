const { Op } = require("sequelize");
const { User } = require("../db")

// ORDER A - Z 
const orderA_z = async() => {
    try{
        const users = await User.findAll({
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
        const users = await User.findAll({
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
        const users = await User.findAll({
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
        const users = await User.findAll({
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
        const user = await User.findAll({
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
        const users = await User.findAll({
            where: {
                job: {[Op.iLike]: job}
            }
        })
        return users
    }catch(e){
        console.log(e)
        return {error: e}
    }
}

// GET ALL PROFESIONALS 
const getAllPro= async() => {
    try{
        const users = await User.findAll()
        return users
    }catch(e){
        console.log(e)
        return {error: e}
    }
}

// GET PROFESIONAL BY ID
const getAllProById= async(id) => {
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
    getAllPro, 
    getAllProById
}




