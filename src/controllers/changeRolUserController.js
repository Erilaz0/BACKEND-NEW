const usersService = require("../services/users.service")

async function changeRolUserController( req , res ){

try{
    let email = req.body.email
    let premium = req.body.rol
    

    
    
    let changeRol = await usersService.premiumUser(email , premium)
  
    if(changeRol){
        
          
       return res.status(200).redirect("/realtimeproducts")

}
    

}catch{

  req.logger.error(`no se ah podido cambiar el rol del usuario`)
}

}


module.exports = changeRolUserController