import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { usersRouter } from './routers/users.router.js';
import { UsersFsRepository } from './repositories/users.fs.repo.js';
import { UserController } from './controllers/user.controllers.js';

export const createApp = () => {
  const app = express();

  app.use(express.json());

  app.use(morgan('dev'));

  app.use(cors());

  app.use(express.static('public')); // accede al carpeta indicada 'public'

  const userRepo = new UsersFsRepository();
  const userController = new UserController(userRepo);
  const userRouter = new usersRouter(userController);
  app.use('/users', userRouter.router);

  return app;
};
