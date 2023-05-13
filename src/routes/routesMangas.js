const express = require('express'); 
const route = express.Router();
const connection = require('../DB/connection');
const validateMangas = require('../middlewares/validateMangas');


route.get('/',async (req, res) => {
    const [result] = await connection.execute('SELECT * FROM mangas');
    res.status(200).json(result);
});

route.post('/',validateMangas, async (req, res) => {
    const {id,nome_manga,caracteristicas_manga,imagem_manga,apresentacao_manga} = req.body;
    const [result] = await connection.execute('INSERT INTO mangas(id,nome_manga,caracteristicas_manga,imagem_manga,apresentacao_manga) VALUES(?,?,?,?,?)',[id,nome_manga,caracteristicas_manga,imagem_manga,apresentacao_manga])
   
    const newManga = {
        id:result.insertId,
        id,
        nome_manga,
        caracteristicas_manga,
        imagem_manga,
        apresentacao_manga
       
    }
    res.status(201).json(newManga);
})
route.put('/:id',validateMangas, (req, res) => {
    const {id,nome_manga,caracteristicas_manga,imagem_manga,apresentacao_manga} = req.body;
    const {} = req.params;

    const updateRoutes = connection.execute(`UPDATE mangas
    SET nome_manga = ? ,caracteristicas_manga =? ,imagem_manga = ? ,apresentacao_manga -=?,
    WHERE id = ?`, [id,nome_manga,caracteristicas_manga,imagem_manga,apresentacao_manga])

    const newManga= {
        id,
        nome_manga,
        caracteristicas_manga,
        imagem_manga,
        apresentacao_manga,
    }

    res.status(201).json(newManga);
})
route.delete('/:id',async(req,res)=>{
    const{id} = req.params;

    await connection.execute('DELETE FROM mangas WHERE id=?', [id])

    res.status(204).send();
})
route.get('/:id',async (req, res) => {
    const {id} = req.params;
    const [[result]] = await connection.execute('SELECT * FROM mangas WHERE id =?',[id]);
    res.status(200).json(result);
});


    module.exports = route;