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
const searchRating = async (id, rating) =>{
    const ratingUpload = parseInt(rating)
    try {
        const ratingValue = await User.findByPk(id,{
            include:[
                {
                    model: Review,
                    attributes: [ 'rating'],
                    through: {attributes: []},
                }
            ]
        })
        if(ratingValue.rating === -1) return await updateRating(id, ratingUpload)
        let catidadReview= ratingValue.reviews.length
        const reviewNumber = parseInt(catidadReview)
        
        let ratingOld = ratingValue.reviews.length && ratingValue.reviews.map(obj=>obj.rating).reduce( (a,p)=> a + p, 0 )
        const ratingTotalOld = parseInt(ratingOld)
        
        let ratingNew = (ratingTotalOld + ratingUpload) / (reviewNumber + 1)
        return await updateRating(id, (ratingNew + "").slice(0,3))
        
    } catch (error) {
        console.log(error)
        throw error
    }
}

module.exports = {
    updateReview,
    getAllReview,
    searchRating
}