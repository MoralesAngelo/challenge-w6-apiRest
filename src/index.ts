import { createServer } from 'http';
import 'dotenv/config';
import { app } from './app.js';
import createDebug from 'debug';

const debug = createDebug('W6*:server');

const port = process.env.PORT ?? 3500;
const server = createServer(app);
server.listen(port);

server.on('error', (error) => {
  debug('error', error);
  process.exit(1);
});

server.on('listening', () => {
  debug(`Server  express is running in port ${port}`);
});
