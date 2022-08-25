const { default: axios } = require('axios');
const { Op } = require("sequelize")
const { Router } = require('express');
const { Conversation } = require("../../db.js")
const functions = require("../../functions/Functions_user");
const Review = require('../../models/Review.js');
// const Profession = require('../../models/Profession.js');

const conversation = Router()

// new conv
conversation.post("/", (req, res, next) => {
    const { emisor_id,  receptor_id } = req.body
    Conversation.create({
        emisor_id,
        receptor_id
    })
    .then(newConversation => {
        return res.send(newConversation)
    }, (e) => {
        console.log(e)
        return res.send(e)
    })
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