const { Op } = require("sequelize");
const { User, Review } = require("../db")
const { updateRating } = require("../functions/Functions_user.js")



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

//FUNCION PARA BUSCAR Y PROMEDIAR EL RATING
// const searchRating = async (id, rating) =>{
//     try {
//         const ratingValue = await User.findByPk(id)
//         if(ratingValue.rating === -1) return await updateRating(id, rating)
//         const avgRating = await User.findAll({
//             attributes: [User.fn('AVG', User.col('rating')), 'avgRating']
//         })
//         console.log('ESTO ES LO QUE ME DEVUELVE LA FUNCION AVG RATING', avgRating)
            
//         ;
        
//     } catch (error) {
//         console.log(error)
//         throw error
//     }
// }

module.exports = {
    updateReview,
    getAllReview,
    // searchRating
}