const { default: axios } = require('axios');
const { Op } = require("sequelize")
const { Router } = require('express');
const { Conversation } = require("../../db.js")
const functions = require("../../functions/Functions_user");
const Review = require('../../models/Review.js');
// const Profession = require('../../models/Profession.js');

const conversation = Router()

// new conv
conversation.post("/", async (req, res, next) => {
    const { emisor_id,  receptor_id } = req.body
    try{
        if(emisor_id === receptor_id)return res.status(404).send("no")
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


module.exports = conversation;