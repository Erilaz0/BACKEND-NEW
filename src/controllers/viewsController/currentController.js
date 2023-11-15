async function current( req , res ){

    let data = req.user.usuario
    console.log(data)
    if(data){ res.status(200).render("current",{
  
      nombre : data.nombre,
      id: data._id,
      email: data.email,
      rol: data.rol,
      token: req.cookies.token
  
  
    })}
    
   

}

module.exports = current