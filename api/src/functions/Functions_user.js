const { Op } = require("sequelize");
const { User } = require("../db")


const filterByQueris = async(name, profession, rating) => {  
    try{
        let options = {};
        let where = {};
        name ? where.name = {[Op.iLike]: name} : null;
        profession ?  where.profession = {[Op.or]: profession} : null;
        rating ?  options.order =  [["rating", rating]] : null;
        options.where = where;
        const user = await User.findAll(options)
        return user
    }catch(e){
        console.log(e)
        throw new Error(e)
    }
}

// GET PROFESIONAL BY ID
const getProffesionalById= async(id) => {
    try{
        const users = await User.findByPk(id * 1)
        return users
    }catch(e){
        console.log(e)
        throw new Error(e)
    } 
}


module.export = {
    filterByQueris,
    getProffesionalById
}

