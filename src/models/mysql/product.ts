import knex, { Knex } from 'knex';
import { IntItem, IntKnex } from 'common/interfaces';
import { NotFound } from 'errors';
import dbConfig from './../../../knexFile';
import { productsMock } from 'mocks/products';

export class ProductsModelMySQL {
  private connection: Knex;
  constructor(dbType: 'mysql' | 'sqlite') {
    const environment = dbType === 'mysql' ? process.env.NODE_ENV || 'development' : 'development2';
    const configDb: IntKnex = dbConfig;
    const options = configDb[environment];
    this.connection = knex(options);
    console.log(`MySQL DB ${environment} set up.`);
    this.connection.schema.hasTable('products').then((exists) => {
      if (!exists) {
        this.connection.schema.createTable('products', (productsTable) => {
          productsTable.increments();
          productsTable.string('name').notNullable();
          productsTable.string('description').notNullable();
          productsTable.string('code').notNullable();
          productsTable.decimal('price', 5, 2).notNullable();
          productsTable.string('photo').notNullable();
          productsTable.timestamp('timestamp').defaultTo(this.connection.fn.now());
          productsTable.integer('stock').notNullable();
        })
        .then(() => {
          console.log('Product\'s Table has been created.');
          this.connection('products').insert(productsMock);
          console.log('Products added.');
        })
        .catch(e => console.log(e));
      }
    });
  }

  async get(id?: string): Promise<IntItem | IntItem[]> {
    try {
      if (id) {
        const product = await this.connection('products').where('id', Number(id));
        return product[0];
      }
      return this.connection('products');
    } catch (e) {
      throw { error: e, message: 'An error occurred when loading products' };
    }
  }

  async save(product: IntItem): Promise<IntItem> {
    try {
      const newProductID = await this.connection('products').insert(product);
      const newProduct = this.get(((newProductID[0] as unknown) as string));
      return (newProduct as unknown) as IntItem;
    } catch (e) {
      throw { error: e, message: 'Product could not be saved.' };
    }
  }

  async update(id: string, product: IntItem): Promise<IntItem> {
    try {
      await this.connection('products').where('id', Number(id)).update(product);
      const updatedProduct = await this.get(id);
      if (updatedProduct) {
        return updatedProduct as IntItem;
      } else {
        throw new NotFound('Product to update does not exist.');
      }
    } catch (e) {
      if (e instanceof NotFound) {
        throw e;
      } else {
        throw { error: e, message: 'Product could not be updated.' };
      }
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const deletedProduct = await this.connection('products').where('id', Number(id)).del();
      if (!deletedProduct) {
        throw new NotFound('Product to update does not exist.');
      }
    } catch (e) {
      if (e instanceof NotFound) {
        throw e;
      } else {
        throw { error: e, message: 'Product could not be deleted.' };
      }
    }
  }
}