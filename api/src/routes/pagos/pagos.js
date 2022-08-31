const { default: axios } = require('axios');
const { Router } = require('express');
const PaymentController = require("../../functions/PaymentsController")
const PaymentService = require("../../Services/PaymentService")
const PaymentInstance = new PaymentController(new PaymentService())
const pagos = Router()


pagos.post("/premium", (req, res, next) => {
    PaymentInstance.getSubscriptionLink(req, res)
})



module.exports = pagos;