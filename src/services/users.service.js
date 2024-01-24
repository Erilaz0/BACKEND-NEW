const usersMongoDao = require("../dao/usersDao")


class usersService{

    constructor(dao){

      this.dao = new dao()

    }

    async getAccounts(){

      return await this.dao.getAccounts()

    }

    async verifyEmailUser( email ){

      return await this.dao.verifyEmailUser( email )

    }

    async createUser({nombre , apellido , edad , email , password , profile}){

      if(!apellido && !edad && !password){
       
        return await this.dao.createUser({ nombre , email , profile })

      }
      else{

         if(!profile){
          
          return await this.dao.createUser({ nombre , apellido , edad , email , password })
 
         }

      }
      

    }

    async userById( id ){

     return await this.dao.userById( id )

    }

    async newPassword( id , newPassword ){

      return await this.dao.newPassword( id , newPassword)
 
    }
 
    async addOldPassword( id , newPassword){
 
 
      return await this.dao.addOldPassword( id , newPassword )
 
    }

    async premiumUser( email , premium ){

      return await this.dao.premiumUser( email , premium ) 
  
  
     }

    async ispremium( email ){

      return await this.dao.ispremium( email )
  
     }


    async changePhoto( id , profilephoto){
 
      return await this.dao.changePhoto( id , profilephoto )
  
     }

    async comporbanteDomicilio( id , document ){


      return await this.dao.comporbanteDomicilio( id , document )
   
      }
   
    async cedulaDeIdentidad( id , document ){
   
   
       return await this.dao.cedulaDeIdentidad( id , document )
    
       }

    async lastConnection( id , date ){

      return await this.dao.lastConnection( id , date )
  
     }
 
     
    async deleteUser( id ){

      return await this.dao.deleteUser( id )
  
     }
}

module.exports = new usersService(usersMongoDao)