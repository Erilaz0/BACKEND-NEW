const usersservice = require("../services/users.service")
let newPremiumUser;

async function premiumController( req , res ){

const email = req.params.uid

const premium = await usersservice.ispremium( email )

if( !premium ){

 
   const user = await usersservice.verifyEmailUser(email)
   const documents = user.documents
   
   if(documents[0] && documents[1]){
   
  

      newPremiumUser = await usersservice.premiumUser( email , true )
      return res.status(200).redirect("/logout")
 
   
 
  
 
    }else{
     
    return res.status(200).redirect("/api/products")
 

   }
   
   
  
   
}else{
  
  return res.status(200).redirect("/api/products")
}

}
module.exports = premiumController