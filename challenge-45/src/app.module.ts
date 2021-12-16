import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './products/dto/products.schema';
import * as dotenv from 'dotenv';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_ATLAS_SRV),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    MongooseModule.forFeatureAsync([
      {
        name: 'Product',
        useFactory: () => {
          const schema = ProductSchema;
          schema.plugin(require('mongoose-unique-validator'), {
            message: 'Code already exists, please enter a valid code.',
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [AppController, ProductsController],
  providers: [AppService, ProductsService],
})
export class AppModule {}