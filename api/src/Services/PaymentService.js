
  const axios = require("axios");

  class PaymentService {
    async createSubscription() { // mail
        const url = "https://api.mercadopago.com/preapproval";
      const body = {
        reason: "Job Hub Premium",
        auto_recurring: {
          frequency: 365,
          frequency_type: "days",
          transaction_amount: 4000,
          currency_id: "ARS"
        },
        back_url: "https://jobhub.vercel.app/profile/success",
        payer_email: `test_user_67073490@testuser.com`
      };
  
      const subscription = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        }
      });
  
      return subscription.data;
    }
  }
  
  module.exports = PaymentService;