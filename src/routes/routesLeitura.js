const express = require('express'); 
const route = express.Router();
const connection = require('../DB/connection');
const validateLeitura = require('../middlewares/validateLeitura');


route.get('/',async (req, res) => {
    const [result] = await connection.execute('SELECT * FROM leitura');
    res.status(200).json(result);
});

route.post('/',validateLeitura, async (req, res) => {
    const {id,id_usuario,capitulo_atual,data_leitura} = req.body;
    const [result] = await connection.execute('INSERT INTO leitura(id,id_usuario,capitulo_atual,data_leitura) VALUES(?,?,?,?)',[id,id_usuario,capitulo_atual,data_leitura])
   
    const newLeitura = {
        id:result.insertId,
       id_usuario,
       capitulo_atual,
       data_leitura
    }
    res.status(201).json(newLeitura);
})
route.put('/:id',validateLeitura, (req, res) => {
    const {id,id_usuario,capitulo_atual,data_leitura} = req.body;
    const {} = req.params;

    const updateRoutes = connection.execute(`UPDATE leitura
    SET id_usuario = ? ,capitulo_atual? data_leitura = ?
    WHERE id = ?`, [id_usuario,capitulo_atual,data_leitura,id])

    const newLeitura= {
        id,
        id_usuario,
        capitulo_atual,
        data_leitura,
    }

    res.status(201).json(newLeitura);
})
route.delete('/:id',async(req,res)=>{
    const{id} = req.params;

    await connection.execute('DELETE FROM leitura WHERE id=?', [id])

    res.status(204).send();
})
route.get('/:id',async (req, res) => {
    const {id} = req.params;
    const [[result]] = await connection.execute('SELECT * FROM leitura WHERE id =?',[id]);
    res.status(200).json(result);
});


    module.exports = route;