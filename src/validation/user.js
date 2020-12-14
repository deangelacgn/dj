import Joi from 'joi';

export const validatePassword = () => {
  return Joi
    .string()
    .pattern(new RegExp('^[a-zA-Z0-9!"#$%&\'*\\(\\)=~+><?\\{\\}]{3,30}$'))
    .required();
};

export const userRegistrationSchema = Joi.object({
  name: Joi.string().min(4). max(100).required(),
  username: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'br', 'net'] } }).required(),
  password: validatePassword(),
});

export const loginSchema = Joi.object({
  user_login: [
    Joi.string().alphanum().min(2).max(30).required(),
    Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'br', 'net'] } }).required(),
  ],
  password: validatePassword(),
});

export const changePasswordSchema = Joi.object({
  id: Joi.number(),
  current_password: validatePassword(),
  new_password: validatePassword(),
  repeat_password: validatePassword(),
});

export const deleteUserSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});