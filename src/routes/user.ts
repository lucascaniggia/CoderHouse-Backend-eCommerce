import asyncHandler from 'express-async-handler';
import { Router } from 'express';
import { isAdmin } from 'middlewares/checkAdmin';
import {
  // validateUserInput,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from 'controllers/users';

const userRouter = Router();

userRouter.get('/', asyncHandler(getUsers));
userRouter.get('/:id', isAdmin, asyncHandler(getUser));
// userRouter.post('/', validateUserInput, asyncHandler(addUser));
userRouter.put('/:id', asyncHandler(updateUser));
userRouter.delete('/:id', asyncHandler(deleteUser));

export default userRouter;
