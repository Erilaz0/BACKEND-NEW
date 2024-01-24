const usersService = require("../services/users.service")

async function accounts( req , res ){

try{

    const users = await usersService.getAccounts()
   if(users){
    
    res.setHeader("Content-Type","application/json")
    res.status(200).json({users})

   }else{

    req.logger.debug("No se han encontrado usuarios")

   }
   

}catch{

  req.logger.error("no se han encontrado usuarios");
}

}


module.exports = accounts