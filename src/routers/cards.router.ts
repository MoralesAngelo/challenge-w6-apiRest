import { Router as router } from 'express';
import { type CardsController } from '../controllers/card.controllers.js';
import { type AuthInterceptor } from '../middleware/auth.interceptor.js';

export class CardRouter {
  router = router();

  constructor(
    readonly controller: CardsController,
    readonly authInterceptor: AuthInterceptor
  ) {
    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));
    this.router.post(
      '/',
      authInterceptor.authentication.bind(authInterceptor),
      controller.create.bind(controller)
    );
    this.router.patch(
      '/:id',
      authInterceptor.authentication.bind(authInterceptor),
      controller.update.bind(controller)
    );
    this.router.delete(
      '/:id',
      authInterceptor.authentication.bind(authInterceptor),
      controller.delete.bind(controller)
    );
  }
}
