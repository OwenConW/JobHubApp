const { default: axios } = require('axios');
const { Op } = require("sequelize")
const { Router } = require('express');
const { Conversation } = require("../../db.js")
const functions = require("../../functions/Functions_user");
const Review = require('../../models/Review.js');
// const Profession = require('../../models/Profession.js');

const conversation = Router()

// CREAR UNA NUEVA CONVERSACION
conversation.post("/", async (req, res, next) => {
    const { emisor_id,  receptor_id } = req.body
    try{
        if(emisor_id * 1 === receptor_id * 1) return res.status(404).send('No puedes cordinar contigo mismo.');
        const [newConversation, conversation] = await Conversation.findOrCreate({
            where: {
                [Op.or]: [{
                    [Op.and]: [
                        {emisor_id},
                        {receptor_id}
                    ]},
                    {[Op.and]: [
                        {emisor_id: receptor_id},
                        {receptor_id: emisor_id}
                    ]}
                ]
            },
            defaults: {
                emisor_id,
                receptor_id
            }
        })
        return res.send(newConversation)
    }catch(e){
        console.log(e)
        return res.status(404).send(e)
    }
})

// RUTA CONVERSACION POR USUARIO
conversation.get("/:userId", async(req, res, next) => {
    const { userId } = req.params 
    try{
        const conversation = await Conversation.findAll({
            where: {
                [Op.or]: [{
                    emisor_id: {
                        [Op.eq]: userId * 1
                    }
                },{
                    receptor_id:{
                        [Op.eq]: userId * 1
                    }  
                }

                ]
            },
        })
        return res.send(conversation)
    }catch(e){
        console.log(e)
        return res.send(e)
    }
})

// RUTA PARA ELIMINAR CONVERSACION
conversation.delete("/:id", async (req, res, next)=>{
    const {id} = req.params;
    try {
        await Conversation.destroy({
            where: {id:id}
        })
        res.status(200).send("the Conversation was successfully deleted")
    } catch (error) {
        console.log(error)
        next(error)
    }
})



module.exports = conversation;