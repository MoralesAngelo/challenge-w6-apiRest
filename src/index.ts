import { createServer } from 'http';
import 'dotenv/config';
import { createApp } from './app.js';
import createDebug from 'debug';

const debug = createDebug('W7*:server');
debug('staring server');
const port = process.env.PORT ?? 3500; // en el package json se le asigna el puerto (opcional)
const server = createServer(createApp()); // montamos server
server.listen(port);

server.on('error', (error) => {
  debug('error', error);
  process.exit(1);
});

server.on('listening', () => {
  debug(`Server  express is running in port ${port}`);
});
