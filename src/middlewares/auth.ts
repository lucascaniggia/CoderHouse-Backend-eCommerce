// import passport from 'passport';
// import passportLocal, { IStrategyOptionsWithRequest } from 'passport-local';
// import { UserModel } from 'models/mongodb/user';
// import { CartModel } from 'models/mongodb/cart';
// import { NextFunction, Request, Response } from 'express';
// import { IntUser } from 'common/interfaces';
// import { UnauthorizedRoute } from 'errors';
// import { isValidUser } from 'utils/validations';

import passport from 'passport';
import {
  Strategy as FaceBookStrategy,
  VerifyFunction,
  StrategyOption,
} from 'passport-facebook';
import Config from 'config';
import { NextFunction, Request, Response } from 'express';
import { UnauthorizedRoute } from 'errors';
import { Email } from 'services/email';
import { logger } from 'utils/logger';

const strategyOptions: StrategyOption = {
  clientID: Config.FACEBOOK_APP_ID,
  clientSecret: Config.FACEBOOK_APP_SECRET,
  callbackURL: '/api/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'emails'],
};
const loginFunc: VerifyFunction = async (
  accessToken,
  refreshToken,
  profile,
  done,
) => {
  const gmailService = new Email('gmail');
  const etherealService = new Email('ethereal');
  const content = `<p> ${profile.displayName}, ${new Date()}</p>`;

  let profilePic = '';
  let email = '';
  if (profile.photos) profilePic = profile.photos[0].value;
  if (profile.emails) email = profile.emails[0].value;

  await etherealService.sendEmail(Config.ETHEREAL_EMAIL, 'log in', content);
  const response = await gmailService.sendEmail(
    email,
    'Log in',
    content,
    profilePic,
  );
  logger.info('Gmail response: %0', response);
  return done(null, profile);
};

passport.use(new FaceBookStrategy(strategyOptions, loginFunc));
passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj: string, cb) {
  cb(null, obj);
});
export const isLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.isAuthenticated()) throw new UnauthorizedRoute(401, 'No Autorizado');
  next();
};
export default passport;

// interface User {
//   _id?: string;
// }

// const LocalStrategy = passportLocal.Strategy;

// const strategyOptions: IStrategyOptionsWithRequest = {
//   usernameField: 'email',
//   passwordField: 'password',
//   passReqToCallback: true,
// };

// const loginFunc = async (
//   req: Request,
//   email: string,
//   password: string,
//   done: (
//     err: unknown,
//     user?: Express.User | false | null,
//     msg?: { message: string },
//   ) => void,
// ) => {
//   const user = (await UserModel.findOne({ email })) as IntUser;
//   if (!user) {
//     return done(null, false);
//   }
//   if (!(await user.isValidPassword(password))) {
//     return done(null, false);
//   }
//   logger.info('Logged in successfully');
//   return done(null, user);
// };

// const signUpFunc = async (
//   req: Request,
//   email: string,
//   password: string,
//   done: (
//     err: unknown,
//     user?: Express.User | false | null,
//     msg?: { message: string },
//   ) => void,
// ) => {
//   try {
//     const { email, password, name, address, age, telephone } = req.body;
//     const userData = {
//       email,
//       password,
//       name,
//       address,
//       age: Number(age),
//       telephone,
//       photo: req.file?.path || '',
//     };

//     isValidUser(userData);

//     const user = await UserModel.findOne({ email });
//     if (user) {
//       logger.warn('User already exists');
//       logger.info(user);
//       return done(null, false, {
//         message: 'Email you chose already exists. Please enter another email',
//       });
//     } else {
//       const newUser = new UserModel(userData);
//       const cartUser = new CartModel({
//         user: newUser._id,
//         products: [],
//       });
//       newUser.cart = cartUser._id;

//       await newUser.save();
//       await cartUser.save();
//       logger.info('Signed Up successfully');
//       return done(null, newUser);
//     }
//   } catch (error) {
//     done(error);
//   }
// };

// passport.use('login', new LocalStrategy(strategyOptions, loginFunc));
// passport.use('signup', new LocalStrategy(strategyOptions, signUpFunc));

// passport.serializeUser((user: User, done) => {
//   done(null, user._id);
// });

// passport.deserializeUser((userId, done) => {
//   UserModel.findById(userId, function (err: unknown, user: IntUser) {
//     done(err, user);
//   });
// });

// export const isLoggedIn = (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): void => {
//   if (!req.isAuthenticated())
//     throw new UnauthorizedRoute(401, 'Not Authorized.');

//   next();
// };

// export default passport;
