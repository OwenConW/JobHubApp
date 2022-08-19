const { Router } = require('express');
const functions = require("../../functions/Functions_user");
const { User, Profession, Op} = require("../../db.js")

const review = Router()

// RUTA QUE CREA RESEÑAS
// users.post("/review/:id", async (req, res, next) =>{
//     const { feedback_client, rating, id_user_client, id_profession } = req.body;
//     const { id } = req.params;
//     try {
//         const newReview = await Review.create({ 
//             id_user_client,
//             id_user_professional: id,
//             id_profession,
//             feedback_client,
//             rating,
//         });

//         (rating) 
        
//     } catch (error) {
//         console.log(error)
//         next(error)
//     }
    
// })
