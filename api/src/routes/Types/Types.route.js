const { Type } = require("../../db.js")
const { default: axios } = require('axios');
const { Router } = require('express');
const router = Router();


router.get("/", async(req, res, next) => {
    try{
        let id = 1;
        const typesDB = await Type.findAll();
        const typesFinallyDB  = typesDB.map(ob => ob.name)
        if(typesDB.length) return res.send(typesFinallyDB);
        const api = await axios.get("https://pokeapi.co/api/v2/type");
        const types = api.data.results.map(r => r.name)
        for(let i = 0; i < types.length; i++){
            await Type.create({
                id,
                name: types[i]
            })
            id++
        }
        return res.send(types)
    }catch(error){
        res.send(error.message)
    }
})

module.exports = router