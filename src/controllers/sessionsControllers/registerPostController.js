const bcrypt = require("bcrypt")
const usersService = require("../../services/users.service")


async function register( req , res ){

     
    const { nombre , apellido ,  email , password } = req.body
    let { edad } = req.body
    
   req.logger.info(`nuevo usuario email: ${email} - apellido : ${apellido} - password : ${password} - nombre : ${nombre} - edad : ${edad}`)
   

    if( !nombre || !email || !password || !apellido  || !edad ){
        res.setHeader("Content-Type","text/plain")
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
         req.logger.info("usuario creado")
         const emailVerification = await usersService.verifyEmailUser(email)
         let id = emailVerification._id
         let newPassword = hash
         const addOld = await usersService.addOldPassword( id , newPassword ) 
         if(addOld){

            
            let user = {
               nombre : nombre , 
               apellido : apellido , 
               edad : edad , 
               email : email , 
               password : password



            }
            
            res.status(302).redirect("/api/sessions/login")

         }
          
   
        }else{
           res.setHeader("Content-Type","text/plain")
           res.status(400).send("no es posible crear este usuario")
        }
}
}

}

module.exports = register