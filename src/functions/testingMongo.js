const usersService = require("../services/users.service")
const  { faker } = require("@faker-js/faker")


async function test(){ 
    let fakeEmail = faker.internet.email()
    let errorVerify = await usersService.verifyEmailUser(fakeEmail)
    if(!errorVerify){
       
      
       let trueEmail = "alonsoalonsl431432@gmail.com"     
       let emailVerify = await usersService.verifyEmailUser(trueEmail)
      

}
   
}
   


module.exports = test