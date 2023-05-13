const joi = require('joi')

const MANGA =joi.object({
nome_manga:joi.string().min(3).max(20).required(),
caracteristicas_manga:joi.string().min(2).max(19).required(),
imagem_capa:joi.string().min(1).max(8).required(),
apresentacao_manga:joi.string().min(1).max(5).required(),
})

function validateMangas(req,res,next){
const {nome_manga,caracteristicas_manga,imagem_manga,apresentacao_manga}=req.body

const {error}=MANGA.validate({  nome_manga, caracteristicas_manga,imagem_manga,apresentacao_manga})

if(error){
    next({status:400,message:error.details[0].message});
}

next();
}
module.exports = validateMangas;

