import { error } from 'console';
import { User } from '../entities/users';

const USERS: User[] = [
  {
    id: '1',
    name: 'pepe',
    age: 5,
    profession: 'athlete',
  },
];

export class UsersMemoryRepository {
  users = USERS;

  readAll() {
    return this.users;
  }
  readById(id: string) {
    return this.users.find((user) => {
      user.id === id;
    });
  }

  create(data: User) {
    const newUser: User = {
      id: (this.users.length + 1).toString(),
      name: data.name,
      age: data.age,
      profession: data.profession,
    };
    this.users = [...this.users, newUser];
    return newUser;
  }
  update(id: string, data: User) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error(`User ${id} not found`);
    }

    const newUser = { ...user, ...data };
    this.users = this.users.map((user) => (user.id === id ? newUser : user));

    return newUser;
  }

  delete(id: string) {
    const user = this.users.find((user) => user.id === id);
    this.users = this.users.filter((user) => user.id !== id);
    return user;
  }
}
