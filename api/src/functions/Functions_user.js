const { Op } = require("sequelize");
const { User, Profession, Review, Orders, Claims } = require("../db");



const filterByQueris = async(name, profession, rating) => {
    try{
        if(profession){
            let profesionals = await Profession.findAll({ 
                include: {
                    model: User,
                    attributes: ['id','name','last_Name','image','city', 'coordinate', 'country', 'isActive', 'isProfessional', 'isAdmin', 'isBanned', 'isPremium','rating'],
                    through: {attributes: []},
                },
                where: {
                    name: {
                        [Op.substring]: profession.toLowerCase(),
                    },
                },
            })
            let professionalsFilters = [...profesionals[0].users.map(obj => {
                return {
                    ...obj.dataValues,
                    professions: [{name: profession}]
                }
            })]
            professionalsFilters = name ? professionalsFilters.filter(obj => obj.name.includes(name) || obj.last_Name.includes(name)) 
            : professionalsFilters
            professionalsFilters = rating ? professionalsFilters.sort(function (x, y){  
                if(x.rating > y.rating){
                    return -1 
                }
                if(x.rating < y.rating){
                    return 1;
                }
                return 0
            })
            :  professionalsFilters
            professionalsFilters = professionalsFilters.sort(function(x, y){  
                if(x.isPremium){
                    return -1 
                }
                if(!x.isPremium){
                    return 1;
                }
                return 0
            })
            return professionalsFilters.filter(obj => obj.isProfessional === true && obj.isActive === true && obj.isBanned === false)
        }else{
            let options = {};
            let where = {};
            if(name){
                where[Op.or] = []
                name ? where[Op.or].push({name: {[Op.substring]: name.toLowerCase()}}) : null;
                name ? where[Op.or].push({last_Name: {[Op.substring]: name.toLowerCase()}}) : null; 
            }
            options.where = where;
            options.include = {
                model: Profession,
                attributes: ['name'],
                through: {attributes: []},
            }
            let user = await User.findAll(options) 
            user = user.sort(function(x, y){  
                if(x.isPremium){
                    return -1 
                }
                if(!x.isPremium){
                    return 1;
                }
                return 0
            })
            user = rating ? user.sort(function (x, y){  
                if(x.rating > y.rating){
                    return -1 
                }
                if(x.rating < y.rating){
                    return 1;
                }
                return 0
            })
            : user
            return user.filter(obj => obj.isProfessional === true && obj.isActive === true && obj.isBanned === false)
        }
    }catch(e){
        console.log(e)
        throw new Error(e)
    }
}

// GET ALL USER ADMIN
const getAllUsersAdmin = async ( name, last_Name, profession ) => {

    let options = {}

    if (name && last_Name && profession){
        options = {
            where: {          
                name: { [Op.substring]: `%${name}%` },
                last_Name: { [Op.substring]: `%${last_Name}%` },
            },
            include: { 
                model: Profession,
                attributes: ['name'],
                through: {attributes: []},
                where: { 
                    name: { [Op.substring]: `%${profession}%` }
                }
            },
        }
    }
    else if (name && last_Name){
        options = {
            where: {          
                name: { [Op.substring]: `%${name}%` },
                last_Name: { [Op.substring]: `%${last_Name}%` },
            },
            include: { 
                model: Profession,
                attributes: ['name'],
                through: {attributes: []},
            },
        }
    }
    else if (last_Name && profession){
        options = {
            where: {          
                last_Name: { [Op.substring]: `%${last_Name}%` },
            },
            include: { 
                model: Profession,
                attributes: ['name'],
                through: {attributes: []},
                where: { 
                    name: { [Op.iLike]: `%${profession}%` }
                }
            },
        }
    }
    else if (name && profession){
        options = {
            where: {          
                name: { [Op.substring]: `%${name}%` },
                
            },
            include: { 
                model: Profession,
                attributes: ['name'],
                through: {attributes: []},
                where: { 
                    name: { [Op.substring]: `%${profession}%` }
                }
            },
        }
    }
    else if (name){
        options = {
            where: {          
                name: { [Op.substring]: `%${name}%` },
            },
            include: { 
                model: Profession,
                attributes: ['name'],
                through: {attributes: []},
            },
        }
    }
    else if (last_Name){
        options = {
            where: {          
                last_Name: { [Op.substring]: `%${last_Name}%` },
            },
            include: { 
                model: Profession,
                attributes: ['name'],
                through: {attributes: []},
            },
        }
    }
    else if (profession){
        options = {
            include: { 
                model: Profession,
                attributes: ['name'],
                through: {attributes: []},
                where: { 
                    name: { [Op.substring]: `%${profession}%` }
                }
            },
        }
    }
    return options
}

// GET PROFESSIONAL BY ID
const getProffesionalById = async(id) => {
    try{
        const users = await User.findByPk(id * 1, {
            include:[
                {
                    model: Profession,
                    attributes: ['name'],
                    through: {attributes: []},
                },{
                    model: Review,
                    attributes: ['id_user_client','id_orders','feedback_client', 'rating'],
                    through: {attributes: []},
                },{
                    model: Orders,
                    attributes: ['id_user_client','description', 'complete'],
                    through: {attributes: []},
                },{
                    model: Claims,
                    attributes: ['id_user_client','feedback_claims', 'date_created'],
                    through: {attributes: []},
                },
            ]
        })
        return users
    }catch(error){
        console.log(error)
        throw error
    } 
}



// GET ALL JOBS
const getAllJobs = async() => {
    try{
        const jobs = Profession.findAll()
        return jobs;
    }catch(error){
        console.log(error)
        throw error
    }
}

// UPDATE RATING
const updateRating = async(id, rating) => {
    try {
        await User.update({
            rating,
        },{
            where:{
                id,
            }
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}

// UPDATE ISPREMIUM
const updatePremium = async(id, isPremium) => {
    try {
        await User.update({
            isPremium,
        },{
            where:{
                id,
            }
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}

//UPDATE ISACTIVE
const destroyUser = async(id, isActive) => {
    try {
        await User.update({
            isActive
        },{
            where:{
                id,
            }
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}

//UPDATE USER SIN JOBS
const updateUserNoJobs = async (id, name, last_Name, date_of_Birth, image, dni, mail, phone, description, country, city, coordinate, street, address, isProfessional ) => {
    try {
        await User.update({
            name,
            last_Name,
            date_of_Birth,
            image,
            dni,
            mail,
            phone,
            description,
            country,
            city,
            coordinate,
            street,
            address,
            isProfessional,

        },{
            where:{
                id,
            }
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}

// //PRUEBA PARA UPDATEAR UN FUTURO ARRAY DE "MIS TRABAJOS"
const updatePhotos = async (id, obj) =>{
    try {
        await User.update({
            photo_gallery: obj
        },{
            where:{
                id,
            }
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}





module.exports = {
    filterByQueris,
    getProffesionalById,
    getAllJobs,
    updateRating,
    updatePremium,
    destroyUser,
    updateUserNoJobs,
    getAllUsersAdmin,
    updatePhotos

}

