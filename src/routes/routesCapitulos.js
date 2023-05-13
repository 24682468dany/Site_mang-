const express = require('express'); 
const route = express.Router();
const connection = require('../DB/connection');
const validateCapitulo = require('../middlewares/validateCapitulos');


route.get('/', async (req, res) => {
    const [result] = await connection.execute('SELECT * FROM capitulos');
    res.status(200).json(result);
});

route.post('/',validateCapitulo, async (req, res) => {
    const {id,titulo,num_capitulo,id_identificacao} = req.body;
    const [result] = await connection.execute('INSERT INTO mangas(id,titulo,num_capitulo,id_identificacao) VALUES(?,?,?,?)',[id,titulo,num_capitulo,id_identificacao])
   
    const newCapitulos = {
        id:result.insertId,
        id,
        titulo,
        num_capitulo,
        id_identificacao
    }
    res.status(201).json(newCapitulos);
})
route.put('/:id',validateCapitulo, (req, res) => {
    const {id,titulo,num_capitulo,id_identificacao} = req.body;
    const {} = req.params;

    const updateRoutes = connection.execute(`UPDATE capitulos
    SET titulo = ? ,num_capitulo = ? id_identificacao = ?
    WHERE id = ?`, [titulo,num_capitulo,id_identificacao,id])

    const newCapitulos= {
        id,
        titulo,
        num_capitulo,
        id_identificacao
    }

    res.status(201).json(newCapitulos);
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