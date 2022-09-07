const { Router } = require('express');
const { Op } = require("sequelize");
const functions = require("../../functions/Functions_claims");
const { User, Claims, Profession} = require("../../db.js")

const claims = Router()


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

//RUTA PARA FILTRAR LOS REPORTES POR SUBJECT
claims.get("/reason", async (req, res, next)=>{
    const {subject} = req.query;
    try{
        const allClaimsBySubject = await functions.getAllClaimsBySubject(subject);
        res.status(200).json(allClaimsBySubject);
    } catch (error) {
        console.log(error)
        next(error)
    }
})

//RUTA PARA OBTENER LAS DENUNCIAS POR ID DE PROFESIONAL DENUNCIADO
claims.get("/:id", async (req, res, next)=>{
    const {id} = req.params;
    try {
        const allClaimsProfessional = await functions.getAllClaimsByProfessional(id)
        console.log(allClaimsProfessional);
        res.status(200).json(allClaimsProfessional)
    } catch (error) {
        console.log(error)
        next(error)
    }
})



// RUTA PARA TRAER TODAS LAS DENUNCIAS POR ID (del cliente)
claims.get("/client/:id", async (req, res, next)=>{
    const {id} = req.params;
    try{
        const allClaimsClient = await functions.getAllClaimsByClient(id);
        res.status(200).json(allClaimsClient);
    } catch (error) {
        console.log(error)
        next(error)
    }
})

// RUTA QUE CREA DENUNCIAS
claims.post("/", async (req, res, next) =>{
    const {id ,id_user_client, feedback_claims, subject} = req.body;
    try {
        const responseClaims = await functions.postClaims(id, id_user_client, feedback_claims, subject)
        res.status(201).send(responseClaims)
    } catch (error) {
        console.log(error)
        next(error)
    }
})


// RUTA PARA ELIMINAR REPORTES
claims.delete("/:id", async (req, res, next)=>{
    const {id} = req.params;
    try {
        await Claims.destroy({
            where: {id:id}
        })
        res.status(200).send("the Claims was successfully deleted")
    } catch (error) {
        console.log(error)
        next(error)
    }
})

module.exports = claims;