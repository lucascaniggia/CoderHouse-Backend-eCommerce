import getUser from './getUser';
import getUsers from './getUsers';

export default {
  '/users': {
    ...getUsers,
    //...addUser
  },
  '/users/{id}': {
    ...getUser,
  },
};
