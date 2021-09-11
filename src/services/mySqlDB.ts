import { IntItem } from '/common/interfaces.js';
import knex, { Knex } from 'knex';
import dbConfig from '/../knexFile';

class MySqlDb {
  public connection: Knex;
  constructor() {
    const environment = process.env.NODE_ENV || 'development';
    console.log(`SETTING ${environment} DB`);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const options = dbConfig[environment];
    this.connection = knex(options);
  }

  init() {
    this.connection.schema.hasTable('products').then((exists) => {
      if (!exists) {
        this.connection.schema
          .createTable('products', (productsTable) => {
            productsTable.increments();
            productsTable.string('name').notNullable();
            productsTable.string('description').notNullable();
            productsTable.string('code').notNullable();
            productsTable.decimal('price', 7, 3).notNullable();
            productsTable.string('photo').notNullable();
            productsTable.timestamp('timestamp').defaultTo(this.connection.fn.now());
            productsTable.integer('stock').notNullable();
          })
          .then(() => {
            console.log('Products table created.');
          });
      }
    });
  }

  get(tableName: string, id?: number) {
    if (id) return this.connection(tableName).where('id', id);
    return this.connection(tableName);
  }

  async create(tableName: string, data: IntItem) {
    const newProductId = await this.connection(tableName).insert(data);
    return this.get(tableName, newProductId[0]);
  }

  async update(tableName: string, id: number, data: IntItem) {
    await this.connection(tableName).where('id', id).update(data);
    return this.get(tableName, id);
  }

  delete(tableName: string, id: number) {
    return this.connection(tableName).where('id', id).del();
  }
}

export const mySqlDbServ = new MySqlDb();