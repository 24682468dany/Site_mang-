const express = require('express'); 
const route = express.Router();
const connection = require('../DB/connection');
const validatePaginas = require('../middlewares/validatePaginas');


route.get('/',async (req, res) => {
    const [result] = await connection.execute('SELECT * FROM paginas');
    res.status(200).json(result);
});

route.post('/', validatePaginas, async (req, res) => {
    const {id,num_pagina,desing,id_capitulo} = req.body;
    const [result] = await connection.execute('INSERT INTO paginas(id,num_pagina,desing,id_capitulo) VALUES(?,?,?,?)',[id,num_pagina,desing,id_capitulo])
   
    const newPaginas = {
        id:result.insertId,
        id,
        num_pagina,
        desing,
        id_capitulo
    }
    res.status(201).json(newPaginas);
})
route.put('/:id',validatePaginas, (req, res) => {
    const {id,num_pagina,desing,id_capitulo} = req.body;
    const {} = req.params;

    const updateRoutes = connection.execute(`UPDATE paginas
    SET num_pagina = ? , desing = ?, id_capitulo = ?
    WHERE id = ?`, [num_pagina,desing,id_capitulo, id])

    const newPaginas= {
        id,
        num_pagina,
        desing,
        id_capitulo
    }

    res.status(201).json(newPaginas);
})
route.delete('/:id',async(req,res)=>{
    const{id} = req.params;

    await connection.execute('DELETE FROM paginas WHERE id=?', [id])

    res.status(204).send();
})
route.get('/:id',async (req, res) => {
    const {id} = req.params;
    const [[result]] = await connection.execute('SELECT * FROM paginas WHERE id =?',[id]);
    res.status(200).json(result);
});


    module.exports = route;