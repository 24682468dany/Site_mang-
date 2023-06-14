const express = require('express');
const connection = require('../db/connection');
const validatePagina = require('../middlewares/validatepaginas')
const route = express.Router();

// Rota GET para obter todas as páginas
route.get('/', async (req, res) => {
  const [result] = await connection.execute('SELECT * FROM paginas');

  res.status(200).json(result);
});

// Rota POST para criar uma nova página
route.post('/', async (req, res) => {
  const { num_pagina, desing, id_capitulo } = req.body;

  const [result] = await connection.execute(
    'INSERT INTO paginas(num_pagina, desing, id_capitulo) VALUES(?, ?, ?)',
    [num_pagina, desing, id_capitulo]
  );

  const newPagina = {
    id: result.insertId,
    num_pagina,
    desing,
    id_capitulo
  };

  res.status(201).json(newPagina);
});

// Rota PUT para atualizar uma página existente
route.put('/:id',validatePagina, async (req, res) => {
  const { num_pagina, desing, id_capitulo } = req.body;
  const { id } = req.params;

  const [[result]] = await connection.execute('SELECT * FROM paginas WHERE id = ?', [id]);

  if (!result) {
    res.status(404).json({ message: 'Página não encontrada' });
    return;
  }

  await connection.execute(
    'UPDATE paginas SET num_pagina = ?, desing = ?, id_capitulo = ? WHERE id = ?',
    [num_pagina, desing, id_capitulo, id]
  );

  const updatedPagina = {
    id,
    num_pagina,
    desing,
    id_capitulo
  };

  res.status(200).json(updatedPagina);
});

// Rota DELETE para excluir uma página
route.delete('/:id',validatePagina, async (req, res) => {
  const { id } = req.params;

  const [[result]] = await connection.execute('SELECT * FROM paginas WHERE id = ?', [id]);

  if (!result) {
    res.status(404).json({ message: 'Página não encontrada' });
    return;
  }

  await connection.execute('DELETE FROM paginas WHERE id = ?', [id]);

  res.status(204).send();
});

module.exports = route;
