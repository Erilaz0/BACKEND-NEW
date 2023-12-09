const bcrypt = require("bcrypt")
const usersService = require("../../services/users.service")


async function register( req , res ){

     
    const { nombre , apellido ,  email , password } = req.body
    let { edad } = req.body
    
   console.log(`nuevo usuario ${email}`)
   

    if( !nombre || !email || !password || !apellido  || !edad ){

        res.status(400).send("complete todos los campos")
        
    }else{
     const emailVerification = await usersService.verifyEmailUser(email)
     
     if(emailVerification){

        res.status(400).send("usuario con ese email ya existe")

     }else{

         hash = await bcrypt.hash( password , 10 )
         
         
        
        edad = parseInt(edad)
        const userCreate = await usersService.createUser({ nombre , apellido , edad , email , password : hash})
     
        if(userCreate){
         const emailVerification = await usersService.verifyEmailUser(email)
         let id = emailVerification._id
         let newPassword = hash
         const addOld = await usersService.addOldPassword( id , newPassword ) 
         if(addOld){

            console.log("ususario grabado en db")
            res.status(200).redirect("/api/sessions/login")

         }
          
   
        }else{
   
           res.status(400).send("no es posible crear este usuario")
        }
}
}

}

module.exports = register