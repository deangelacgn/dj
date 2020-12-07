import Joi from 'joi';

export const finishPurchaseSchema = Joi.object().key({
  customer_name: Joi.string().min(2).max(500),
});