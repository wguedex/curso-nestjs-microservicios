import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common'; 
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { number } from 'joi';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy)
    {}

  @Post()
  createProduct(){
    return 'Crea un producto';
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
      return this.productsClient.send({cmd:'find_all_products'},paginationDto)
  }
 
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'find_one_product' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

    // try {

    //   const product = await firstValueFrom(
    //     this.productsClient.send({ cmd: 'find_one_product' },{ id })
    //   );
    //   return product;

    // } catch (error) {
    //   throw new RpcException(error);
    // }
  // }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
      return 'Esta función elimina el producto ' + id;
  }
  
  @Patch(':id')
  patchProduct(
    @Param('id') id: string,
    @Body() body: any) {
      return 'Esta función actualiza el producto';
  }

}
