const jwt = require("jsonwebtoken")
const usersService = require("../../services/users.service")
const config = require("../../config/config")
const { generaJWT } = require("../../utils")


async function newPassword( req , res ){
    const token = req.params.pid

    jwt.verify( token , config.PRIVATE_KEY00 ,async ( error , credenciales )=>{
    
     if(error){
    
        res.status(200).redirect("/api/sessions/login")
     }
     else{
    
       
       const user = await usersService.verifyEmailUser(credenciales.usuario)
       if(!user){
    
         req.loger.error("usuario en restablecimiento de password no encontrado")
    
       }else{
         const passResetToken = generaJWT(user.email)
         res.cookie( "token" , passResetToken , { httpOnly : false } )
         res.status(200).render("resPass")
    
       }
     }
    
    })



}


module.exports = newPassword