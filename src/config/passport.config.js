const passport = require("passport")
const github = require("passport-github2")
const usersModel = require("../models/users.modelo")

const inicializaPassport = ()=>{

   passport.use("github", new github.Strategy({

     clientID:"Iv1.294f6c3e7a76e8da",
     clientSecret:"d014edb9be3f7f8f9a25cccb3b7262455c6dcae1",
     callbackURL:"http://localhost:8080/api/sessions/callbackGithub"
    

   },
   async( token , tokenRefresh , profile , done )=>{

    try{
      if(profile){
        console.log(profile)
        console.log(profile._json.email)
      }
         let findUser = await usersModel.findOne({email:profile._json.email})
         if(!findUser){
             
               findUser = await usersModel.create({
                nombre : profile._json.name,
                email : profile._json.email,
                github: profile
            })

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


    findUser = await usersModel.findById(id)
    return done(null,findUser)
   })

}

module.exports = inicializaPassport