export default {
  post: {
    tags: ['Authentication'],
    description: 'Sign up to the system (add a valid user).',
    operationId: 'signup',
    parameters: [],
    requestBody: {
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                description: 'User email.',
                example: 'test5@example.com',
              },
              password: {
                type: 'string',
                description:
                  'User password, must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
                example: 'Secret5*',
              },
              repeatPassword: {
                type: 'string',
                description:
                  'Password validation. Must be the same as password.',
                example: 'Secret5*',
              },
              name: {
                type: 'string',
                description: 'User name.',
                example: 'Juan Acosta',
              },
              address: {
                type: 'string',
                description: 'User address.',
                example: 'Salta 1840',
              },
              edad: {
                type: 'number',
                description: 'User age.',
                example: '30',
              },
              telephone: {
                type: 'string',
                description: 'User phone number, with international code.',
                example: '+56912345678',
              },
              photo: {
                type: 'string',
                description: 'User profile photo.',
                format: 'binary',
              },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Signed-up successfully .',
      },
      400: {
        description: 'One of the fields values did not pass validation.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
      },
    },
  },
};
