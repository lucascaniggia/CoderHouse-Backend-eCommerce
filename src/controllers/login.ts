// import { UserExists, UserNotLoggedIn } from 'errors';
// import { NextFunction, Request, Response } from 'express';
// import passport from 'middlewares/auth';
import { Request, Response } from 'express';
import Config from 'config';
import { Email } from 'services/email';

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
  res.json({ data: { message: 'Welcome!', user: req.user } });
};
export const signupUser = (req: Request, res: Response): void => {
  res.json({ data: { message: 'Sign Up successful' } });
};
export const userData = (req: Request, res: Response): void => {
  const userInfo = {
    name: '',
    photo: 'noPhoto',
    email: 'noEmail',
  };
  if (req.isAuthenticated()) {
    const userData: User = req.user;
    if (userData.photos) userInfo.photo = userData.photos[0].value;
    if (userData.emails) userInfo.email = userData.emails[0].value;
    if (userData.displayName) userInfo.name = userData.displayName;
    res.json({ data: userInfo });
  } else {
    res.json({ data: { message: 'No user', error: true } });
  }
};

export const logoutUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (req.isAuthenticated()) {
    const etherealService = new Email('ethereal');
    const userData: User = req.user;

    const content = `<p> ${userData.displayName}, ${new Date()}</p>`;
    await etherealService.sendEmail(Config.ETHEREAL_EMAIL, 'Log out', content);
  }
  req.session.destroy(err => {
    if (err) res.status(500).json({ message: 'An error has occurred' });
    else {
      res.json({ message: 'Logout successful' });
    }
  });
};

// interface User extends Express.User {
//   email: string;
//   name: string;
//   address: string;
//   age: number;
//   telephone: string;
//   photo: string;
// }

// export const loginUser = (req: Request, res: Response): void => {
//   let userData;
//   if (req.user) {
//     const { email, name, address, age, telephone, photo } = req.user as User;
//     userData = { email, name, address, age, telephone, photo };
//   }
//   res.json({ data: { message: 'Welcome.', user: userData } });
// };

// export const signUpUser = (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): void => {
//   passport.authenticate('signup', function (err, user, info) {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       throw new UserExists(400, info.message);
//     }
//     res.json({ msg: 'Sign Up successful' });
//   })(req, res, next);
// };

// export const logoutUser = (req: Request, res: Response): void => {
//   req.session.destroy(err => {
//     if (err)
//       res.status(500).json({ message: 'An error occurred unexpectedly' });
//     else {
//       res.clearCookie('connect.sid');
//       res.json({ message: 'Logout successful' });
//     }
//   });
// };

// export const userData = (req: Request, res: Response): void => {
//   if (req.isAuthenticated()) {
//     const { email, name, address, age, telephone, photo } = req.user as User;
//     const userData = { email, name, address, age, telephone, photo };
//     res.json({ data: userData });
//   } else {
//     throw new UserNotLoggedIn(404, 'User not logged in');
//   }
// };
