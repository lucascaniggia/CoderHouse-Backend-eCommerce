import { IntMessage } from '/common/interfaces';
import knex, { Knex } from 'knex';
import dbConfig from '/../knexFile';

class SqLiteSb {
  public connection: Knex;
  public messages: IntMessage[];
  constructor() {
    const environment = 'local';
    console.log(`SETTING ${environment} DB`);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const options = dbConfig[environment];
    this.connection = knex(options);
    this.messages = [
      { email: 'lucas@gmail.com', text: 'Hola! Como estan?' },
      { email: 'juan@gmail.com', text: 'Muy bien. Y vos?' },
      { email: 'conrado@gmail.com', text: 'Perfecto!' },
    ];
  }

  init() {
    this.connection.schema.hasTable('messages').then((exists) => {
      if (!exists) {
        this.connection.schema
          .createTable('messages', (messagesTable) => {
            messagesTable.increments();
            messagesTable.string('email').notNullable();
            messagesTable.string('text').notNullable();
            messagesTable.timestamp('date').defaultTo(this.connection.fn.now());
          })
          .then(() => {
            console.log('Messages table created');
            this.create('messages', this.messages);
            console.log('Messages added');
          });
      }
    });
  }

  get(tableName: string, id?: number) {
    if (id) return this.connection(tableName).where('id', id);
    return this.connection(tableName);
  }

  async create(tableName: string, data: IntMessage | IntMessage[]) {
    const newMessageId = await this.connection(tableName).insert(data);
    return this.get(tableName, newMessageId[0]);
  }
}

export const sqLiteDbService = new SqLiteSb();