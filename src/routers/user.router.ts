import { Router as router } from 'express';
import { UserController } from '../controllers/user.controllers.js';
import { UsersMemoryRepository } from '../repositories/users.repo.js';

export const userRouter = router();
const userRepo = new UsersMemoryRepository();
const userController = new UserController(userRepo);
userRouter.get('/', userController.getAll.bind(userController));
userRouter.get('/:id', userController.getById.bind(userController));
userRouter.post('/', userController.create.bind(userController));
userRouter.patch('/:id', userController.update.bind(userController));
userRouter.delete('/:id', userController.delete.bind(userController));
