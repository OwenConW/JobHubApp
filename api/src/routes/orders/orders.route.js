const { Router } = require('express');
const { Op } = require("sequelize");
const functions = require("../../functions/Functions_orders");
const { User, Review, Orders} = require("../../db.js")

const orders = Router()

//RUTA QUE TRAE TODOS LOS USUARIOS SIN FILTRO
orders.get("/all", async (req, res, next)=>{
    try {
        const allOrders = await Orders.findAll()
        res.status(200).json(allOrders)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

// RUTA PARA CREAR POST Y BUSCAR ORDER ACTIVA
orders.post("/", async (req, res, next) =>{
    const { id_user_professional, id_user_client } = req.body;
    try {
        const newOrder = await functions.postOrder( id_user_professional, id_user_client )
        res.status(201).send(newOrder)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

// RUTA PARA COMPLETAR POR EL PROFESIONAL LAS ORDENES CREADAS
orders.put("/:id", async (req, res, next) =>{
    const { description, complete, apointment_date, allowReview, isActive } = req.body;
    const { id } = req.params;
    try {
        await functions.updateOrden(id, description, complete, apointment_date, allowReview, isActive)
        res.status(200).send(`The order updated successfully`)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

// RUTA PARA ELIMINAR LAS ORDENES
orders.delete("/admin/:id", async (req, res, next)=>{
    const {id} = req.params
    try{
        await Orders.destroy({
            where:{id:id}
        }) 
        res.status(201).send("The order was successfully deleted")
    } catch (error) {
        next(error)
    }
})

//RUTA PARA TRAER LA ORDEN POR SU ID
orders.get("/admin/:id", async (req, res, next)=>{
    const {id} = req.params;
    try{
        const order = await Orders.findByPk(id);
        res.status(200).json(order);
    } catch (error) {
        console.log(error)
        next(error)
    }
})

// RUTA PARA TRAER TODAS LAS ORDENES POR ID CUANDO SOY PROFESSIONAL
orders.get("/professional/:id", async (req, res, next)=>{
    const {id} = req.params;
    try{
        const allOrders = await functions.getAllOrdersByProfessional(id);
        res.status(200).json(allOrders);
    } catch (error) {
        console.log(error)
        next(error)
    }
})

// RUTA PARA TRAER TODAS LAS RESEÑAS POR ID CUANDO SOY CLIENTE
orders.get("/client/:id", async (req, res, next)=>{
    const {id} = req.params;
    try{
        const allOrders = await functions.getAllOrdersByClient(parseInt(id));
        res.status(200).json(allOrders);
    } catch (error) {
        console.log(error)
        next(error)
    }
})
// RUTA PARA ELIMINAR ORDENES
orders.delete("/:id", async (req, res, next)=>{
    const {id} = req.params;
    try {
        await Orders.destroy({
            where: {id:id}
        })
        res.status(200).send("the Order was successfully deleted")
    } catch (error) {
        console.log(error)
        next(error)
    }
})


module.exports = orders;