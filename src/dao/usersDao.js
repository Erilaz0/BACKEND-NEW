const usersModelo = require("./models/users.modelo")
const  dao  = require("../config/factory")


class usersMongoDao{

   constructor(){}


   async verifyEmailUser(email){

    return await dao.findOne({email:email})

   }

   async createUser({nombre , apellido , edad , email , password , profile}){
   
      if(!apellido && !edad && !password){
        
         return await dao.create({ nombre : nombre , email : email , profile : profile })
     
       }
      else{
       if(!profile){
        
         return await dao.create({ nombre : nombre , apellido : apellido , edad : edad , email : email , password : password})

      }


  }
}

   async userById( id ){

    return await dao.findOne({ _id : id })

   }


   async newPassword( id , newPassword ){

     return await dao.updateOne( { _id : id } , { $set : { password : newPassword } } )

   }

   async addOldPassword( id , newPassword){


     return await dao.updateOne( { _id : id } , { $push : { oldpasswords : { password : newPassword } } } )

   }
        
   async premiumUser( email , premium ){

    return await dao.updateOne( { email } , { $set :{ premium : premium }})


   }
   async ispremium( email ){

    return await dao.findOne( {email : email , premium : true})

   }

   async changePhoto( id , profilephoto){
 
    return await dao.updateOne({ _id : id } , { profilephoto : profilephoto })

   }

   async comporbanteDomicilio( id , document ){


   return await dao.updateOne( { _id : id , } , { $push : {documents : { C_D : document} }})

   }

   async cedulaDeIdentidad( id , document ){


    return await dao.updateOne( { _id : id , } , { $push : {documents : { C_I : document} }})
 
    }

   async lastConnection( id , date ){

    return await dao.updateOne( { _id : id } , { last_connection : date } )

   }
  
}

module.exports = usersMongoDao