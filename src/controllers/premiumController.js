const usersservice = require("../services/users.service")


async function premiumController( req , res ){

const email = req.params.uid

const premium = await usersservice.ispremium( email )
if( !premium ){

     let newPremiumUser = await usersservice.premiumUser( email , true )
     if(newPremiumUser){

        return res.status(200).redirect("/logout")

     }
   

}else{


     newPremiumUser = await usersservice.premiumUser( email , false )
    return res.status(200).redirect("/logout")
}

}

module.exports = premiumController