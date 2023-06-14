const Joi = require('joi');

// Middleware de validação para paginas
const validatePagina = (req, res, next) => {
  const schema = Joi.object({
    num_pagina: Joi.number().integer().required(),
    desing: Joi.string().required(),
    id_capitulo: Joi.number().integer().required()
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json({ message: error.details[0].message });
  } else {
    next();
  }
};

module.exports = validatePagina;
