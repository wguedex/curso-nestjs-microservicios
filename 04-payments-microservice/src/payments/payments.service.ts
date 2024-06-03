import { Injectable } from '@nestjs/common';
import { envs } from 'src/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {

    private readonly stripe = new Stripe(envs.stripeSecret)


    async createPaymentSession(){
        const session = await this.stripe.checkout.sessions.create({
            
            // #Colocar aquì el ID de la orden
            payment_intent_data: {
                metadata: {}
            }, 

            // #Colocar los items que las personas estàn comprando
            line_items:[
            {
                price_data:{
                    currency:'usd', 
                    product_data:{
                        name:'T-Shirt'
                    }, 
                    unit_amount: 2000, //2000 / 100 equivale a 20.00 dolares 
                }, 
                quantity: 2
            }
            ], 

            //# modalidad
            mode: 'payment', 
            success_url: 'http://localhost:3000/payments/success', 
            cancel_url: 'http://localhost:3000/payments/cancel'

        })

        return session;
    }
    

}
