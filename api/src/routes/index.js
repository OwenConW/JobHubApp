const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const TipoRoute = require("./Types/Types.route.js")
const PokemonRoute = require("./Pokemons/Pokemons.route.js")

const router = Router();

router.use("/pokemons", PokemonRoute)
router.use("/types", TipoRoute)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
