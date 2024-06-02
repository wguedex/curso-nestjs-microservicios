import { Module } from '@nestjs/common'; 
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {  envs } from 'src/config';
import { NATS_SERVICE } from 'src/config/services';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [
    ClientsModule.register([
      { name: NATS_SERVICE, 
        transport: Transport.NATS, 
        options: {servers: envs.natsServers}
        //  { 
        //     host: envs.ordersMicroserviceHost,
        //     port: envs.ordersMicroservicePort 
        // } 
      },
    ]),
  ]  
})
export class OrdersModule {}
