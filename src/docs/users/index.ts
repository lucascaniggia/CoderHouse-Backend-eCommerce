import getUser from './getUser';
import getUsers from './getUsers';
import signup from './signup';
import userData from './userData';

export default {
  '/users': {
    ...getUsers,
    //...addUser
  },
  '/users/loggedUser/data': {
    ...userData,
  },
  '/users/signup': {
    ...signup,
  },
  '/users/{id}': {
    ...getUser,
  },
};
