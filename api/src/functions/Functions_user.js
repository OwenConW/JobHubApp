const { Op } = require("sequelize");
const { User, Profession } = require("../db")

// GET PROFESSIONAL BY NAME AND FILTER BY PROFESSION AND/OR RATING
const filterByQueris = async(name, profession, rating) => {
    try{
        if(profession){
            // BUSCO EL JOB QUE ME PASAN INCLUYENDO AQUELLOS USUARIOS QUE COINCIDAN CON ESE TRABAJO
            let profesionals = await Profession.findAll({ 
                include: {
                    model: User,
                    attributes: ['id','name','last_Name','image','city', 'postal_code', 'country'],
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
            // me qudo con un array de objetos
            professionalsFilters = name ? professionalsFilters.filter(obj => obj.name.includes(name) || obj.last_Name.includes(name)) 
            : professionalsFilters
            // si me piden a la vez que tambien filtrar por name, filtro dicho array de objs quedandome con los q tengan el name o lastname
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
            // si me piden tmb filtrar por rating ordeno el array basado en el rating por mayor y menor
            return professionalsFilters
        }else{
            let options = {};
            let where = {};
            if(name){
                where[Op.or] = []
                name ? where[Op.or].push({name: {[Op.substring]: name.toLowerCase()}}) : null;
                name ? where[Op.or].push({last_Name: {[Op.substring]: name.toLowerCase()}}) : null; 
            }
            // Si me piden filtrar por name filtro por aquellos que coincidan en el nombre o en el lastname
            /*
            options = { where: {
                [Op.or]: [
                    {name: {
                        [Op.substring]: name.toLowerCase()}
                    },
                    {last_Name: {
                        [Op.substring]: name.toLowerCase()}
                    }
                ]
            }}
            
            */
            // si hay rating agrego a options la peticion para que sequelize ordene por rating ascendente
            rating ?  options.order =  [["rating", rating]] : null;
            /*
            options = { where: {
                ....
            },
              order: [["rating", "ASC"]]
            }
            */
            options.where = where;
            options.include = {
                model: Profession,
                attributes: ['name'],
                through: {attributes: []},
            }
            // incluyo el pedido para que incluya la tabla de profesiones
            /*
              options = { where: {
                ....
            },
              order: [["rating", "ASC"]],
              include = {
                model: Profession,
                attributes: ['name'],
                through: {attributes: []},
               }
            }  
            */
            let user = await User.findAll(options) 
            // Busco los usuarios con los pedidos que sean necesarios
            return user
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
            include: {
                model: Profession,
                attributes: ['name'],
                through: {attributes: []},
            }
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



module.exports = {
    filterByQueris,
    getProffesionalById,
    getAllJobs
}

