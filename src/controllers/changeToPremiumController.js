const usersService = require("../services/users.service");

async function changeToPremiumController( req , res ){
let email = req.cookies.datos

const user = await usersService.verifyEmailUser(email.email)

if(user){

    res.status(200).render("premium", { id : email.id , email : email.email})
}



}

module.exports = changeToPremiumController