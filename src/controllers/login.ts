import { Request, Response } from 'express';

export const loginUser = (req: Request, res: Response): void => {
  res.json({ data: { message: 'Welcome.', user: req.user } });
};

export const signUpUser = (req: Request, res: Response): void => {
  res.json({ data: { message: 'User sign up completed successfully.' } });
};

export const logoutUser = (req: Request, res: Response): void => {
  req.session.destroy(err => {
    if (err)
      res.status(500).json({ message: 'An error occurred unexpectedly.' });
    else {
      res.json({ message: 'Log out successfully.' });
    }
  });
};
