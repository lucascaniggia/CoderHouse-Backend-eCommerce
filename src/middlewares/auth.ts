import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import passportLocal, { IStrategyOptionsWithRequest } from 'passport-local';
import Config from 'config';
import { UserModel } from 'models/mongodb/user';
import { CartModel } from 'models/mongodb/cart';
import { IntUser } from 'common/interfaces';
import { UnauthorizedRoute, UserValidation } from 'errors';
import { signUpValidation } from 'utils/validations';
import { logger } from 'services/logger';
import { EmailService } from 'services/email';

interface User {
  _id?: string;
}

const LocalStrategy = passportLocal.Strategy;

const strategyOptions: IStrategyOptionsWithRequest = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
};

const loginFunc = async (
  req: Request,
  email: string,
  password: string,
  done: (
    err: unknown,
    user?: Express.User | false | null,
    msg?: { message: string },
  ) => void,
) => {
  const user = (await UserModel.findOne({ email })) as IntUser;
  if (!user) {
    logger.warn('Wrong user');
    return done(null, false);
  }
  if (!(await user.isValidPassword(password))) {
    logger.warn('Wrong password');
    return done(null, false);
  }
  logger.info('Logged in successfully');
  return done(null, user);
};

const signUpFunc = async (
  req: Request,
  email: string,
  password: string,
  done: (
    err: unknown,
    user?: Express.User | false | null,
    msg?: { message: string },
  ) => void,
) => {
  try {
    const { email, password, repeatPassword, name, address, age, telephone } =
      req.body;
    const userData = {
      email,
      password,
      repeatPassword,
      name,
      address,
      age: Number(age),
      telephone,
      photo: req.file?.path || '',
    };

    const { error } = signUpValidation(userData);

    if (error) {
      throw new UserValidation(400, error.details[0].message);
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      logger.warn('User already exists');
      logger.info(user);
      return done(null, false, {
        message: 'Email you chose already exists. Please enter another email',
      });
    } else {
      const newUser = new UserModel(userData);
      const cartUser = new CartModel({
        user: newUser._id,
        products: [],
      });
      newUser.cart = cartUser._id;

      await newUser.save();
      await cartUser.save();
      logger.info('Signed Up successfully');
      const emailContent = `
        <h1>New User Registration</h1>
        <span style="display: block"><span style="font-weight: bold">Email:</span> ${userData.email}</span>
        <span style="display: block"><span style="font-weight: bold">Nombre:</span> ${userData.name}</span>
        <span style="display: block"><span style="font-weight: bold">Direccion:</span> ${userData.address}</span>
        <span style="display: block"><span style="font-weight: bold">Edad:</span> ${userData.age}</span>
        <span style="display: block"><span style="font-weight: bold">Teléfono:</span> ${userData.telephone}</span>
      `;

      EmailService.sendEmail(
        Config.GMAIL_EMAIL,
        'New Sign Up',
        emailContent,
        userData.photo,
      );
      logger.info('Email sent to administrator');
      return done(null, newUser);
    }
  } catch (error) {
    done(error);
  }
};

passport.use('login', new LocalStrategy(strategyOptions, loginFunc));
passport.use('signup', new LocalStrategy(strategyOptions, signUpFunc));

passport.serializeUser((user: User, done) => {
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  UserModel.findById(userId, function (err: unknown, user: IntUser) {
    done(err, user);
  });
});

export const isLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.isAuthenticated())
    throw new UnauthorizedRoute(401, 'Not Authorized.');

  next();
};

export default passport;
