import { Injectable } from '@nestjs/common';
import { envs } from 'src/config';
import Stripe from 'stripe';
import { PaymentSessionDTO } from './dto/payment-session.dto';
import { Request, Response } from 'express';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(envs.stripeSecret);

  async createPaymentSession(paymentSessionDTO: PaymentSessionDTO) {
    const { currency, items } = paymentSessionDTO;

    const line_items = items.map((item) => {
      return {
        price_data: {
          currency: currency,
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), //Math para quitar decimales
        },
        quantity: item.quantity,
      };
    });

    const session = await this.stripe.checkout.sessions.create({
      // #Colocar aquì el ID de la orden
      payment_intent_data: {
        metadata: {},
      },

      // #Colocar los items que las personas estàn comprando
      line_items: line_items,

      //# modalidad
      mode: 'payment',
      success_url: 'http://localhost:3000/payments/success',
      cancel_url: 'http://localhost:3000/payments/cancel',
    });

    return session;
  }
 
  async stripeWebhook(req: Request, res: Response) {
    const sig = req.headers['stripe-signature'];
    
    let event: Stripe.Event;

    // This is your Stripe CLI webhook secret for testing your endpoint locally.
    const endpointSecret = envs.stripeEndpointSecret;

    try {
      event = this.stripe.webhooks.constructEvent(req['rawBody'], sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    console.log({event})

    return res.status(200).json({ sig });

  }
}
