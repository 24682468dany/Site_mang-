const express = require('express');
const connection = require('../db/connection');
const validateCapitulo = require('../middlewares/validateCapitulos')
const route = express.Router();

// Rota GET para obter todos os capítulos
route.get('/', async (req, res) => {
  const [result] = await connection.execute('SELECT * FROM capitulos');

  res.status(200).json(result);
});

// Rota POST para criar um novo capítulo
route.post('/',validateCapitulo, async (req, res) => {
  const { titulo, num_capitulo, id_identificacao } = req.body;

  const [result] = await connection.execute(
    'INSERT INTO capitulos(titulo, num_capitulo, id_identificacao) VALUES(?, ?, ?)',
    [titulo, num_capitulo, id_identificacao]
  );

  const newCapitulo = {
    id: result.insertId,
    titulo,
    num_capitulo,
    id_identificacao
  };

  res.status(201).json(newCapitulo);
});

// Rota PUT para atualizar um capítulo existente
route.put('/:id',validateCapitulo, async (req, res) => {
  const { titulo, num_capitulo, id_identificacao } = req.body;
  const { id } = req.params;

  const [[result]] = await connection.execute('SELECT * FROM capitulos WHERE id = ?', [id]);

  if (!result) {
    res.status(404).json({ message: 'Capítulo não encontrado' });
    return;
  }

  await connection.execute(
    'UPDATE capitulos SET titulo = ?, num_capitulo = ?, id_identificacao = ? WHERE id = ?',
    [titulo, num_capitulo, id_identificacao, id]
  );

  const updatedCapitulo = {
    id,
    titulo,
    num_capitulo,
    id_identificacao
  };

  res.status(200).json(updatedCapitulo);
});

// Rota DELETE para excluir um capítulo
route.delete('/:id',validateCapitulo, async (req, res) => {
  const { id } = req.params;

  const [[result]] = await connection.execute('SELECT * FROM capitulos WHERE id = ?', [id]);

  if (!result) {
    res.status(404).json({ message: 'Capítulo não encontrado' });
    return;
  }

  await connection.execute('DELETE FROM capitulos WHERE id = ?', [id]);

  res.status(204).send();
});

module.exports = route;
