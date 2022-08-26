const { Op } = require("sequelize");
const { User, Review, Orders } = require("../db")

//FUNCION PARA QUE EL PROFESIONAL COMPLETE LA ORDEN
const updateOrden = async (id, description, complete, apointment_date, allowReview ) =>{
    try {
        await Orders.update({
            description, 
            complete,
            apointment_date,
            allowReview,
        },{
            where:{
                id: id
            }
        }
        )
    } catch (error) {
        console.log(error)
        throw error
    }
}

module.exports = {
    updateOrden,
}