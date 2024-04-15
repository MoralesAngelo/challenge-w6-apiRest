import { Router as createRouter } from 'express';
import { type UserController } from '../controllers/user.controllers.js';
import createDebug from 'debug';

const debug = createDebug('W6*:router');

export class usersRouter {
  router = createRouter();

  constructor(private readonly controller: UserController) {
    debug('instantiated sport router');
    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));
    this.router.post('/', controller.create.bind(controller));
    this.router.patch('/:id', controller.update.bind(controller));
    this.router.delete('/:id', controller.delete.bind(controller));
  }
}
