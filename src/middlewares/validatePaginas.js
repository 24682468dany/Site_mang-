const joi = require('joi')

const PAGINA =joi.object({
id_capitulo:joi.number().min(3).max(30).required(),
desing:joi.string().min(1).max(20).required(),
num_pagina:joi.number().min(1).required(),
})

function validatePaginas(req,res,next){
const {id_capitulo,desing,num_pagina}=req.body

const {error}=PAGINA.validate({id_capitulo,desing,num_pagina})

if(error){
    next({status:400,message:error.details[0].message});
}

next();
}
module.exports = validatePaginas;