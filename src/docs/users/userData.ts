export default {
  get: {
    tags: ['User'],
    description: "Loggedin user's data.",
    operationId: 'userData',
    parameters: [],
    responses: {
      200: {
        description: 'Get logged in user data.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UserData',
            },
          },
        },
      },
      404: {
        description: "There's no user logged in.",
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
