import { createServer } from 'http';
import 'dotenv/config';
import { createApp, startApp } from './app.js';
import createDebug from 'debug';
import { dbConnect } from './db/db.connect.js';

const debug = createDebug('W7*:server');
debug('staring server');

const port = process.env.PORT ?? 3500; // en el package json se le asigna el puerto (opcional)

const app = createApp();
const server = createServer(app);

dbConnect()
  .then((prismaClient) => {
    startApp(app, prismaClient);
    server.listen(port);
  })
  .catch((error) => {
    server.emit('error', error);
  });

server.on('error', (error) => {
  debug('error', error);
  process.exit(1);
});

server.on('listening', () => {
  debug(`Server  express is running in port ${port}`);
});
