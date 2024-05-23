import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common'; 
import { ClientProxy } from '@nestjs/microservices';
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
  findOne(@Param('id') id: string) {
      return 'Esta función regresa el producto ' + id;
  }
  
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
