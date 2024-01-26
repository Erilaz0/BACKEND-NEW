const passport = require("passport")
const github = require("passport-github2")
const usersService = require("../services/users.service")

const inicializaPassport = ()=>{

   passport.use("github", new github.Strategy({

     clientID:"Iv1.294f6c3e7a76e8da",
     clientSecret:"d014edb9be3f7f8f9a25cccb3b7262455c6dcae1",
     callbackURL:"https://backend-new-production.up.railway.app/api/sessions/callbackGithub"
    

   },
   async( token , tokenRefresh , profile , done )=>{

    try{
      if(profile){
      let i = 0
      }
         let findUser = await usersService.verifyEmailUser(profile._json.email)
         if(!findUser){
             
               findUser = await usersService.createUser({  nombre : profile._json.name , email : profile._json.email , profile : profile })

         }
        
         done(null,findUser)
    }
    catch(error){done(error)}

 
   }
   
   
   ))
   passport.serializeUser((findUser,done)=>{
     return done(null,findUser._id)

   })
   passport.deserializeUser(async(id,done)=>{


    findUser = await usersService.userById( id )
    return done(null,findUser)
   })

}

module.exports = inicializaPassport