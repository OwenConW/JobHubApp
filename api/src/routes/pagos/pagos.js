const { default: axios } = require('axios');
const { Router } = require('express');
const PaymentController = require("../../functions/PaymentsController")
const PaymentService = require("../../Services/PaymentService")
const PaymentInstance = new PaymentController(new PaymentService())
const pagos = Router()

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

pagos.post("/premium", (req, res, next) => {
    PaymentInstance.getSubscriptionLink(req, res)
})

module.exports = pagos;