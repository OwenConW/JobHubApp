const { Op } = require("sequelize");
const { User, Review } = require("../db")
const { searchRating } = require("../functions/Functions_handlers.js")



//FUNCION PARA ACTUALIZAR REVIEW
const updateReview = async (id, feedback_client, rating) =>{
    try {
        await Review.update({
            feedback_client, 
            rating,
        },{
            where:{
                id_orders: id
            }
        }
        )
    } catch (error) {
        console.log(error)
        throw error
    }
}

//FUNCION PARA SUBIR UNA REVIEW
const postReview = async ( id, id_orders, id_user_client ,feedback_client, rating ) =>{
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
            await searchRating(id, rating);

            if(!created)  return "The Review cannot be created, the Review has already exist";
            return "The Review  created successfully";
        } return "Missing data";
    } catch (error) {
        console.log(error)
        throw error
    }
}

//FUNCION PARA TRAER TODAS LAS REVIERW
const getAllReviewByProfessional = async (id) =>{
    try {
        const reviewById = await User.findByPk(id,{
            attributes: ['name', 'last_Name'],
            include:[
                {
                    model: Review,
                    attributes: ['id','id_orders','id_user_client','id_user_professional','feedback_client','rating'],
                    through: {attributes: []}
                }
            ]
        })
        return reviewById
    } catch (error) {
        console.log(error)
        throw error
    }
}

//FUNCION PARA TRAER TODAS LAS REVIERW DEL CLIENTE
const getAllReviewByClient = async (id) =>{
    try {
        const reviewById = await Review.findAll({
            where:{
                id_user_client: id
            }
        })
        return reviewById
    } catch (error) {
        console.log(error)
        throw error
    }
}


module.exports = {
    updateReview,
    postReview,
    getAllReviewByProfessional,
    searchRating,
    getAllReviewByClient
}