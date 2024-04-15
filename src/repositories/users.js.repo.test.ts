import { readFile, writeFile } from 'fs/promises';
import { HttpError } from '../middleware/errors.middleware';
import { type UserCreateDto } from '../entities/user';
import { UsersFsRepository } from './users.fs.repo';

jest.mock('fs/promises');

describe('Given an instance of the class ArticleFsRepo', () => {
  const repo = new UsersFsRepository();

  test('Then it should be the instance of the class', () => {
    expect(repo).toBeInstanceOf(UsersFsRepository);
  });

  describe('When we use the method readAll', () => {
    test('Then it should call readFile', async () => {
      (readFile as jest.Mock).mockResolvedValue('[]');
      const results = await repo.readAll();
      expect(readFile).toHaveBeenCalled();
      expect(results).toEqual([]);
    });
  });

  describe('When we use the method readById with a valid id', () => {
    test('Then it should call readFile', async () => {
      (readFile as jest.Mock).mockResolvedValue('[{ "id": "1" }]');
      const result = await repo.readById('1');
      expect(readFile).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });
  });

  describe('When we use the method readById with an invalid id', () => {
    test('Then it should throw an error', async () => {
      (readFile as jest.Mock).mockResolvedValue('[{ "id": "1" }]');
      await expect(repo.readById('2')).rejects.toThrow(
        new HttpError(404, 'Not Found', 'Song 2 not found')
      );
    });
  });

  describe('When we use the method create', () => {
    test('Then it should call readFile and writeFile', async () => {
      (readFile as jest.Mock).mockResolvedValue('[]');
      const data = {} as unknown as UserCreateDto;
      const result = await repo.create(data);
      expect(result).toEqual({ id: expect.any(String) });
      expect(readFile).toHaveBeenCalled();
      expect(writeFile).toHaveBeenCalled();
    });
  });

  describe('When we use the method update', () => {
    test('Then it should call readFile and writeFile', async () => {
      (readFile as jest.Mock).mockResolvedValue('[{"id": "1"}, {"id": "2"}]');
      const result = await repo.update('1', {
        id: '',
        name: '',
        email: '',
      });
      expect(readFile).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });
  });

  describe('When we use the method update with an invalid ID', () => {
    test('Then it should throw an error', async () => {
      (readFile as jest.Mock).mockResolvedValue('[{"id": "1"}]');
      await expect(
        repo.update('2', {
          id: '',
          name: '',
          email: '',
        })
      ).rejects.toThrow(new HttpError(404, 'Not Found', 'Song 2 not found'));
    });
  });

  describe('When we use the method delete', () => {
    test('Then it should call readFile and writeFile', async () => {
      (readFile as jest.Mock).mockResolvedValue('[{"id": "1"}]');
      const result = await repo.delete('1');
      expect(readFile).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });
  });

  describe('When we use the method delete with an invalid ID', () => {
    test('Then it should throw an error', async () => {
      (readFile as jest.Mock).mockResolvedValue('[{"id": "1"}]');
      await expect(repo.delete('2')).rejects.toThrow(
        new HttpError(404, 'Not Found', 'Song 2 not found')
      );
    });
  });
});
