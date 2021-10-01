import { EnumErrorCodes } from 'common/enums';
import { Request, Response } from 'express';

declare module 'express-session' {
  interface SessionData {
    loggedIn: boolean;
  }
}

const myUser = 'lucacaniggia';
const myPass = 'coderhouse';

export const loginSession = (req: Request, res: Response): void => {
  const data = req.body;

  if (data.name === myUser && data.password === myPass) {
    req.session.loggedIn = true;
    res.json({
      data: {
        name,
      },
      msg: 'Welcome',
    });
  } else {
    res.status(401).json({
      error: `-${EnumErrorCodes.UnauthRoute}`,
      message: 'You do not have authorization',
    });
  }
};

export const loginUser = (req: Request, res: Response): void => {
  const { name } = req.body;

  if (name) {
    req.session.loggedIn = true;
    res.json({
      data: {
        name,
      },
      msg: 'Welcome',
    });
  } else {
    res.status(401).json({
      error: `-${EnumErrorCodes.UnauthRoute}`,
      message: 'You do not have authorization',
    });
  }
};

export const logoutUser = (req: Request, res: Response): void => {
  req.session.destroy(err => {
    if (err) res.status(500).json({ msg: 'An error occurred unexpectedly.' });
    else {
      res.json({ msg: 'Session destroyed successfully.' });
    }
  });
};
