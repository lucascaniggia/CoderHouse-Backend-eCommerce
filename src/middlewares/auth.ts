import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import passportLocal, {
  IStrategyOptionsWithRequest,
  VerifyFunctionWithRequest,
} from 'passport-local';
import Config from 'config';
import { UserModel } from 'models/mongodb/user';
import { IntUser, userJoiSchema } from 'common/interfaces/users';
import { UnauthorizedRoute, UserValidation } from 'errors';
import { logger } from 'services/logger';
import { EmailService } from 'services/email';
import { ValidationError } from 'joi';
import { userAPI } from 'api/user';

interface User {
  _id?: string;
}

const LocalStrategy = passportLocal.Strategy;

const strategyOptions: IStrategyOptionsWithRequest = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
};

const loginFunc: VerifyFunctionWithRequest = async (
  req: Request,
  email: string,
  password: string,
  done,
) => {
  const user = (await UserModel.findOne({ email })) as IntUser;
  if (!user) {
    logger.warn(`Failed login. User ${email} does not exist.`);
    return done(null, false);
  }
  if (!(await user.isValidPassword(password))) {
    logger.warn(`Failed login. Password for ${email} ir wrong.`);
    return done(null, false);
  }
  logger.info('Logged in successfully');
  return done(null, user);
};

const signUpFunc: VerifyFunctionWithRequest = async (
  req: Request,
  email: string,
  password: string,
  done,
) => {
  try {
    const {
      email,
      password,
      repeatPassword,
      name,
      address,
      postalCode,
      number,
      apartment,
      age,
      telephone,
    } = req.body;
    const userData = {
      email,
      password,
      repeatPassword,
      name,
      address,
      postalCode,
      number: number || '',
      apartment: apartment || '',
      age: Number(age),
      telephone,
      photo: req.file?.path || '',
    };

    await userJoiSchema.validateAsync(userData);

    const user = await userAPI.query(email);
    if (user) {
      logger.warn('User already exists');
      logger.info(user);
      return done(null, false, {
        message: 'Email you chose already exists. Please enter another email',
      });
    } else {
      const newUser = await userAPI.addUser(userData);
      logger.info('Signed Up successfully');
      const emailContent = `
        <h1>New User Registration</h1>
        <span style="display: block"><span style="font-weight: bold">Email:</span> ${userData.email}</span>
        <span style="display: block"><span style="font-weight: bold">Name:</span> ${userData.name}</span>
        <span style="display: block"><span style="font-weight: bold">Address:</span> ${userData.address}, ${userData.number} ${userData.apartment}</span>
        <span style="display: block"><span style="font-weight: bold">Código Postal:</span> ${userData.postalCode}</span>
        <span style="display: block"><span style="font-weight: bold">Age:</span> ${userData.age}</span>
        <span style="display: block"><span style="font-weight: bold">Telephone:</span> ${userData.telephone}</span>
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
  } catch (e) {
    if (e instanceof ValidationError) {
      done(new UserValidation(400, e.message));
    } else {
      done(e);
    }
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
    throw new UnauthorizedRoute(
      401,
      'You need to be logged-in to perform this action',
    );

  next();
};

export default passport;
