export default {
  components: {
    schemas: {
      id: {
        type: 'string',
        description: 'An id of a product',
        example: '61717f366466441a1936e9fa',
      },
      Products: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Product identification id',
              example: '61717f366466441a1936e9fa',
            },
            name: {
              type: 'string',
              description: 'Product name',
              example: 'Tahini Paste',
            },
            description: {
              type: 'string',
              description: 'Product description',
              example:
                'Ac nulla fringilla, suscipit justo in, facilisis velit. Vivamus ac tempus ligula. Donec facilisis augue quis felis vestibulum, vitae semper est egestas.',
            },
            code: {
              type: 'string',
              description: 'Product code',
              example: 'PFCH-1234-1234',
            },
            price: {
              type: 'number',
              description: 'Product price',
              example: '123.4',
            },
            photo: {
              type: 'string',
              description: 'Product image url',
              example: 'https://picsum.photos/300?random=3',
            },
            timestamp: {
              type: 'string',
              description: 'Product time and date of creation',
              example: '21/10/2021 11:54:40',
            },
            stock: {
              type: 'number',
              description: 'Product stock',
              example: '21',
            },
          },
        },
      },
      Product: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Product identification id',
            example: '61717f366466441a1936e9fa',
          },
          name: {
            type: 'string',
            description: 'Product name',
            example: 'Tahini Paste',
          },
          description: {
            type: 'string',
            description: 'Product description',
            example:
              'Ac nulla fringilla, suscipit justo in, facilisis velit. Vivamus ac tempus ligula. Donec facilisis augue quis felis vestibulum, vitae semper est egestas.',
          },
          code: {
            type: 'string',
            description: 'Product code',
            example: 'PFCH-1234-1234',
          },
          price: {
            type: 'number',
            description: 'Product price',
            example: '123.4',
          },
          photo: {
            type: 'string',
            description: 'Product image url',
            example: 'https://picsum.photos/300?random=3',
          },
          timestamp: {
            type: 'string',
            description: 'Product time and date of creation',
            example: '21/10/2021 11:54:40',
          },
          stock: {
            type: 'number',
            description: 'Product stock',
            example: '21',
          },
        },
      },
      ProductInput: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Product name',
            example: 'Tahini Paste',
          },
          description: {
            type: 'string',
            description: 'Product description',
            example:
              'Ac nulla fringilla, suscipit justo in, facilisis velit. Vivamus ac tempus ligula. Donec facilisis augue quis felis vestibulum, vitae semper est egestas.',
          },
          code: {
            type: 'string',
            description: 'Product code',
            example: 'PFCH-1234-1234',
          },
          price: {
            type: 'number',
            description: 'Product price',
            example: '123.4',
          },
          photo: {
            type: 'string',
            description: 'Product image url',
            example: 'https://picsum.photos/300?random=3',
          },
          stock: {
            type: 'number',
            description: 'Product stock',
            example: '21',
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            description: 'Error internal code.',
            example: '-1',
          },
          name: {
            type: 'string',
            description: 'Name of the error class.',
            example: 'NotFound',
          },
          message: {
            type: 'string',
            description: 'Error message.',
            example: 'Product not found',
          },
          stack: {
            type: 'string',
            description: 'Error stack trace',
            example:
              'Error: -4, Message: Product does not exist on cart., Stack: NotFound: Product does not exist on cart.    at new BaseError (/Users/mac/Desktop/Prog BackEnd | Coderhouse/Proyecto Final/src/errors/index.ts:13:11)    at new NotFound (/Users/mac/Desktop/Prog BackEnd | Coderhouse/Proyecto Final/src/errors/index.ts:36:5)    at CartModelMongoDB.<anonymous> (/Users/mac/Desktop/Prog BackEnd | Coderhouse/Proyecto Final/src/models/mongodb/cart.ts:72:20)    at Generator.next (<anonymous>)    at fulfilled (/Users/mac/Desktop/Prog BackEnd | Coderhouse/Proyecto Final/src/models/mongodb/cart.ts:5:58)    at runMicrotasks (<anonymous>)    at processTicksAndRejections (internal/process/task_queues.js:93:5)',
          },
          description: {
            type: 'string',
            description: 'Error description, can be present or not.',
            example: 'The following fields are missing: name',
          },
        },
      },
    },
  },
};
