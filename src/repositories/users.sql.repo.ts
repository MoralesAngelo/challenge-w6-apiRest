import { type PrismaClient } from '@prisma/client';
import createDebug from 'debug';
import { HttpError } from '../middleware/errors.middleware.js';
import { type UserCreateDto, type User } from '../entities/user.js';
import { type Repo } from './type.repo.js';
const debug = createDebug('W7E:articles:repository:sql');

const select = {
  id: true,
  name: true,
  email: true,
};

export class UsersSqlRepo implements Repo<User, UserCreateDto> {
  constructor(private readonly prisma: PrismaClient) {
    debug('Instantiated articles fs repository');
  }

  async readAll() {
    return this.prisma.user.findMany({
      select,
    });
  }

  async readById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select,
    });

    if (!user) {
      throw new HttpError(404, 'Not Found', `User ${id} not found`);
    }

    return user;
  }

  async create(newData: UserCreateDto) {
    const newUser = this.prisma.user.create({
      data: newData,
      select,
    });
    return newUser;
  }

  async update(id: string, data: Partial<UserCreateDto>) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select,
    });
    if (!user) {
      throw new HttpError(404, 'Not Found', `Article ${id} not found`);
    }

    return this.prisma.user.update({
      where: { id },
      data,
      select,
    });
  }

  async delete(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select,
    });
    if (!user) {
      throw new HttpError(404, 'Not Found', `user ${id} not found`);
    }

    return this.prisma.user.delete({
      where: { id },
      select,
    });
  }
}
