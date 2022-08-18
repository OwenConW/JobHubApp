const { Router } = require('express');
const users = require("./users/users.routes")
const verify = require("./verify/verify.route")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

router.use("/users", users);
router.use("/verify", verify)
// router.use("/x", x)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
