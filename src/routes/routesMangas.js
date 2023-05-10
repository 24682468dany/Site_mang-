const express = require('express'); 
const route = express.Router();
const connection = require('../DB/connection');
const validateMangas = require('../middlewares/validateMangas')


route.get('/',async (req, res) => {
    const [result] = await connection.execute('SELECT * FROM mangas');
    res.status(200).json(result);
});

route.post('/', validateMangas, async (req, res) => {
    const {id,titulo,imagem_capa} = req.body;
    const [result] = await connection.execute('INSERT INTO mangas(id,titulo,imagem_capa) VALUES(?,?,?)',[id,titulo,imagem_capa])
   
    const newMangas = {
        id:result.insertId,
        id,
        titulo,
        imagem_capa
    }
    res.status(201).json(newMangas);
})
route.put('/:id', validateMangas, (req, res) => {
    const {id,titulo,imagem_capa} = req.body;
    const {} = req.params;

    const updateRoutes = connection.execute(`UPDATE mangas
    SET titulo = ? ,imagem_capa?
    WHERE id = ?`, [titulo,imagem_capa,id])

    const newMangas= {
        id,
        titulo,
        imagem_capa
    }

    res.status(201).json(newMangas);
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