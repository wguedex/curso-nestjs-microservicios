import { Module } from '@nestjs/common'; 
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config';
import { NATS_SERVICE } from 'src/config/services';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    ClientsModule.register([
      { name: NATS_SERVICE, 
        transport: Transport.NATS, 
        options: {
          servers: envs.natsServers, 
        } },
    ]),
  ]

})
export class ProductsModule {}
