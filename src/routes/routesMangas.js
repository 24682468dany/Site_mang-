const express = require('express');
const connection = require('../db/connection');
const validateMangas = require('../middlewares/validateMangas');
const validateManga = require('../middlewares/validateMangas');
const route = express.Router();

// Rota GET para obter todos os mangas
route.get('/', async (req, res) => {
  const [result] = await connection.execute('SELECT * FROM mangas');

  res.status(200).json(result);
});

// Rota POST para criar um novo manga
route.post('/',validateManga, async (req, res) => {
  const { nome_manga, caracteristicas_manga, imagem_manga, apresentacao_manga } = req.body;

  const [result] = await connection.execute(
    'INSERT INTO mangas(nome_manga, caracteristicas_manga, imagem_manga, apresentacao_manga) VALUES(?, ?, ?, ?)',
    [nome_manga, caracteristicas_manga, imagem_manga, apresentacao_manga]
  );

  const newManga = {
    id: result.insertId,
    nome_manga,
    caracteristicas_manga,
    imagem_manga,
    apresentacao_manga
  };

  res.status(201).json(newManga);
});

// Rota PUT para atualizar um manga existente
route.put('/:id',validateMangas, async (req, res) => {
  const { nome_manga, caracteristicas_manga, imagem_manga, apresentacao_manga } = req.body;
  const { id } = req.params;

  const [[result]] = await connection.execute('SELECT * FROM mangas WHERE id = ?', [id]);

  if (!result) {
    res.status(404).json({ message: 'Manga não encontrado' });
    return;
  }

  await connection.execute(
    'UPDATE mangas SET nome_manga = ?, caracteristicas_manga = ?, imagem_manga = ?, apresentacao_manga = ? WHERE id = ?',
    [nome_manga, caracteristicas_manga, imagem_manga, apresentacao_manga, id]
  );

  const updatedManga = {
    id,
    nome_manga,
    caracteristicas_manga,
    imagem_manga,
    apresentacao_manga
  };

  res.status(200).json(updatedManga);
});

// Rota DELETE para excluir um manga
route.delete('/:id',validateMangas, async (req, res) => {
  const { id } = req.params;

  const [[result]] = await connection.execute('SELECT * FROM mangas WHERE id = ?', [id]);

  if (!result) {
    res.status(404).json({ message: 'Manga não encontrado' });
    return;
  }

  await connection.execute('DELETE FROM mangas WHERE id = ?', [id]);

  res.status(204).send();
});

module.exports=route