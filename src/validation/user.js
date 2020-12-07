import Joi from 'joi';

const userRegistrationSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'br', 'net'] } }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

const loginSchema = Joi.object().keys({
  user_login: [
    Joi.string().alphanum().min(2).max(30).required(),
    Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'br', 'net'] } }),
  ],
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

const changePasswordSchema = Joi.object().keys({
  id: Joi.number(),
  current_password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  new_password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  repeat_password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

const deleteUserSchema = Joi.object().keys({
  id: Joi.number(),
});