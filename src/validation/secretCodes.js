import Joi from 'joi';
import { validatePassword } from './utils';

export const sendEmailSecretCodeSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'br', 'net'] } }).required(),
});

export const validateSecretCodeSchema = Joi.object({
  secret_code: Joi.number().integer(),
  new_password: validatePassword(),
});