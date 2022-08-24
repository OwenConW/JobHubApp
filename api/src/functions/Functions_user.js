const { Op } = require("sequelize");
const { User, Profession, Review } = require("../db")

// GET PROFESSIONAL BY NAME AND FILTER BY PROFESSION AND/OR RATING
const filterByQueris = async(name, profession, rating) => {
    try{
        if(profession){
            let profesionals = await Profession.findAll({ 
                include: {
                    model: User,
                    attributes: ['id','name','last_Name','image','city', 'coordinate', 'country', 'isActive', 'isProfessional', 'isAdmin', 'isBanned', 'isPremium'],
                    through: {attributes: []},
                },
                where: {
                    name: {
                        [Op.substring]: profession.toLowerCase(),
                    },
                },
            })
            let professionalsFilters = [...profesionals[0].Users.map(obj => {
                return {
                    ...obj.dataValues,
                    profession: [{name: profession}]
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
            rating ?  options.order =  [["rating", rating]] : null;
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
            return user.filter(obj => obj.isProfessional === true && obj.isActive === true && obj.isBanned === false)
        }
    }catch(e){
        console.log(e)
        throw new Error(e)
    }
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
                },
                {
                    model: Review,
                    attributes: ['id_orders','feedback_client', 'rating'],
                    through: {attributes: []},
                }
            ]
        })
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




module.exports = {
    filterByQueris,
    getProffesionalById,
    getAllJobs,
    updateRating
}

