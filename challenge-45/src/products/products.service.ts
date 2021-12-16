import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDTO } from './dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<ProductDTO>,
  ) {}

  async getAll(): Promise<ProductDTO[]> {
    return this.productModel.find();
  }

  async getProduct(idProduct: string): Promise<ProductDTO> {
    return this.productModel.findById(idProduct);
  }

  async createProduct(product: ProductDTO): Promise<ProductDTO> {
    const newProduct = new this.productModel(product);
    return await newProduct.save();
  }

  async editProduct(
    idProduct: string,
    product: ProductDTO,
  ): Promise<ProductDTO> {
    return this.productModel.findByIdAndUpdate(idProduct, product, {
      new: true,
    });
  }

  async deleteProduct(idProduct: string): Promise<void> {
    await this.productModel.findByIdAndDelete(idProduct);
  }
}