const { Router } = require('express');
const { Op } = require("sequelize");
const functions = require("../../functions/Functions_review");
const { searchRating } = require("../../functions/Functions_handlers.js")
const { User, Review, Profession} = require("../../db.js")

const review = Router()


review.get("/all", async (req, res, next)=>{
    try {
        const allReviews = await Review.findAll()
        res.status(200).json(allReviews)
    } catch (error) {
        console.log(error)
        next(error)
    }
})


// RUTA QUE CREA RESEÑAS
review.post("/:id", async (req, res, next) =>{
    const { id_orders, id_user_client ,feedback_client, rating  } = req.body;
    const { id } = req.params;
    try {
        const newJob = await functions.postReview( id, id_orders, id_user_client ,feedback_client, rating )
        res.status(201).send(newJob)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

// RUTA PARA EDITAR LAS REVIEW
review.put("/:id", async (req, res, next)=> {
    const { id } = req.params;
    const { feedback_client, rating, id_user_professional } = req.body;

    try {
        await functions.updateReview(id, feedback_client, rating);
        await searchRating(id_user_professional, rating)
        res.status(201).send(`The Review  was successfully modified`);
        
    } catch (error) {
        console.log(error)
        next(error)
    }
})

// RUTA PARA TRAER TODAS LAS RESEÑAS POR ID (del professional)
review.get("/:id", async (req, res, next)=>{
    const {id} = req.params;
    try{
        const allReview = await functions.getAllReviewByProfessional(id);
        res.status(200).json(allReview);
    } catch (error) {
        console.log(error)
        next(error)
    }
})

// RUTA PARA TRAER TODAS LAS RESEÑAS POR ID (del cliente)
review.get("/admin/client/:id", async (req, res, next)=>{
    const {id} = req.params;
    try{
        const allReviewByClient = await functions.getAllReviewByClient(id);
        res.status(200).json(allReviewByClient);
    } catch (error) {
        console.log(error)
        next(error)
    }
})

// RUTA PARA TRAER TODAS LAS RESEÑAS
review.get("/", async (req, res, next)=>{
    try {
        const allReview = await Review.findAll()
        res.status(200).json(allReview)
    
    } catch (error) {
        console.log(error)
        next(error)
    }
})

// RUTA PARA ELIMINAR LOS REVIEW
review.delete("/admin/:id", async (req, res, next)=>{
    const {id} = req.params
    try{
        await Review.destroy({
            where:{id:id}
        }) 
        res.status(201).send("the review was successfully deleted")
    } catch (error) {
        console.log(error)
        next(error)
    }
})

//RUTA PARA BUSCAR REVIEW POR ID (de la review)
review.get("/admin/:id", async (req, res, next)=>{
    const { id } = req.params;
    try {
        const reviewFoundById = await Review.findOne({
            where: {
                id
            }
        })
        res.status(200).json(reviewFoundById)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

module.exports = review;