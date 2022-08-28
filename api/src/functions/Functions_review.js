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
const getAllReview = async (id) =>{
    try {
        const ratingById = await User.findByPk(id,{
            attributes: ['name', 'last_Name'],
            include:[
                {
                    model: Review,
                    attributes: ['id_orders','id_user_client','feedback_client','rating'],
                    through: {attributes: []}
                }
            ]
        })
        return ratingById
    } catch (error) {
        console.log(error)
        throw error
    }
}

//FUNCION PARA BUSCAR Y PROMEDIAR EL RATING
const searchRating = async (id, rating) =>{
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

        if(ratingValue.rating === -1) return await updateRating(id, rating)
        let catidadReview= ratingValue.dataValues.reviews.length
        const reviewNumber = parseInt(catidadReview)

        let ratingOld = ratingValue.dataValues.reviews.length && ratingValue.dataValues.reviews.map(obj=>obj.rating).reduce( (a,p)=> a + p, 0 )
        const ratingTotalOld = parseInt(ratingOld)

        let ratingNew = ratingTotalOld  / reviewNumber 
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