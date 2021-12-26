import asyncHandler from 'express-async-handler';
import { Router } from 'express';
import { isAdmin } from 'middlewares/checkAdmin';
import { isLoggedIn } from 'middlewares/auth';
import { imageUpload } from 'middlewares/uploadImg';
import {
  getUser,
  getUsers,
  addUser,
  // updateUser,
  // deleteUser,
  getLoggedInUserData,
} from 'controllers/users';

const userRouter = Router();

userRouter.get('/', isLoggedIn, isAdmin, asyncHandler(getUsers));
userRouter.get('/:id', isLoggedIn, isAdmin, asyncHandler(getUser));
userRouter.get('/loggedUser/data', asyncHandler(getLoggedInUserData));
userRouter.post('/signup', imageUpload, addUser);
// userRouter.put('/:id', isLoggedIn, asyncHandler(updateUser));
// userRouter.delete('/:id', isLoggedIn, asyncHandler(deleteUser));

export default userRouter;
