const { Router } = require('express');
const { Op } = require("sequelize");
const functions = require("../../functions/Functions_review");
const { User, Review, Profession} = require("../../db.js")

const review = Router()

// RUTA QUE CREA RESEÑAS
review.post("/:id", async (req, res, next) =>{
    let { id_orders, id_user_client ,feedback_client, rating  } = req.body;
    const { id } = req.params;
    id_user_client = parseInt(id_user_client)
    try {
        if( id_orders && id_user_client && feedback_client && rating ){
        const [newReview, created] = await Review.findOrCreate({
            where:{
                id_orders,
            },
            defaults:{
                id_user_client,
                id_user_professional: id,
                feedback_client,
                rating,
            }
        })
        let idFind = await User.findByPk(id)
        await newReview.addUser(idFind)
        await functions.searchRating(id, rating);
    

        if(!created)  res.status(200).send(`The Review cannot be created, the Review has already exist`);
        return res.status(201).send(`The Review  created successfully`);
    } return res.status(200).send("Missing data");
        

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
        //FALTA AGREGAR LA FUNCION PARA EDITAR EL RATING ACTUALIZADO AL PROMEDIO
        await functions.updateReview(id, feedback_client, rating);
        await functions.searchRating(id_user_professional, rating)
        res.status(201).send(`The Review  was successfully modified`);
        
    } catch (error) {
        console.log(error)
        next(error)
    }
    
})

// RUTA PARA TRAER TODAS LAS RESEÑAS
review.get("/:id", async (req, res, next)=>{
    const {id} = req.params;
    try{
        const allReview = await functions.getAllReview(id);
        res.status(200).json(allReview);
    } catch (error) {
        console.log(error)
        next(error)
    }

})


module.exports = review;