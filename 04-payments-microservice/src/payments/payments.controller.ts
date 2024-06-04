import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentSessionDTO } from './dto/payment-session.dto';

@Controller('payments')
export class PaymentsController {
  
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-session')
  createPaymentSession(@Body() paymentSessionDTO: PaymentSessionDTO){ 
    return this.paymentsService.createPaymentSession(paymentSessionDTO);
  }

  @Get('success')
  success(){
    return {
      ok:true, 
      message: 'Payment successful'
    }
  }

  @Get('cancel')
  cancel(){
    return {
      ok:false, 
      message: 'Payment cancelled'
    }
  }

  @Post('webhook')
  async stripeWebhook(){
    return 'stripeWebhook';
  }
 
}
