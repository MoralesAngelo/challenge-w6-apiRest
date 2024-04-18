import express, { type Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { usersRouter } from './routers/users.router.js';
// import { UsersFsRepository } from './repositories/users.fs.repo.js';
import { UserController } from './controllers/user.controllers.js';
import { PrismaClient } from '@prisma/client';
import { UsersSqlRepo } from './repositories/users.sql.repo.js';
import { ErrorsMiddleware } from './middleware/errors.middleware.js';
import { error } from 'console';
import { CardSqlRepo } from './repositories/cards.sql.repo.js';

export const createApp = () => {
  return express();
};

export const startApp = (app: Express, prisma: PrismaClient) => {
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.static('public')); // accede al carpeta indicada 'public'

  // const cardRepo = new CardSqlRepo(prisma);
  // const cardController = new cardController(cardRepo);
  // const cardRouter = new cardRouter(cardController);
  // app.use('/cards', cardRouter.router);

  const userRepo = new UsersSqlRepo(prisma);
  const userController = new UserController(userRepo);
  const userRouter = new usersRouter(userController);
  app.use('/users', userRouter.router);

  const errorMiddleware = new ErrorsMiddleware();
  app.use(errorMiddleware.handle.bind(errorMiddleware));
};
