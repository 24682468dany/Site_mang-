const express = require('express'); 
const route = express.Router();
const connection = require('../DB/connection');


route.get('/',async (req, res) => {
    const [result] = await connection.execute('SELECT * FROM capitulos');
    res.status(200).json(result);
});

route.post('/', async (req, res) => {
    const {id,titulo,num_capitulo,id_manga} = req.body;
    const [result] = await connection.execute('INSERT INTO mangas(id,titulo,num_capitulo,id_manga) VALUES(?,?,?,?)',[id,titulo,num_capitulo,id_manga])
   
    const newRoutes = {
        id:result.insertId,
        id,
        titulo,
        num_capitulo,
        id_manga
    }
    res.status(201).json(newRoutes);
})
route.put('/:id', (req, res) => {
    const {id,titulo,num_capitulo,id_manga} = req.body;
    const {} = req.params;

    const updateRoutes = connection.execute(`UPDATE capitulos
    SET titulo = ? ,num_capitulo? id_manga = ?
    WHERE id = ?`, [titulo,num_capitulo,id_manga,id])

    const newRoutes= {
        id,
        titulo,
        num_capitulo,
        id_manga
    }

    res.status(201).json(newRoutes);
})
route.delete('/:id',async(req,res)=>{
    const{id} = req.params;

    await connection.execute('DELETE FROM capitulos WHERE id=?', [id])

    res.status(204).send();
})
route.get('/:id',async (req, res) => {
    const {id} = req.params;
    const [[result]] = await connection.execute('SELECT * FROM capitulos WHERE id =?',[id]);
    res.status(200).json(result);
});


    module.exports = route;