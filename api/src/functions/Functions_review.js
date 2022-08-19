const { Op } = require("sequelize");
const { User, Review } = require("../db")

//FUNCION PARA ACTUALIZAR EL RATING
const updateRating = async (rating) =>{
    let actualRating = await User.find({ 
        include: {
            model: User,
            attributes: ['id','name','last_Name','image','city', 'postal_code', 'country'],
            through: {attributes: []},
        },
        where: {
            name: {
                [Op.substring]: profession.toLowerCase(),
            },
        },
    })
}