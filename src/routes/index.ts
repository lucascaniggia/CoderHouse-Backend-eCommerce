import args from 'args';
import { fork } from 'child_process';
import express, { Request, Response } from 'express';
import productRouter from './product';
import cartRouter from './cart';
import loginRouter from './login';
import { isLoggedIn } from 'middlewares/auth';
import { IntObject } from 'common/interfaces';
import { getRandomNums } from 'utils/getRandomNums';
import path from 'path';

const Router = express.Router();

Router.use('/auth', loginRouter);
Router.use('/products', isLoggedIn, productRouter);
Router.use('/cart', isLoggedIn, cartRouter);

Router.use('/info', (req: Request, res: Response) => {
  const flags = args.parse(process.argv);
  const info = {
    args: flags,
    os: process.platform,
    nodeVersion: process.version,
    memory: process.memoryUsage(),
    processId: process.pid,
    folder: process.cwd(),
  };

  res.json({ data: info });
});

Router.use('/randoms', (req: Request, res: Response) => {
  const { cant } = req.query;
  const numberQty = cant || String(100000000);
  const scriptPath = path.resolve(
    __dirname,
    '../../build/src/utils/getRandomNums.js',
  );

  const numData = fork(scriptPath, [numberQty as string]);
  numData.send('start');
  numData.on('message', result => {
    res.json({ data: result });
  });
});

export default Router;
