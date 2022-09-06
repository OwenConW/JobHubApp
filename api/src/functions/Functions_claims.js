const { User, Claims, Profession } = require("../db")


const postClaims = async ( id, id_user_client,  feedback_claims, subject ) =>{
    try {
        if( id && id_user_client && feedback_claims && subject ){
            const [newClaims, created] = await Claims.findOrCreate({
                where:{
                    id_user_client,
                    id_user_professional: id,
                    feedback_claims,
                    subject,
                },
                defaults:{
                    id_user_client,
                    id_user_professional: id,
                    feedback_claims,
                    subject,
                }
            })
            let idFind = await User.findByPk(id)
            await newClaims.addUser(idFind)

            if(!created)  return "The Claims cannot be created, the Claims has already exist";
            return "The Claims  created successfully";
        } return "Missing data";
    } catch (error) {
        console.log(error)
        throw error
    }
}

const getAllClaimsByProfessional = async ( id ) =>{
    try {
        const claimsById = await User.findByPk(id,{
            attributes: ['name', 'last_Name'],
            include:[
                {
                    model: Claims,
                    attributes: ['id','id_user_professional','id_user_client','feedback_claims', 'date_created', 'subject'],
                    through: {attributes: []},
                },{
                    model: Profession,
                    attributes: ['name'],
                    through: {attributes: []},
                }
            ]
        })
        return claimsById
    } catch (error) {
        console.log(error)
        throw error
    }
}

const getAllClaimsByClient = async ( id ) =>{
    try {
        const claimsById = await Claims.findAll({
            where:{
                id_user_client: id
            }
        })
        return claimsById
    } catch (error) {
        console.log(error)
        throw error
    }
    
}

const getAllClaimsBySubject = async ( subject ) =>{
    try {
        const claimsBySubject = await Claims.findAll({
            where:{
                subject,
            }
        })
        return claimsBySubject
    } catch (error) {
        console.log(error)
        throw error
    }
}



module.exports = {
    postClaims,
    getAllClaimsByProfessional,
    getAllClaimsByClient,
    getAllClaimsBySubject,
}