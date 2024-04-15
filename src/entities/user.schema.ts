import Joi from 'joi';
import { type UserCreateDto, type UserUpdateDto } from './user';

export const userCreateDtoSchema = Joi.object<UserCreateDto>({
  name: Joi.string().required(),
  email: Joi.string().required(),
});

export const userUpdateDtoSchema = Joi.object<UserUpdateDto>({
  name: Joi.string().required(),
  email: Joi.string().required(),
});
