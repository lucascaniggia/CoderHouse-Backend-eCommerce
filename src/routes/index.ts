import args from 'args';
import os from 'os';
import { fork } from 'child_process';
import express, { Request, Response } from 'express';
import productRouter from './product';
import cartRouter from './cart';
import loginRouter from './login';
import { isLoggedIn } from 'middlewares/auth';
import path from 'path';
import { getRandomNums } from 'utils/getRandomNums';

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
    numCPUs: os.cpus().length,
  };

  res.json({ data: info });
});

Router.use('/randoms', (req: Request, res: Response) => {
  const { cant } = req.query;
  const numberQty = cant || String(100000000);
  const scriptPath = path.resolve(
    __dirname,
    '../../src/utils/getRandomNums.js',
  );

  const flags = args.parse(process.argv);

  if (flags.mode !== 'cluster') {
    console.log('on fork mode');
    const numData = fork(scriptPath, [numberQty as string]);
    numData.send('start');
    numData.on('message', result => {
      res.json({
        data: {
          args: flags,
          processId: process.pid,
          result,
        },
      });
    });
  } else {
    console.log('on cluster mode');
    const result = getRandomNums(Number(numberQty));
    res.json({
      data: {
        args: flags,
        processId: process.pid,
        result,
      },
    });
  }
});

Router.use('/muerte', (req, res) => {
  res.json({ msg: 'OK' });
  console.log(`PID => ${process.pid} will die`);
  process.exit(0);
});

export default Router;
