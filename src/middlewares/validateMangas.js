const joi = require('joi');

const MANGA = joi.object({
  nome_manga: joi.string().required().min(3).max(255),
  caracteristicas_manga: joi.string().required().min(3).max(255),
  imagem_manga: joi.string().required().min(3).max(255),
  apresentacao_manga: joi.string().required().min(3).max(255)
});

function validateManga(req, res, next) {
  const { nome_manga, caracteristicas_manga, imagem_manga, apresentacao_manga } = req.body;

  const { error } = MANGA.validate({ nome_manga, caracteristicas_manga, imagem_manga, apresentacao_manga });

  if (error) {
    next({ status: 400, message: error.details[0].message });
  } else {
    next();
  }
}

module.exports = validateManga;
