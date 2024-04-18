import { type NextFunction, type Request, type Response } from 'express';
import { type Card, type CardDto } from '../entities/cards.js';
import {
  cardCreateDtoSchema,
  cardUpdateDtoSchema,
} from '../entities/cards.schema.js';
import { type Repo } from '../repositories/type.repo.js';
import { BaseController } from './Base.controllers.js';
import { Payload } from '../services/auth.services.js';

export class CardsController extends BaseController<Card, CardDto> {
  constructor(protected readonly repo: Repo<Card, CardDto>) {
    super(repo, cardCreateDtoSchema, cardUpdateDtoSchema);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    req.body.cardId = (req.body.payload as Payload).id;

    const { payload, ...rest } = req.body;
    req.body = rest;
    await super.create(req, res, next);
  }
}
