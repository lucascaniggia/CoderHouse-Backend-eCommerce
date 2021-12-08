import { UserExists, UserNotLoggedIn } from 'errors';
import { NextFunction, Request, Response } from 'express';
import passport from 'middlewares/auth';
import { logger } from 'services/logger';

interface User {
  email: string;
  name: string;
  address: string;
  age: number;
  telephone: string;
  photo: string;
}

export const loginUser = (req: Request, res: Response): void => {
  let userData;
  if (req.user) {
    const { email, name, address, age, telephone, photo } = req.user as User;
    userData = { email, name, address, age, telephone, photo };
  }
  res.json({ data: { message: 'Welcome.', user: userData } });
};

export const signUpUser = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  passport.authenticate('signup', function (err, user, info) {
    if (err) {
      logger.warn('An error occurred when registering user.');
      return next(err);
    }
    if (!user) {
      throw new UserExists(400, info.message);
    }
    res
      .location(`/api/users/${user.id}`)
      .status(201)
      .json({ message: 'Login successful' });
  })(req, res, next);
};

export const logoutUser = (req: Request, res: Response): void => {
  req.session.destroy(err => {
    if (err)
      res.status(500).json({ message: 'An error occurred unexpectedly' });
    else {
      res.clearCookie('connect.sid');
      res.json({ message: 'Logout successful' });
    }
  });
};

export const userData = (req: Request, res: Response): void => {
  if (req.isAuthenticated()) {
    const { email, name, address, age, telephone, photo } = req.user as User;
    const userData = { email, name, address, age, telephone, photo };
    res.json({ data: userData });
  } else {
    throw new UserNotLoggedIn(404, 'User not logged in');
  }
};
