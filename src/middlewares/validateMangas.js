const joi = require('joi')

const MANGA =joi.object({
titulo:joi.string().required().min(3),
imagem_capa:joi.string().required().min(3),
})

function validateMangas(req,res,next){
const {titulo,imagem_capa}=req.body

const {error}=MANGA.validate({titulo,imagem_capa})

if(error){
    next({status:400,message:error.details[0].message});
}

next();
}
module.exports = validateMangas;

