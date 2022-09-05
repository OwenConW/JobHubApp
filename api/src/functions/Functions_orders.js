const { Op } = require("sequelize");
const { User, Review, Orders } = require("../db")

//FUNCION PARA CREAR LA ORDEN
const postOrder = async ( id_user_professional,  id_user_client ) =>{
    try {
        if( id_user_professional && id_user_client ){
            const [newOrder, created] = await Orders.findOrCreate({
                where:{
                    id_user_professional,
                    id_user_client,
                    complete: "false",
                },
                defaults:{
                    id_user_professional,
                    id_user_client,
                }
            })
            let idFind = await User.findByPk(id_user_professional)
            await newOrder.addUser(idFind)

            if(!created)  return "Cannot create an Order, you must complete a pending order";
            return "The Order created successfully";
        } return "Missing data";
    } catch (error) {
        console.log(error)
        throw error
    }
}


//FUNCION PARA QUE EL PROFESIONAL COMPLETE LA ORDEN
const updateOrden = async (id, description, complete, apointment_date, allowReview, isActive ) =>{
    try {
        await Orders.update({
            description, 
            complete,
            apointment_date,
            allowReview,
            isActive
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
                    attributes: ['id', 'id_user_professional','id_user_client','description', 'complete', 'date_created', 'apointment_date', 'allowReview'],
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
    postOrder,
    updateOrden,
    getAllOrdersByProfessional,
    getAllOrdersByClient
}