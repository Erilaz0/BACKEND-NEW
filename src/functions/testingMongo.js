const usersService = require("../services/users.service")
const  { faker } = require("@faker-js/faker")


async function test(){ 
    let fakeEmail = faker.internet.email()
    let errorVerify = await usersService.verifyEmailUser(fakeEmail)
    if(!errorVerify){
       
      
       let trueEmail = "alonsoalonsl431432@gmail.com"     
       let emailVerify = await usersService.verifyEmailUser(trueEmail)
       if(emailVerify){

        console.log("\x1b[32m users mongo is running")
       }else{

        console.log("\x1b[31m usersService error email verification of trueEmail - call technique")
       }


       }else{
        console.log("\x1b[31m usersService error , fake email was veryfied - call technique")

       }

}
   

   


module.exports = test