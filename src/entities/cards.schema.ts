import Joi from 'joi';
import { type CardDto } from './cards';

export const cardCreateDtoSchema = Joi.object<CardDto>({
  name: Joi.string().required(),
  brand: Joi.string().required(),
  year: Joi.number(),
});

export const cardUpdateDtoSchema = Joi.object<CardDto>({
  name: Joi.string().optional(),
  brand: Joi.string().optional(),
  year: Joi.number().optional(),
});
