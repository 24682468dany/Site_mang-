const Joi = require('joi');

// Middleware de validação para leitura
const validateLeitura = (req, res, next) => {
  const schema = Joi.object({
    id_usuario: Joi.number().integer().required(),
    capitulo_atual: Joi.number().integer().required(),
    data_leitura: Joi.date().required()
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json({ message: error.details[0].message });
  } else {
    next();
  }
};

module.exports = validateLeitura;
