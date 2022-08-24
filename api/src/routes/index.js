const { Router } = require('express');
const users = require("./users/users.route");
const verify = require("./verify/verify.route");
const jobs = require("./jobs/jobs.route");
const mails = require("./nodemailer/nodemailer.route");
const pagos = require("./pagos/pagos");
const review = require("./review/review.route");
const conversation = require("./conversation/conversation")
const message = require("./messages/message")
// Importar todos los routers;

const router = Router();

router.use("/users", users);
router.use("/verify", verify);
router.use("/jobs", jobs);
router.use("/mails", mails)
router.use("/pagos", pagos)
router.use("/review", review);
router.use("/conversation", conversation)
router.use("/messages", message)



module.exports = router;
