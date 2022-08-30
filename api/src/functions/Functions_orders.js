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

//FUNCION PARA TRAER TODAS LAS ORDENES DE LAS CUALES SOY PROFESIONAL
const getAllOrdersByProfessional = async (id) =>{
    try {
        const ordersById = await User.findByPk(id,{
            attributes: ['name', 'last_Name'],
            include:[
                {
                    model: Orders,
                    attributes: ['id','id_user_client','description', 'complete', 'date_created', 'apointment_date', 'allowReview'],
                    through: {attributes: []}
                }
            ]
        })
        return ordersById
    } catch (error) {
        console.log(error)
        throw error
    }
}
//FUNCION PARA TRAER TODAS LAS ORDENES DE LAS CUALES SOY CLIENTE
const getAllOrdersByClient = async (id) =>{
    try {
        const allOrders = await Orders.findAll({
            where:{
                id_user_client: id
            },
            
        })
        return allOrders
    } catch (error) {
        console.log(error)
        throw error
    }
}






module.exports = {
    updateOrden,
    getAllOrdersByProfessional,
    getAllOrdersByClient
}