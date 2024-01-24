const usersService = require("../../services/users.service")

async function current( req , res ){

    let data = req.user.usuario
    const user = await usersService.verifyEmailUser(data.email)
    const thumbnail = user.profilephoto
    

    if(data && thumbnail !== "none"){ 
      
      res.setHeader("Content-Type","text/html")
      res.status(200).render("current",{
  
      nombre : data.nombre,
      id: data._id,
      email: data.email,
      rol: data.rol,
      token: req.cookies.token,
      thumbnail : thumbnail
  
  
    })}
    else{
      res.setHeader("Content-Type","text/html")
      res.status(200).render("current",{
  
        nombre : data.nombre,
        id: data._id,
        email: data.email,
        rol: data.rol,
        token: req.cookies.token,
        thumbnail : "no_photo.png"
    
    
      })      

    }
    
   

}

module.exports = current