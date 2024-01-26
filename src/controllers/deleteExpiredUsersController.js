const moment = require("moment")
const usersService = require("../services/users.service")
const { sendDeletedUserAdvice } = require("../mailing/send")



const clear = async ( req , res )=>{
    
   
        
        let hoy = moment()
        let totalExpiredUsers = 0;
        
        const users = await usersService.getAccounts()
        
        for( let i = 0 ; i < users.length ; i++){
           
            let user = users[i].last_connection
            let see = moment(user , "dddd Do MMMM YYYY")
            
            let totalDays = hoy.diff(see,"days")
            
            req.logger.info(`Fecha Actual: ${hoy}`)
            req.logger.info(`Last User Connection MongoDB: ${user}`)
            req.logger.info(`Last User Connection on Moment: ${see}`)
            req.logger.info(`Dias De Diferencia Entre Fecha Actual y Last User Connection on Moment: ${totalDays}`)
            
            
            if(totalDays === 2 ){
            
            sendDeletedUserAdvice( users[i].email , user )
              .then(( response )=>{
                req.logger.info(`El usuario ${users[i].email} ah sido avisado de la eliminacion de su cuenta`)
                req.logger.info(response)

              })
              .catch((error)=>{

                
                req.logger.info(error)
               }
              )
             await usersService.deleteUser(users[i]._id)
             totalExpiredUsers++;

            
            }else{
              
              let i= 0
            }
           
            
            
        }
        let stringyExpiredUsers = JSON.stringify(totalExpiredUsers)
        return res.status(200).send(stringyExpiredUsers)


   
    






}


module.exports = clear