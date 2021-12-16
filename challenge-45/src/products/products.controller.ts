import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductDTO } from './dto/products.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  getAllProducts(): Promise<ProductDTO[]> {
    return this.productService.getAll();
  }
  @Get(':id')
  getProduct(@Param('id') idProduct): Promise<ProductDTO> {
    return this.productService.getProduct(idProduct);
  }

  @Post()
  @UsePipes(ValidationPipe)
  saveProduct(@Body() product: ProductDTO): Promise<ProductDTO> {
    return this.productService.createProduct(product);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  editProduct(
    @Param('id') idProduct: string,
    @Body() product: ProductDTO,
  ): Promise<ProductDTO> {
    return this.productService.editProduct(idProduct, product);
  }

  @Delete(':id')
  deleteProduct(@Param('id') idProduct: string): Promise<void> {
    return this.productService.deleteProduct(idProduct);
  }
}