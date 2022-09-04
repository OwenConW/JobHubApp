const { User, Review } = require("../db")
const { updateRating } = require("../functions/Functions_user.js")

//FUNCION PARA BUSCAR Y PROMEDIAR EL RATING
const searchRating = async (id, rating) =>{
    try {
        const ratingValue = await User.findByPk(id,{
            include:[
                {
                    model: Review,
                    attributes: [ 'rating'],
                    through: {attributes: []},
                }
            ]
        })

        if(ratingValue.rating === -1) return await updateRating(id, rating)
        let catidadReview= ratingValue.dataValues.reviews.length
        const reviewNumber = parseInt(catidadReview)

        let ratingOld = ratingValue.dataValues.reviews.length && ratingValue.dataValues.reviews.map(obj=>obj.rating).reduce( (a,p)=> a + p, 0 )
        const ratingTotalOld = parseInt(ratingOld)

        let ratingNew = ratingTotalOld  / reviewNumber 
        return await updateRating(id, (ratingNew + "").slice(0,3))
        
    } catch (error) {
        console.log(error)
        throw error
    }
}


//FUNCION PARA SACAR LA DISTANCIA EN CORDENADAS
const pitagorasDistance = (coord1, coord2) => {
    let x1 = coord1[0];
    let y1 = coord1[1];

    let x2 = coord2[0];
    let y2 = coord2[1];

    let difx = x2 - x1;
    let dify = y2 - y1;

    let powx = Math.pow(difx, 2);
    let powy = Math.pow(dify, 2);

    return (Math.sqrt(powx+powy)*100);
}



// const closeToOne = (coords1, coords2) => {
//     if(pitagorasDistance(coords1, coords2) < distance){ //distancia en kilometros
//         return true;
//     }else{
//         return false;
//     }
// }

module.exports = {
    searchRating,
    pitagorasDistance,
}