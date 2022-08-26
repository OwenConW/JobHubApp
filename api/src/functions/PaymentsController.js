class PaymentController {
    constructor(subscriptionService) {
      this.subscriptionService = subscriptionService;
    }
    async getSubscriptionLink(req, res) {
        const { mail } = req.query
      try {
          // ejecuamos la funcion que esta en el servicio "createSubscription"
        const subscription = await this.subscriptionService.createSubscription(mail);
        
        return res.json(subscription.init_point);
      } catch (error) {
        console.log(error);
  
        return res
          .status(500)
          .json({ error: true, msg: "Failed to create subscription" });
      }
    }
  }
  
  module.exports = PaymentController;