import express from 'express';
import 'dotenv/config.js';
import cors from 'cors';
import path from 'path';
// import http from 'http';
import routes from 'routes';
// import { wsServerInit } from '/services/socket';
import { unknownEndpoint } from 'middlewares/unknownEndpoint';
// import { mySqlDbServ } from '/services/mySqlDB';
// import { sqLiteDbService } from '/services/sqlite';
import { mongoDBServ } from 'services/mongodb';

const app: express.Application = express();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
server.on('error', (error) => console.log(`Server error: ${error}`));

// mySqlDbServ.init();
// sqLiteDbService.init();
// mongoDBServ.init();

app.use(express.static(path.resolve(__dirname, '../', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', routes);

app.use(unknownEndpoint);