const passportJWT= require("passport-jwt")
const passport = require("passport")
const config = require("../config/config")
const { sendError } = require("../mailing/send")



const searchToken = (req) => {
     let token = null
     
     if(req.cookies.token){

        token = req.cookies.token
       
     }
     
     return token
     
}

let i = process.env.PRIVATE_KEY00 || config.PRIVATE_KEY00

const inicializePassportJWT = () =>{

    passport.use( "current" , new passportJWT.Strategy(

         { jwtFromRequest : passportJWT.ExtractJwt.fromExtractors([searchToken]),
        
           secretOrKey : i
        
        }, ( jwtcontent , done ) => {
            
              try{
              
                
                 done( null , jwtcontent)
                
              }catch(error){error => sendError(error)
                 .then((sended) =>{ let i = sended })
                 .catch((error) =>{ let i = error })}



        } 





    ))


}

module.exports = inicializePassportJWT



