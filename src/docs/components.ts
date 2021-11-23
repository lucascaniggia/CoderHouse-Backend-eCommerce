export default {
  components: {
    schemas: {
      id: {
        type: 'string',
        description: 'An id of a product',
        example: 'fae019a0-a19c-4dc6-a0f3-056a14acf9c5',
      },
      Products: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/Product',
        },
      },
      ProductsCart: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/ProductCart',
        },
      },
      Product: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Product identification id',
            example: 'fae019a0-a19c-4dc6-a0f3-056a14acf9c5',
          },
          name: {
            type: 'string',
            description: 'Product name',
            example: 'PFCH-2856-2940',
          },
          description: {
            type: 'string',
            description: 'Product description',
            example:
              'Lorem ipsum dolor sit amet, nam fierent perfecto ea, pro in albucius oportere accommodare. Ius everti consectetuer et, meis mutat.',
          },
          code: {
            type: 'string',
            description: 'Product code',
            example: 'PFCH-2856-2940',
          },
          price: {
            type: 'number',
            description: 'Product price',
            example: '120.68',
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
            example: 'Test Product',
          },
          description: {
            type: 'string',
            description: 'Product description',
            example:
              'Lorem ipsum dolor sit amet, nam fierent perfecto ea, pro in albucius oportere accommodare. Ius everti consectetuer et, meis mutat.',
          },
          code: {
            type: 'string',
            description: 'Product code',
            example: 'PFCH-2856-2940',
          },
          price: {
            type: 'number',
            description: 'Product price',
            example: '120.68',
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
      ProductCart: {
        type: 'object',
        properties: {
          product: {
            $ref: '#/components/schemas/Product',
          },
          quantity: {
            type: 'number',
            description: 'Amount of this product in the cart.',
            example: '1',
          },
        },
      },
      ProductCartEdit: {
        type: 'object',
        properties: {
          productId: {
            $ref: '#/components/schemas/id',
          },
          amount: {
            type: 'number',
            description: 'New desired amount of product to add to cart',
            example: '5',
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            description: 'Error internal code.',
            example: '-4',
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
              'Error: -4, Message: Product does not exist on cart., Stack: NotFound: Product does not exist on cart.     at new BaseError (/Users/mac/Desktop/Prog BackEnd | Coderhouse/Proyecto Final/src/errors/index.ts:13:11)     at new NotFound (/Users/mac/Desktop/Prog BackEnd | Coderhouse/Proyecto Final/src/errors/index.ts:36:5)    at CartModelMongoDB.<anonymous> (/Users/mac/Desktop/Prog BackEnd | Coderhouse/Proyecto Final/src/models/mongodb/cart.ts:72:20)    at Generator.next (<anonymous>)    at fulfilled (/Users/mac/Desktop/Prog BackEnd | Coderhouse/Proyecto Final/src/models/mongodb/cart.ts:5:58)    at runMicrotasks (<anonymous>)    at processTicksAndRejections (internal/process/task_queues.js:93:5)',
          },
          description: {
            type: 'string',
            description: 'Error description, it can exist or not.',
            example: 'The following fields are missing: name.',
          },
        },
      },
    },
  },
};
