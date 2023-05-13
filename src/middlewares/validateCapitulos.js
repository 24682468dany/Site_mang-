const joi = require('joi')

const CAPITULO =joi.object({
titulo:joi.string().required(),
num_capitulo:joi.number().required(),
id_identificacao:joi.string().required(),
})
function validateCapitulo(req,res,next){
const {titulo,num_capitulo,id_identificacao}=req.body

const {error}=CAPITULO.validate({titulo,num_capitulo,id_identificacao})

if(error){
    next({status:400,message:error.details[0].message});
}

next();
}
module.exports = validateCapitulo;
