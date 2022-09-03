const { Router } = require('express');
const { Op } = require("sequelize");
const functions = require("../../functions/Functions_claims");
const { User, Claims, Profession} = require("../../db.js")

const claims = Router()

// RUTA QUE CREA DENUNCIAS
claims.post("/:id", async (req, res, next) =>{
    const { id_user_client, feedback_claims  } = req.body;
    const { id } = req.params;
    try {
        const responseClaims = await functions.postClaims( id, id_user_client, feedback_claims)
        console.log('ESTA ES LA RESPUESTA DE LA FUNCION CLAIMS',responseClaims)
        res.status(201).send(responseClaims)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

//RUTA PARA OBTENER TODAS LAS DENUNCIAS
claims.get("/", async (req, res, next)=>{
    try {
        const allClaims = await Claims.findAll()
        res.status(200).json(allClaims)
    
    } catch (error) {
        console.log(error)
        next(error)
    }
})

//RUTA PARA OBTENER LAS DENUNCIAS POR ID DE PROFESIONAL DENUNCIADO
claims.get("/:id", async (req, res, next)=>{
    const { id } = req.params;
    try {
        const allClaimsProfessional = await functions.getAllClaimsByProfessional(id)
        res.status(200).json(allClaimsProfessional)
    
    } catch (error) {
        console.log(error)
        next(error)
    }
})

// RUTA PARA TRAER TODAS LAS RESEÑAS POR ID (del cliente)
claims.get("/client/:id", async (req, res, next)=>{
    const { id } = req.params;
    try{
        const allClaimsClient = await functions.getAllClaimsByClient(id);
        res.status(200).json(allClaimsClient);
    } catch (error) {
        console.log(error)
        next(error)
    }
})


module.exports = claims;