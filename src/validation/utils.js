import Joi from 'joi';

export const validatePassword = () => {
  return Joi
    .string()
    .pattern(new RegExp('^[a-zA-Z0-9!"#$%&\'*\\(\\)=~+><?\\{\\}]{3,30}$'))
    .required();
};