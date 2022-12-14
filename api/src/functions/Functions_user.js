const { Op } = require("sequelize");
const { User, Profession, Review, Orders, Claims } = require("../db");


const allUsers = async () =>{
    try {
        const allUsers = await User.findAll({
            include: {
                model: Profession,
                attributes: ['name'],
                through: {attributes: []},
            },
        })
        return allUsers
    
    } catch (error) {
        console.log(error)
        throw error
    }
}

const allUsersActives = async() =>{
    try {
        const allUsers = await User.findAll({
            where:{
                isActive: 'true',
                isBanned: 'false',
            },
            include: {
                model: Profession,
                attributes: ['name'],
                through: {attributes: []},
            },
        })

        return allUsers.sort(function(x, y){  
            if(x.isPremium){
                return -1 
            }
            if(!x.isPremium){
                return 1;
            }
            return 0
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}

const allProfessionalActives = async() =>{
    try {
        const allUsers = await User.findAll({
            where:{
                isActive: 'true',
                isBanned: 'false',
                isProfessional: 'true',
            },
            include: {
                model: Profession,
                attributes: ['name'],
                through: {attributes: []},
            },
        })
        return allUsers
    } catch (error) {
        console.log(error)
        throw error
    }
}

const searchDni = async(dni) =>{
    try {
        const findDni = await User.findOne({
            where:{ dni: dni }
        })
        if(findDni !== null) return "El DNI ya esta registrado en nuestra base de datos"
        return "El DNI ingresado puede ser utilizado"
    } catch (error) {
        console.log(error)
        throw error
    }
}

const searchMail = async(mail) =>{
    try {
        const findMail = await User.findOne({
            where:{ mail: mail }
        })
        if(findMail !== null) return "El DNI ya esta registrado en nuestra base de datos"
        return "El DNI ingresado puede ser utilizado"
    } catch (error) {
        console.log(error)
        throw error
    }
}


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
    }catch(error){
        console.log(error)
        throw error
    }
}

// GET ALL USER ADMIN
const getAllUsersAdmin = async ( name, last_Name, profession ) => {
    try {
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
    } catch (error) {
        console.log(error)
        throw error
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

// POST USERS
const userPost = async (nameMinuscule, lastNameMinuscule, date_of_Birth, mailMinuscule, dni, image, phone, country, city, coordinate, street, address, description, isProfessional, profession, photo_gallery) =>{
    try {
        if( nameMinuscule &&  lastNameMinuscule && mailMinuscule && country  && city && coordinate ){
            const [newUser, created] = await User.findOrCreate({
                where:{
                    mail: mailMinuscule
                },
                defaults:{
                    name: nameMinuscule,
                    last_Name: lastNameMinuscule,
                    date_of_Birth,
                    image,
                    dni,
                    phone,
                    description,
                    country,
                    city,
                    coordinate,
                    street,
                    address,
                    isProfessional,
                    photo_gallery
                }
            })
            if(profession){
                let jobFind = await Profession.findAll({
                    where:{
                        name:{
                            [Op.or]: profession
                        }
                    }
                })
                await newUser.addProfession(jobFind)
            }

            if(!created)  return `The User cannot be created, the email "${mailMinuscule}" has already been used`;
            return `The User "${nameMinuscule}" created successfully`;
        } return "Missing data";
    } catch (error) {
        console.log(error)
        throw error
    }
}

//UPDATE USER CON JOB
const updateUser = async (id, nameMinuscule, lastNameMinuscule, date_of_Birth, image, dni, mailMinuscule, phone, description, country, city, coordinate, street, address, isProfessional, profession)=>{
    //console.log(profession);
    try {
        const userUpdated = await User.findOne({ where: { id }, include: Profession })
        const oldProfessions = userUpdated.professions.map(obj => obj.dataValues.id)
        await userUpdated.removeProfession(oldProfessions)
        if(profession?.length > 0){
            const professionsDB = await Profession.findAll({ where: { name: { [Op.or]: profession } } })
            await userUpdated.addProfession(professionsDB.map(obj => obj.dataValues.id))
        }

        userUpdated.set({
            name: nameMinuscule,
            last_Name: lastNameMinuscule,
            date_of_Birth,
            image,
            dni,
            mail: mailMinuscule,
            phone,
            description,
            country,
            city,
            coordinate,
            street,
            address,
            isProfessional,
        })
        await userUpdated.save()
        return `The user "${nameMinuscule}" updated successfully`
    } catch (error) {
        console.log(error)
        throw error
    }
}

//UPDATE USER SIN JOBS
const updateUserNoJobs = async (id, nameMinuscule, lastNameMinuscule, date_of_Birth, image, dni, mailMinuscule, phone, description, country, city, coordinate, street, address, isProfessional ) => {
    try {
        await User.update({
            name: nameMinuscule,
            last_Name: lastNameMinuscule,
            date_of_Birth,
            image,
            dni,
            mail: mailMinuscule,
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
        return `The user "${nameMinuscule}" updated successfully`
    } catch (error) {
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

// UPDATE ISADMIN
const updateAdmin = async(id, isAdmin) => {
    try {
        await User.update({
            isAdmin,
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

// UPDATE ISPROFESSIONAL
const updateProfessional = async(id, isProfessional) => {
    try {
        await User.update({
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

// UPDATE ISBANNED
const updateBanned = async(id, isBanned) => {
    try {
        await User.update({
            isBanned
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


//UPDATE  ARRAY DE FOTOS "MIS TRABAJOS"
const updatePhotos = async (id, obj) =>{
    try {
        const userPremium = await User.findByPk(id)
        if(userPremium.isPremium === false) return "The photos in the gallery were not added because the user is not premium"
        await User.update({
            photo_gallery: obj
        },{
            where:{
                id,
            }
        })
        return "The photos were successfully added to the gallery"
    } catch (error) {
        console.log(error)
        throw error
    }
}

//ALL USERS CERCANOS
const nearbyUsers = async ( id, coordinate ) =>{
    try {
        const allUsersRating = await User.findAll({
            order: [["rating", "DESC"]],
            where:{
                rating:{
                    [Op.gte]: 4 
                }
            },
            
        })
        //console.log("ESTO ES LO QUE DEJO LA FUNCION PARA FILTRAR POR RATING",allUsersRating)
        const userFilter = allUsersRating.filter(user => closeToOne(coordinate, user.coordinate) && id !== user.id);
        //console.log("ARRAY FILTRADO", userFilter)
        return userFilter;
    } catch (error) {
        console.log(error)
        throw error
    }
}




module.exports = {
    allUsers,
    allUsersActives,
    allProfessionalActives,
    searchDni,
    searchMail,
    filterByQueris,
    getProffesionalById,
    userPost,
    updateUser,
    updateUserNoJobs,
    updateRating,
    updateAdmin,
    updatePremium,
    updateProfessional,
    updateBanned,
    destroyUser,
    updateUserNoJobs,
    getAllUsersAdmin,
    updatePhotos,
    nearbyUsers

}

