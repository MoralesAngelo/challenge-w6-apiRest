import { type Request, type Response } from 'express';
// import { type UserDto } from '../entities(models)/user';

import { UsersMemoryRepository } from '../repositories/users.repo.js';
import { User } from '../entities/users.js';

export class UserController {
  constructor(private repo: UsersMemoryRepository) {}

  getAll(req: Request, res: Response) {
    const result = this.repo.readAll();
    res.json(result);
  }

  getById(req: Request, res: Response) {
    const { id } = req.params;
    const result = this.repo.readById(id);
    res.json(result);
  }

  create(req: Request, res: Response) {
    const data = req.body as User;
    const result = this.repo.create(data);
    res.json(result);
  }

  update(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body as User;
    const result = this.repo.update(id, data);
    res.json(result);
  }

  delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = this.repo.delete(id);
    res.json(result);
  }
}
