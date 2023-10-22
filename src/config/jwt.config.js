const passportJWT= require("passport-jwt")
const passport = require("passport")
const { PRIVATE_KEY } = require("../utils")



const searchToken = (req) => {
     let token = null
     
     if(req.cookies.token){

        token = req.cookies.token
        console.log("token obtenido jwt.config.js:10")
     }
     
     return token
     
}

const inicializePassportJWT = () =>{

    passport.use( "current" , new passportJWT.Strategy(

         { jwtFromRequest : passportJWT.ExtractJwt.fromExtractors([searchToken]),
        
           secretOrKey : PRIVATE_KEY
        
        }, ( jwtcontent , done ) => {
            
              try{
              
                
                return done( null , jwtcontent)
                
              }catch(error){console.log(error)}



        } 





    ))


}

module.exports = inicializePassportJWT