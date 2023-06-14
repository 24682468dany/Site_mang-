const errorMiddleware = (error, req, res, next) => {
  console.log(error.status)
  if(error.status){
    res.status(error.status).json({error:error.message})
  }
    console.log(error);
    res.status(500).json({message: "Erro interno do servidor"})
  };
  
  module.exports = errorMiddleware;