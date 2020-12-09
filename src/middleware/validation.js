export const validateRequest = (schema, property) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], { abortEarly: false });
    const isValid = error === undefined;

    if(isValid) {
      req[property] = value;
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      res.status(422).json( { error: message } );
    }
  };
};