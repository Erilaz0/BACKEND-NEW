const usersservice = require("../services/users.service")
let newPremiumUser;

async function premiumController( req , res ){

const email = req.params.uid

const premium = await usersservice.ispremium( email )

if( !premium && email){

 
   const user = await usersservice.verifyEmailUser(email)
   const documents = user.documents
   
   if(documents[0] && documents[1]){
   
  

      let newPremiumUser = await usersservice.premiumUser( email , true )
      if(newPremiumUser){
       
        res.setHeader("Content-Type","text/html")
        return res.status(200).redirect("/logout")

      }else{

        req.logger.info(`no se ah podido cambia el rol del usuario ${email} - premiumController.js`)

      }
      
 
   
 
  
 
    }else{
    req.logger.error("no existen documentos suficientes para cambiar el rol del usuario")
    res.setHeader("location","https://backend-new-production.up.railway.app/api/products")
    return res.status(200).redirect("/api/products")
 

   }
   
   
  
   
}else{
  req.logger.error("no existen email para cambiar el ro del usuario - premiumController.js")
  res.setHeader("location","https://backend-new-production.up.railway.app/api/products")
  return res.status(200).redirect("/api/products")
}

}
module.exports = premiumController