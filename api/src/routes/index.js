const { Router } = require('express');
const users = require("./users/users.route")
const verify = require("./verify/verify.route")
const jobs = require("./jobs/jobs.route")
const mails = require("./nodemailer/nodemailer.route")
//const review = require('./review/review.route');

// Importar todos los routers;

const router = Router();

router.use("/users", users);
router.use("/verify", verify);
router.use("/jobs", jobs);
router.use("/mails", mails)
// router.use("/review", review);




module.exports = router;
