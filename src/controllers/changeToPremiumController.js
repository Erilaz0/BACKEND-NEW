const usersService = require("../services/users.service");

async function changeToPremiumController( req , res ){
let email = req.cookies.datos

const user = await usersService.verifyEmailUser(email.email)

if(user && email){

    req.logger.info(email.email)
    req.logger.info(email.id)

    res.status(200).render("premium", { id : email.id , email : email.email})

}else{

    req.logger.error("no existe cookie - datos o no se ah encontrado usuario . changeToPremiumController.js")

}



}

module.exports = changeToPremiumController