const usersModelo = require("./models/users.modelo")



class usersMongoDao{

   constructor(){}


   async verifyEmailUser(email){

    return await usersModelo.findOne({email:email})

   }

   async createUser({nombre , apellido , edad , email , password , profile}){
   
      if(!apellido && !edad && !password){
        
         return await usersModelo.create({ nombre : nombre , email : email , profile : profile })
     
       }
      else{
       if(!profile){

         return await usersModelo.create({ nombre , apellido , edad , email , password })

      }


  }
}

   async userById( id ){

    return await usersModelo.findOne({ _id : id })

   }
}

module.exports = usersMongoDao