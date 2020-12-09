import Joi from 'joi';

export const addProductSchema = Joi.object({
  name: Joi.string().min(2).max(500).required(),
  available_quantity: Joi.number().integer().positive().required(),
  cost_per_unit: Joi.number().positive().required(),
});

export const updateProductSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  name: Joi.string().min(2).max(500),
  available_quantity: Joi.number().integer().positive(),
  cost_per_unit: Joi.number().positive(),
});

export const deleteProductSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export const searchProductSchema = Joi.object({
  search_pattern: Joi.string().max(500).required() ,
  num_results: Joi.number().integer().positive().required(),
  offset: Joi.number().integer().positive().allow(0).required(),
});