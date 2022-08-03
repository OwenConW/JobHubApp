const { default: axios } = require('axios');
const { Pokemon, Type, Op} = require("../../db.js")
const { Router, response } = require('express');
const { types } = require('pg');
const router = Router();


const cache = []; 

router.get("/", async (req, res, next) => {
    const { name } = req.query;
try{
if(!name){
    if(cache.length){
        const dbpokemons = await Pokemon.findAll({include: 
            {model: Type, 
                attributes: ["name"],
                through: {attributes: []},
            }
        });   
        const response = cache.slice(0,40).concat(dbpokemons).sort((a, b) => a.id - b.id)
        return res.status(200).send(response) 
    }
    const dbpokemons = await Pokemon.findAll( {include: {
        model: Type,
        attributes: ['name'],
        through: {attributes: []},
    }})
    const first20 = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const last20 = await axios.get(first20.data.next);
    const pokemons = first20.data.results.concat(last20.data.results)
    const promesas =  pokemons.map(p => axios.get(p.url))
    const pokemonsMaps = await Promise.all(promesas)
    const pokemonsFinish = pokemonsMaps.map(p => {
        return {
            id: p.data.id,
            name: p.data.name,
            attack: p.data.stats[1]["base_stat"],
            image: p.data.sprites.other.dream_world.front_default,
            types: p.data.types.map(t => t.type.name)
        }
    })
   
    pokemonsFinish.map(obj => cache.push(obj));
    // resultado.creados.map(obj => cache.push(obj))     
    res.status(200).send(cache.concat(dbpokemons))
}else{
    let pokemondb = await Pokemon.findOne({
        include: {               
            model: Type,
            attributes: ['name'],
            through: {attributes: []},
        },
        where: {
            name: {
                [Op.eq]: name,
            },
        },
    });
    if(pokemondb) return res.send(pokemondb);
    let pokemon;
    if(cache.length) pokemon = cache.find(p => p.name === name);
    if(pokemon) return res.send(pokemon);
    // pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    // pokemon = {
    //     id: pokemon.data.id,
    //     name: pokemon.data.name,
    //     attack: pokemon.data.stats[1]["base_stat"],
    //     image: pokemon.data.sprites.other.dream_world.front_default,
    //     types: pokemon.data.types.map(t => t.type.name)
    // }
    if(!pokemon)return res.status(400).send(new Error('El pokemon ingresado no existe'))
    return res.status(200).send(pokemon);
}
}catch(error){
return res.status(400).send(new Error('El pokemon ingresado no existe'))
}

})

router.get("/:idPokemon", async (req, res, next) => {
    const { idPokemon } = req.params;
    try{
        if(idPokemon > 40){
            const pokemonDB = await Pokemon.findOne({
                include: {
                    model: Type,
                    attributes: ['name'],
                    through: {attributes: []},
                },
                where: {
                    key: {
                        [Op.eq]: parseInt(idPokemon - 40),
                    },
                },
            })
            if(pokemonDB) return res.send(pokemonDB);
            // if(cache.length){
                //     const pokemonArr = cache.find(p => p.id === parseInt(idPokemon));
                //     if(pokemonArr) return res.send(pokemonArr);
                // }
            }
            let pokemonAPI = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
            pokemonAPI = {
                id: pokemonAPI.data.id,
                name: pokemonAPI.data.name,
                hp: pokemonAPI.data.stats[0]["base_stat"],
                attack: pokemonAPI.data.stats[1]["base_stat"],
                defense: pokemonAPI.data.stats[2]["base_stat"],
                speed: pokemonAPI.data.stats[5]["base_stat"],
                height: pokemonAPI.data.height,
                weight: pokemonAPI.data.weight,
                image: pokemonAPI.data.sprites.other.dream_world.front_default,
                types: pokemonAPI.data.types.map(t => t.type.name)
            }
            cache.push(pokemonAPI)
            return res.send(pokemonAPI);
        }catch(error){
            next(error);
        }
})
    
router.post("/", async (req, res, next) => {
    const { name, hp, attack, defense, image, speed, height, weight, types} = req.body
    
try{
    if(!name) res.status(404).send("Please send a name")
    const pokemon = await Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight, 
        image
    })
    if(types){
        const tipos = await Type.findAll({where: {name: { [Op.or]: types}}})
        await pokemon.addTypes(tipos)
    }
    return res.json({nombre: name})
}catch(error){
    res.status(404).send(error)
}
})

//#region $$$$$$$$$$$$$$$$$$$$$$ PROMISE GET $$$$$$$$$$$$$$$$$$$$$$$$$ 

// router.get("/", (req, res, next) => {
//     const { name } = req.query;
//     if(!name){
//         if(cache.length){
//             Pokemon.findAll({include: 
//                 {model: Type, 
//                     attributes: ["name"],
//                     through: {attributes: []},
//                 }
//             })
//             .then(db => {
//                 return res.send(cache.slice(0, 40).concat(db).sort((a, b) => a.id - b.id))
//             })
//         }
//         axios.get("https://pokeapi.co/api/v2/pokemon")
//         .then(first20 => {
//             axios.get(first20.data.next)
//             .then(last20 => {
//                 return first20.data.results.concat(last20.data.results)
//             })
//             .then(pokemons => {
//                 return pokemons.map(p => axios.get(p.url))
//             })
//             .then(promesas => {
//                return  Promise.all(promesas)
//             })
//             .then(pokemones => {
//                 const finalPokemons = pokemones.map(p => {
//                     return {
//                         id: p.data.id,
//                         name: p.data.name,
//                         attack: p.data.stats[1]["base_stat"],
//                         image: p.data.sprites.other.dream_world.front_default,
//                         types: p.data.types.map(t => t.type.name)
//                     }
//                 })
//                 finalPokemons.map(p => cache.push(p))
//                 Pokemon.findAll({include: 
//                     {model: Type, 
//                         attributes: ["name"],
//                         through: {attributes: []},
//                     }
//                 })
//                 .then((dbPokemons) => {
//                    return res.send(cache.concat(dbPokemons)) 
//                 }) 
//             })
//         })
//         .catch(error => {
//             return res.send(error.message)
//         })
        
    
//     }else{
//         Pokemon.findOne({
//             include: {               
//                 model: Type,
//                 attributes: ['name'],
//                 through: {attributes: []},
//             },
//             where: {
//                 name: {
//                     [Op.eq]: name,
//                 },
//             },
//         })
//         .then(pokemon => {
//             if(pokemon){
//                 return res.send(pokemon)
//             }
//         })
//         let pokemon;
//         if(cache.length) pokemon = cache.find(p => p.name === name);
//         if(pokemon) return res.send(pokemon)
//         axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
//         .then(response => {
//             return response = {
//             id: response.data.id,
//             name: response.data.name,
//             attack: response.data.stats[1]["base_stat"],
//             image: response.data.sprites.other.dream_world.front_default,
//             types: response.data.types.map(t => t.type.name)
//             }
//         })
//         .then(p => {
//             return res.send(p)
//         })
//         .catch(error => {
//             return res.send(error.message)
//         })
//     }
// })
//#endregion
//#region $$$$$$$$$$$$$$$$$$$$$$ UPDATE $$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// router.put("/", (req, res, next) => {
//     const { name, hp, attack, defense, speed, height, weight } = req.body;
//     const { actualname } = req.query
//     Pokemon.update({name, hp, attack, defense, speed, height, weight},{
//         where: {
//             name: actualname
//         }
//     })
//     .then(() =>{
//         return Pokemon.findOne({
//             include: {               
//                 model: Type,
//                 attributes: ['name'],
//                 through: {attributes: []},
//             },
//             where: {
//                 name: {
//                     [Op.eq]: name,
//                 },
//             },
//         })
//     })
//     .then(pokemon => {
//         return res.send(pokemon)
//     })
//     .catch(error => {
//         return res.send(error.message)
//     })
// })
//#endregion
//#region $$$$$$$$$$$$$$$$$$$$$$ PUT $$$$$$$$$$$$$$$$$$$$$$
// router.put("/", async (req, res, next) => {
//     const { name, hp, attack, defense, speed, height, weight, types} = req.body;
//     const { id } = req.query
//     try{
//         const pokemonToUpdate = await Pokemon.findOne({where: {key: id - 40}, include: Type});
//         const TypesToDestroy = pokemonToUpdate.types.map(types => types.dataValues.id);

//         await pokemonToUpdate.removeTypes(TypesToDestroy);

//         const NewTypes = await Type.findAll({where: {name: { [Op.or]: types}}})
//         await pokemonToUpdate.addTypes(NewTypes.map(type => type.dataValues.id))

//         pokemonToUpdate.set({ 
//             name, 
//             hp,
//             attack, 
//             defense, 
//             speed, height, 
//             weight,
//         })
//         await pokemonToUpdate.save()
//         res.status(200).send(`${name} has been updated`)
//     }catch(error){
//         return res.status(400).send(error.message)
//     }
// })
//#endregion
//#region $$$$$$$$$$$$$$$$$$$$ PROMISE POST $$$$$$$$$$$$$$$$$$$$$$$$$
// router.post("/", (req, res, next) => {
//         const { name, hp, attack, defense, image, speed, height, weight, types } = req.body;
//         if(!name)return res.status(404).send("Please send a name")
//         Pokemon.create({
//             name,
//             hp,
//             attack,
//             defense,
//             speed,
//             height,
//             weight, 
//             image
//         })
//         .then(pokemon => {
//             if(types.length){
//                 types.map( t => {
//                     Type.findOne({where: {name: t}})
//                     .then(res => {
//                         res.addPokemon(pokemon)
//                     })
//                 })
//             }
//             return res.json({nombre: name})
//         })
//         .catch(error => {
//             return res.status(404).send(error)
//         })
// })
//#endregion

module.exports = router;
