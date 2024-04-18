import { type PrismaClient } from '@prisma/client';
import { HttpError } from '../middleware/errors.middleware.js';
import { type Card, type CardDto } from '../entities/cards.js';
import { type Repo } from './type.repo.js';

const select = {
  id: true,
  name: true,
  brand: true,
  year: true,
};

export class CardSqlRepo implements Repo<Card, CardDto> {
  constructor(private readonly prisma: PrismaClient) {}

  async readAll() {
    const articles = await this.prisma.card.findMany({
      select,
    });
    return articles;
  }

  async readById(id: string) {
    const card = await this.prisma.card.findUnique({
      where: { id },
      select,
    });

    if (!card) {
      throw new HttpError(404, 'Not Found', `card ${id} not found`);
    }

    return card;
  }

  async create(data: CardDto) {
    const newCard = this.prisma.card.create({
      data: data,
      select,
    });
    return newCard;
  }

  async update(id: string, data: Partial<CardDto>) {
    const card = await this.prisma.card.findUnique({
      where: { id },
      select,
    });
    if (!card) {
      throw new HttpError(404, 'Not Found', `card ${id} not found`);
    }

    return this.prisma.card.update({
      where: { id },
      data,
      select,
    });
  }

  async delete(id: string) {
    const card = await this.prisma.card.findUnique({
      where: { id },
      select,
    });
    if (!card) {
      throw new HttpError(
        404,
        'Method not implemented',
        `card ${id} not found`
      );
    }
    return this.prisma.card.delete({
      where: { id },
      select,
    });
  }
}
