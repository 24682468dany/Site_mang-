const express = require('express');
const connection = require('../db/connection');
const validateLeitura = require('../middlewares/validateLeitura')
const route = express.Router();

// Rota GET para obter todas as leituras
route.get('/', async (req, res) => {
  const [result] = await connection.execute('SELECT * FROM leitura');

  res.status(200).json(result);
});

// Rota POST para criar uma nova leitura
route.post('/',validateLeitura, async (req, res) => {
  const { id_usuario, capitulo_atual, data_leitura } = req.body;

  const [result] = await connection.execute(
    'INSERT INTO leitura(id_usuario, capitulo_atual, data_leitura) VALUES(?, ?, ?)',
    [id_usuario, capitulo_atual, data_leitura]
  );

  const newLeitura = {
    id: result.insertId,
    id_usuario,
    capitulo_atual,
    data_leitura
  };

  res.status(201).json(newLeitura);
});

// Rota PUT para atualizar uma leitura existente
route.put('/:id',validateLeitura, async (req, res) => {
  const { id_usuario, capitulo_atual, data_leitura } = req.body;
  const { id } = req.params;

  const [[result]] = await connection.execute('SELECT * FROM leitura WHERE id = ?', [id]);

  if (!result) {
    res.status(404).json({ message: 'Leitura não encontrada' });
    return;
  }

  await connection.execute(
    'UPDATE leitura SET id_usuario = ?, capitulo_atual = ?, data_leitura = ? WHERE id = ?',
    [id_usuario, capitulo_atual, data_leitura, id]
  );

  const updatedLeitura = {
    id,
    id_usuario,
    capitulo_atual,
    data_leitura
  };

  res.status(200).json(updatedLeitura);
});

// Rota DELETE para excluir uma leitura
route.delete('/:id',validateLeitura, async (req, res) => {
  const { id } = req.params;

  const [[result]] = await connection.execute('SELECT * FROM leitura WHERE id = ?', [id]);

  if (!result) {
    res.status(404).json({ message: 'Leitura não encontrada' });
    return;
  }

  await connection.execute('DELETE FROM leitura WHERE id = ?', [id]);

  res.status(204).send();
});

module.exports = route;
