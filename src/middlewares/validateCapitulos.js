const Joi = require('joi');

// Middleware de validação para capitulos
const validateCapitulo = (req, res, next) => {
  const schema = Joi.object({
    titulo: Joi.string().required(),
    num_capitulo: Joi.number().integer().required(),
    id_identificacao: Joi.number().integer().required()
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json({ message: error.details[0].message });
  } else {
    next();
  }
};

module.exports = validateCapitulo;
