import express from 'express';
import cors from 'cors';
import path from 'path';
import * as http from 'http';
import Router from '../routes';
import { unknownEndpoint } from '../middlewares/unknownEndpoint';

const app: express.Application = express();

app.use(express.static(path.resolve(__dirname, '../', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', Router);

app.use(unknownEndpoint);

const Server = new http.Server(app);

export default Server;
