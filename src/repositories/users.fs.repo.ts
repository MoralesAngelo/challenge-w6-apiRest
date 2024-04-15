import { error } from 'console';
import {
  type UserCreateDto,
  type User,
  type UserUpdateDto,
} from '../entities/user';
import { readFile, writeFile } from 'fs/promises';
import { HttpError } from '../middleware/errors.middleware.js';

const USERS: User[] = [];

export class UsersFsRepository {
  users = USERS;

  constructor() {}

  private async load(): Promise<User[]> {
    const data = await readFile('db.json', 'utf-8');
    return JSON.parse(data) as User[];
  }

  private async save(user: User[]) {
    await writeFile('db.json', JSON.stringify(user, null, 2));
  }

  async readAll() {
    const user = await this.load();
    return this.users;
  }

  async readById(id: string) {
    const user = await this.load();
    const userId = user.find((user) => user.id === id);
    if (!userId) {
      throw new HttpError(404, 'not found', `user ${id} not found`);
    }

    return userId;
  }

  async create(data: UserCreateDto) {
    const newUser: User = {
      id: crypto.randomUUID(),

      ...data,
    };
    let user = await this.load();
    user = [...this.users, newUser];
    await this.save(user);
    return newUser;
  }

  async update(id: string, data: User) {
    let users = await this.load();
    const userid = users.find((user) => user.id === id);
    if (!userid) {
      throw new HttpError(404, 'Not Found', `Sport ${id} not found`);
    }

    const newUser: User = { ...userid, ...data };
    users = users.map((user) => (user.id === id ? newUser : userid));
    await this.save(users);
    return newUser;
  }

  async delete(id: string) {
    let user = await this.load();
    let userId = user.find((user) => user.id === id);
    if (!userId) {
      throw new HttpError(404, 'Not Found', `user ${id} not found`);
    }

    user = user.filter((user) => user.id !== id);
    await this.save(user);
    return userId;
  }
}
