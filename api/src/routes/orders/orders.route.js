const { Router } = require('express');
const { Op } = require("sequelize");
const functions = require("../../functions/Functions_orders");
const { User, Review, Orders} = require("../../db.js")

const orders = Router()

orders.post("/:id", async (req, res, next) =>{
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