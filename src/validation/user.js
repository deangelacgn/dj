import Joi from 'joi';

export const userRegistrationSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'br', 'net'] } }).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

export const loginSchema = Joi.object().keys({
  user_login: [
    Joi.string().alphanum().min(2).max(30).required(),
    Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'br', 'net'] } }).required(),
  ],
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

export const changePasswordSchema = Joi.object().keys({
  id: Joi.number(),
  current_password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  new_password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  repeat_password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

export const deleteUserSchema = Joi.object().keys({
  id: Joi.number().integer().positive().required(),
});