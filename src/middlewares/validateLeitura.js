const joi = require('joi')

const LEITURA =joi.object({
id_usuario:joi.number().min(1).max(60).required(),
capitulo_atual:joi.number().min(1).required(),
data_leitura:joi.number().min(1).required(),
})

function validateLeitura(req,res,next){
const {id_usuario,capitulo_atual,data_leitura}=req.body

const {error}=LEITURA.validate({id_usuario,capitulo_atual,data_leitura})

if(error){
    next({status:400,message:error.details[0].message});
}

next();
}
module.exports = validateLeitura;
