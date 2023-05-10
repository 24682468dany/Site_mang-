const joi = require('joi')
const PAGINA =joi.object({
    
id_capitulo:joi.string().required().min(3),
imagem:joi.string().required().min(3),
num_pagina:joi.number().required().min(3),
})

function validatePaginas(req,res,next){
const {id_capitulo,imagem,num_pagina}=req.body

const {error}=PAGINA.validate({titulo,imagem_capa})

if(error){
    next({status:400,message:error.details[0].message});
}

next();
}
module.exports = validatePaginas;