import Joi from 'joi';

export const addItemSchema = Joi.object({
  quantity: Joi.number().integer().positive().required(),
});

export const updateItemSchema = Joi.object({
  quantity: Joi.number().integer().positive().required(),
});