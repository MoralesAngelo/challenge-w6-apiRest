import express, { type Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { UsersRouter } from './routers/users.router.js';
import { UserController } from './controllers/user.controllers.js';
import { type PrismaClient } from '@prisma/client';
import { UsersSqlRepo } from './repositories/users.sql.repo.js';
import { ErrorsMiddleware } from './middleware/errors.middleware.js';
import { error } from 'console';
import { CardSqlRepo } from './repositories/cards.sql.repo.js';
import { AuthInterceptor } from './middleware/auth.interceptor.js';
import { CardsController } from './controllers/card.controllers.js';
import { CardRouter } from './routers/cards.router.js';

export const createApp = () => {
  return express();
};

export const startApp = (app: Express, prisma: PrismaClient) => {
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.static('public')); // accede al carpeta indicada 'public'

  const authInterceptor = new AuthInterceptor();

  const cardsRepo = new CardSqlRepo(prisma);
  const cardsController = new CardsController(cardsRepo);
  const cardsRouter = new CardRouter(cardsController, authInterceptor);
  app.use('/cards', cardsRouter.router);

  const usersRepo = new UsersSqlRepo(prisma);
  const usersController = new UserController(usersRepo);
  const usersRouter = new UsersRouter(usersController, authInterceptor);
  app.use('/users', usersRouter.router);

  const errorMiddleware = new ErrorsMiddleware();
  app.use(errorMiddleware.handle.bind(errorMiddleware));
};
