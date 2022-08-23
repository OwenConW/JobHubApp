const { Op } = require("sequelize");
const { User, Review } = require("../db")



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

//FUNCION PARA TRAER TODAS LAS REVIERW
const getAllReview = async () =>{
    try {
        let allReview = await Review.findAll()
        return allReview
    } catch (error) {
        console.log(error)
        throw error
    }
}

module.exports = {
    updateReview,
    getAllReview
}