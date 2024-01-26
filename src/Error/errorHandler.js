const errorHandler = ( error , req , res , next)=>{
  if(error.codigo){
     
       return res.status(error.codigo).json({error:error.message})
       
}else{
   return res.status(500).json({error:`Error inesperado en el servidor`})
   
}
  next()
  }

    
module.exports = errorHandler