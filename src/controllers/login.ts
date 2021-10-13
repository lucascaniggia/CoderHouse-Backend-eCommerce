import { Request, Response } from 'express';

type Photos = {
  value: string;
};

type Emails = {
  value: string;
};

interface User extends Express.User {
  displayName?: string;
  photos?: Photos[];
  emails?: Emails[];
}

export const loginUser = (req: Request, res: Response): void => {
  res.json({ data: { message: 'Welcome.', user: req.user } });
};

export const signUpUser = (req: Request, res: Response): void => {
  res.json({ data: { message: 'User sign up completed successfully.' } });
};

export const userData = (req: Request, res: Response): void => {
  const userInfo = {
    name: '',
    photo: 'noPhotoFound',
    email: 'noEmailFound',
  };

  if (req.isAuthenticated()) {
    const userData: User = req.user;

    if (userData.photos) userInfo.photo = userData.photos[0].value;

    if (userData.emails) userInfo.email = userData.emails[0].value;

    if (userData.displayName) userInfo.name = userData.displayName;

    res.json({ data: userInfo });
  } else {
    res.json({ data: { message: 'Invalid user', error: true } });
  }
};

export const logoutUser = (req: Request, res: Response): void => {
  req.logOut();
  req.session.destroy(err => {
    if (err)
      res.status(500).json({ message: 'An error occurred unexpectedly.' });
    else {
      res.json({ message: 'Log out successfully.' });
    }
  });
};
