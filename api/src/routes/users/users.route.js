const { default: axios } = require('axios');
const { Router } = require('express');
const { User, Profession, Review, Op} = require("../../db.js")
const functions = require("../../functions/Functions_user");


const users = Router()


// RUTA QUE TRAE TODOS LOS USUARIOS O FILTRA POR PROFESION Y/O RATING 
users.get("/", (req, res, next) => {
    const {name, rating, profession } = req.query;
    functions.filterByQueris(name, profession, rating)
    .then(professionals => {
        return res.status(200).send(professionals);
    })
    .catch(e => {
        return res.status(404).send(e);
    })
})

//RUTA QUE TRAE TODOS LOS USUARIOS SIN FILTRO
users.get("/all", async (req, res, next)=>{
    try {
        const allUsers = await functions.allUsers();
        res.status(200).json(allUsers)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

//RUTA QUE TRAE TODOS LOS USUARIOS ACTIVOS Y NO BANEADOS
users.get('/all/actives', async (req, res, next)=>{
    try {
        const allUsers = await functions.allUsersActives();
        res.status(200).json(allUsers)
    
    } catch (error) {
        console.log(error)
        next(error)
    }
})

//RUTA QUE TRAE TODOS LOS PROFESIONALES ACTIVOS Y NO BANEADOS
users.get('/allprofessional/actives', async (req, res, next)=>{
    try {
        const allUsers = await functions.allProfessionalActives();
        res.status(200).json(allUsers)
    
    } catch (error) {
        console.log(error)
        next(error)
    }
})

//RUTA PARA TRAER USUARIOS FILTRADOS POR COORDENADAS CERCANAS AL HOME
users.get('/home', async (req, res, next)=>{
    const { id, coordinate } = req.body;
    try {
        const allNearbyUsers = await functions.nearbyUsers( id, coordinate )
        console.log("ESTO LLEGA DE LA FUNCION",allNearbyUsers)
        res.status(200).json(allNearbyUsers)
///////////////
    } catch (error) {
        console.log(error)
        next(error)
    }
})

//RUTA PARA VALIDAR SI EL DNI EXISTE EN BASE DE DATOS
users.get('/searchDni', async (req, res, next) =>{
    const { dni } = req.query 
    try {
        const findDni = await functions.searchDni(dni);
        res.status(200).send(findDni)
    } catch (error) {
        console.log(error);
        next (error)
    }
})

//RUTA PARA VALIDAR SI EL MAIL EXISTE EN BASE DE DATOS CUANDO EL USUARIO UPDATE
users.get('/searchMail', async (req, res, next) =>{
    const { mail } = req.query 
    try {
        const findMail = await functions.searchMail(mail);
        res.status(200).send(findMail)
    } catch (error) {
        console.log(error);
        next (error)
    }
})

//RUTA PARA FILTRAR TODOS LOS USUARIOS ADMIN
users.get("/filter", async (req, res, next) => {
    const { name, last_Name, profession } = req.query;
    try {
        const options = await functions.getAllUsersAdmin( name, last_Name, profession )
        const filter = await User.findAll(options)
        res.status(200).json(filter)
    } catch (error) {
        console.log(error);
        next (error)
    }
})

// RUTA QUE BUSCA O CREA USUARIOS
users.post("/", async (req, res, next) =>{
    const { name, last_Name, date_of_Birth, mail, dni, image, phone, country, city, coordinate, street, address, description, isProfessional, profession } = req.body;
    const nameMinuscule = name.toLowerCase();
    const lastNameMinuscule = last_Name.toLowerCase();
    const mailMinuscule = mail.toLowerCase();
    const photo_gallery = {
        imagen1: null,
        imagen2: null,
        imagen3: null,
        imagen4: null
    }
    try {
        const postUser = await functions.userPost(nameMinuscule, lastNameMinuscule, date_of_Birth, mailMinuscule, dni, image, phone, country, city, coordinate, street, address, description, isProfessional, profession, photo_gallery)
        res.status(200).send(postUser)
    } catch (error) {
        console.log(error);
        next (error)
    }
    
    
})

//RUTA PARA EDITAR EL USUARIO (con trabajo)
users.put('/:id', async (req, res, next) => {
    const { id } = req.params
    const { name, last_Name, date_of_Birth, image, dni, mail, phone, description, country, city, coordinate, street, address, isProfessional, profession } = req.body;
    const nameMinuscule = name?.toLowerCase();
    const lastNameMinuscule = last_Name?.toLowerCase();
    const mailMinuscule = mail?.toLowerCase();

    try {
        const updateUser = await functions.updateUser(id, nameMinuscule, lastNameMinuscule, date_of_Birth, image, dni, mailMinuscule, phone, description, country, city, coordinate, street, address, isProfessional, profession )
        res.status(200).send(updateUser)
    } catch (error) {
        console.log(error);
        next (error)
    }
})

    
//RUTA PARA EDITAR USUARIO SIN JOBS
users.put("/edit/:id" , async (req, res, next) => {
    const { id } = req.params
    const { name, last_Name, date_of_Birth, image, dni, mail, phone, description, country, city, coordinate, street, address, isProfessional} = req.body;
    const nameMinuscule = name?.toLowerCase();
    const lastNameMinuscule = last_Name?.toLowerCase();
    const mailMinuscule = mail?.toLowerCase();
    try {
        const userUpdateNoJob = await functions.updateUserNoJobs(id, nameMinuscule, lastNameMinuscule, date_of_Birth, image, dni, mailMinuscule, phone, description, country, city, coordinate, street, address, isProfessional)
        return res.status(200).send(userUpdateNoJob)
    } catch (error) {
        console.log(error);
        next (error)
    }
})


// RUTA QUE BUSCA USUARIOS POR ID
users.get("/:id", (req, res, next) => {
    const { id } = req.params;
    functions.getProffesionalById(id * 1)
    .then(professional => {
        return res.status(200).send(professional);
    })
    .catch(e => {
        return res.status(404).send(e);
    })
})

// RUTA PARA PASAR UN USUARIO A ADMIN
users.put("/updateadmin/:id", async (req, res, next) => {
    const { id } = req.params;
    const { isAdmin } = req.body
    try {
        await functions.updateAdmin(id, isAdmin)
        res.status(200).send(`The user is now ${isAdmin === false ? "noAdmin" : "Admin"}`)
    } catch (error) {
        console.log(error);
        next (error)
    }
})


// RUTA PARA PASAR UN USUARIO A PREMIUM
users.put('/premium/:id', async (req, res, next) => {
    const { id } = req.params;
    const { isPremium } = req.body
    try {
        await functions.updatePremium(id, isPremium)
        res.status(200).send(`The user is now ${isPremium === false ? "noPremium" : "Premium"}`)
    } catch (error) {
        console.log(error);
        next (error)
    }
})

//RUTA PARA PASAR UN USUARIO A PROFESIONAL
users.put('/professional/:id', async (req, res, next) => {
    const { id } = req.params;
    const { isProfessional } = req.body
    try {
        await functions.updateProfessional(id, isProfessional)
        res.status(200).send(`The user is now ${isProfessional === false ? "noProfesional" : "Profesional"}`)
    } catch (error) {
        console.log(error);
        next (error)
    }
})

//RUTA PARA BANEAR A UN USUARIO 
users.put('/banned/:id', async (req, res, next) => {
    const { id } = req.params;
    const { isBanned } = req.body
    try {
        await functions.updateBanned(id, isBanned)
        res.status(200).send(`The user is now ${isBanned === false ? "noBanned" : "Banned"}`)
    } catch (error) {
        console.log(error);
        next (error)
    }
})


//RUTA PARA ELIMINAR LOGICAMENTE AL USUARIO
users.put('/destroy/:id', async (req, res, next) => {
    const { id } = req.params;
    const { isActive } = req.body;
    try {
        await functions.destroyUser( id, isActive )
        res.status(200).send(`The user was successfully deleted`)
    } catch (error) {
        console.log(error);
        next (error)
    }
})



//RUTA PARA ACTUALIZAR EL ID DE SUSCRIPCION CON FECHA ACTUAL Y VENCIMIENTO
users.put('/subscription/:id', async (req, res, next) =>{
    const { id } = req.params;
    const { preapproval_id } = req.body;
    let actualDate = new Date();
    let day = actualDate.getDate();
    let month = actualDate.getMonth() + 1;
    let year = actualDate.getFullYear();
    let nextYear = year +1 
    
    try {
        await User.update({
            preapproval_id,
            payment_date: (`${day}-${month}-${year}`),
            expiration_date: (`${day}-${month}-${nextYear}`)
        },{
            where:{
                id,
            }
        })
        res.status(200).send("subscription expiration date updated")
    } catch (error) {
        console.log(error);
        next (error)
    }
})
//ACTUALIZAR LA GALERIA DE IMAGENES DEL USER
users.put('/gallery/:id', async (req, res, next) =>{
    const { id } = req.params;
    const obj = req.body; 
    try {
        const updatePhoto = await functions.updatePhotos(id, obj)
        res.status(201).send(updatePhoto)
    } catch (error) {
        console.log(error);
        next (error)
    }
})




module.exports = users;