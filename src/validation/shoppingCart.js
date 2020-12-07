import Joi from 'joi';

export const removeItemSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  clearEverything: Joi.boolean().required(),
});

export const addItemSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  quantity: Joi.number().integer().positive().required(),
});

export const updateItemSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  quantity: Joi.number().integer().positive().required(),
});