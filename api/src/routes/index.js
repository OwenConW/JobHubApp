const { Router } = require('express');
const users = require("./users/users")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

router.use("/users", users)
// router.use("/x", x)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
