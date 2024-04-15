import { type Response, type Request } from 'express';
import { type UsersFsRepository } from '../repositories/users.fs.repo.js';
import { UserController } from './user.controllers.js';
import { HttpError } from '../middleware/errors.middleware';
import { type User } from '../entities/user';
import { error } from 'console';

describe('Given an instance of the class UserController', () => {
  const repo = {
    readAll: jest.fn(),
    readById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as UsersFsRepository;

  const req = {} as unknown as Request;
  const res = {
    json: jest.fn(),
    status: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  const controller = new UserController(repo);
  test('Then it should be instance of the class', () => {
    expect(controller).toBeInstanceOf(UserController);
  });

  describe('When we use the method getAll', () => {
    test('Then it should call repo.readAll', async () => {
      (repo.readAll as jest.Mock).mockResolvedValue([]);
      await controller.getAll(req, res, next);
      expect(repo.readAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith([]);
    });
  });

  describe('When we use the method getAll and the repo throws an ERROR', () => {
    test('Then it should call repo.readAll and next', async () => {
      const error = new Error('Something went wrong');
      (repo.readAll as jest.Mock).mockRejectedValue(error);
      await controller.getAll(req, res, next);
      expect(repo.readAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith([]);
    });
  });

  describe('When we use the method getById', () => {
    test('Then it should call repo.readById', async () => {
      req.params = { id: '1' };
      (repo.readById as jest.Mock).mockResolvedValue({});
      await controller.getById(req, res, next);
      expect(repo.readById).toHaveBeenCalledWith(req.params.id);
      expect(res.json).toHaveBeenCalledWith({});
    });
  });

  describe('When we use the method getById and the repo throws an ERROR', () => {
    test('Then it should call repo.readById and next', async () => {
      const error = new Error('Something went wrong');
      req.params = { id: '2' };
      (repo.readById as jest.Mock).mockRejectedValue(error);
      await controller.getById(req, res, next);
      expect(repo.readById).toHaveBeenCalledWith(req.params.id);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('When we use the method create', () => {
    test('Then it should call repo.create', async () => {
      const user = { title: 'x', author: 'y', year: 1000 };
      const validateUser = user;
      req.body = user;
      (repo.create as jest.Mock).mockResolvedValue(user);
      await controller.create(req, res, next);
      expect(repo.create).toHaveBeenCalledWith(validateUser);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(user);
    });
  });

  describe('When we use the method create and the repo throws an ERROR', () => {
    test('Then it should call repo.create and next', async () => {
      const user = { title: 'x', author: 'y' };
      req.body = user;
      await controller.create(req, res, next);
      expect(next).toHaveBeenCalledWith(
        new HttpError(406, 'Not Acceptable', '"year" is required')
      );
    });
  });

  describe('When we use the method create and the repo throws an ERROR', () => {
    test('Then it should call repo.create and next', async () => {
      const error = new Error('Something went wrong');
      req.body = { title: 'x', author: 'y', year: 1000 };
      (repo.create as jest.Mock).mockRejectedValue(error);
      await controller.create(req, res, next);
      expect(repo.create).toHaveBeenCalledWith(req.body);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('When we use the method update', () => {
    test('Then it should call repo.update', async () => {
      const user = { title: 'x', author: 'y' };
      req.params = { id: '1' };
      req.body = user;
      (repo.update as jest.Mock).mockResolvedValue(user);
      await controller.update(req, res, next);
      expect(repo.update).toHaveBeenCalledWith('1', user);
      expect(res.json).toHaveBeenCalledWith(user);
    });
  });

  describe('When we use the method update with INVALID data', () => {
    test('Then it should call next with an error', async () => {
      const user = { author: 34 };
      req.body = user;
      await controller.update(req, res, next);
      expect(next).toHaveBeenCalledWith(
        new HttpError(406, 'Not Acceptable', '"author" must be a string')
      );
    });
  });

  describe('When we use the method update and repo throw an ERROR', () => {
    test('Then it should call repo.update and next', async () => {
      const error = new Error('Something went wrong');
      (repo.update as jest.Mock).mockRejectedValue(error);
      const user = { title: 'x', author: 'y' };
      req.body = user;
      await controller.update(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('When we use the method delete', () => {
    test('Then it should call repo.delete', async () => {
      req.params = { id: '1' };
      (repo.delete as jest.Mock).mockResolvedValue({});
      await controller.delete(req, res, next);
      expect(repo.delete).toHaveBeenCalledWith('1');
      expect(res.json).toHaveBeenCalledWith({});
    });
  });

  describe('When we use the method delete and repo throw an ERROR', () => {
    test('Then it should call repo.delete and next', async () => {
      const error = new Error('Something went wrong');
      (repo.delete as jest.Mock).mockRejectedValue(error);
      req.params = { id: '1' };
      await controller.delete(req, res, next);
      expect(repo.delete).toHaveBeenCalledWith('1');
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
