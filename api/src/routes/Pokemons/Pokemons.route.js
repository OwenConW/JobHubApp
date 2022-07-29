const { default: axios } = require('axios');
const { Pokemon, Type, Op} = require("../../db.js")
const { Router, response } = require('express');
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
    if(cache.length){
        const pokemonArr = cache.find(p => p.id === parseInt(idPokemon));
        if(pokemonArr) return res.send(pokemonArr);
    }
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

router.post("/", (req, res, next) => {
    const { name, hp, attack, defense, image, speed, height, weight, types } = req.body;
    Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight, 
        image
    })
    .then(pokemon => {
        if(types.length){
            types.map( t => {
                Type.findOne({where: {name: t}})
                .then(res => {
                    res.addPokemon(pokemon)
                })
            })
        }
        return res.json({nombre: name})
    })
    .catch(error => {
        return res.status(404).send(error)
    })
})

router.put("/", (req, res, next) => {
    const { name, hp, attack, defense, speed, height, weight } = req.body;
    const { actualname } = req.query
    Pokemon.findOne({where: {actualname}})
    .then(p => {
        name ? p.name = name : p.name
        hp ? p.hp = hp : p.hp
        attack ? p.attack = attack : p.attack
        defense ? p.defense = defense : p.defense
        speed ? p.speed = speed : p.speed
        height ? p.height = height : p.height
        weight ? p.weight = weight : p.naweightme
        return p.save()
    })
    .then(() => {
        return Pokemon.findOne({where: {name}})
    })
    .catch(error => {
        return res.send(error.message)
    })
})

//#region $$$$$$$$$$$$$$$$$$$$ ASYNC AWAIT POST $$$$$$$$$$$$$$$$$$$$$$$$$
// router.post("/", async (req, res, next) => {
//     const { name, hp, attack, defense, image, speed, height, weight, types} = req.body
    
// try{
//     if(!name) res.status(404).send('No se puede crear un pokemon sin nombre.')
//     const pokemon = await Pokemon.create({
//         name,
//         hp,
//         attack,
//         defense,
//         speed,
//         height,
//         weight, 
//         image
//     })
//     if(types){
//         if(types.length > 0){
//            let tiposAddPromises = types.map(async (t) => {
//                 let tipeToAdd = await Type.findOne({where: {name: t}})
//                 tipeToAdd.addPokemon(pokemon);
//                 await Promise.all(tiposAddPromises);
//             })
//         }
//     }
//     return res.json({nombre: name})
// }catch(error){
//     res.status(404).send(error)
// }
// })
//#endregion
//#region $$$$$$$$$$$ DELETE $$$$$$$$$$$$$$$
// router.delete("/", async (req, res, next) => {
//     const { id } = req.query;
//     try{
//         await Pokemon.destroy({
//             where: {
//                 key: {
//                     [Op.eq]: [parseInt(id) - 40],
//                 },
//             }
//         })
//         const pokemons = await Pokemon.findAll()
//         return res.send(cache.slice(0,40).concat(pokemons).sort((a, b) => a.id - b.id))

//     }catch(error){
//         return res.send(error.message)
//     }
// } )
//#endregion
module.exports = router;
//{pokemon, message: `Pokemon ${name} creado con exito!`}