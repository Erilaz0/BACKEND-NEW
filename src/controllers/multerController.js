const multer = require("multer")
const usersService = require("../services/users.service")
const { sendError } = require("../mailing/send")

async function documents(req , res){
    let id = req.params.uid
    const document = req.query.document
    
       
      
      

    
    
    
    
    
    if(document === "C_I"){
      

      const add_CI = async ( name )=>{ await usersService.cedulaDeIdentidad( id , name ) }
      const productsStorage = multer.diskStorage({
    
        destination : `./uploads/documents` ,
        filename : function( req , file , cb ){
         cb(null , file.originalname)
         
        }
        
        
        })
    
    const uploadImage = multer({
        
            storage : productsStorage
          }).single("C_I")
        
    
        
  
    
    uploadImage(req, res, err => {
        if (err) {
           sendError(err)
              .then((sended) =>{ let i = sended })
              .catch((error) =>{ let i = error })
        } else {
          
           name = req.file.filename
           add_CI(name)
           return res.status(200).redirect("/api/users/premium")
           
          

            

           
           
       
        }
      });



    }
    else if(document === "C_D"){
      
      const add_CD = async ( name )=>{ await usersService.comporbanteDomicilio( id , name ) }
      const productsStorage = multer.diskStorage({
    
        destination : `./uploads/documents` ,
        filename : function( req , file , cb ){
         cb(null , file.originalname)
        
        }
        
        
        })
    
    const uploadImage = multer({
        
            storage : productsStorage
          }).single("C_D")
        
    
        
  
    
    uploadImage(req, res, err => {
        if (err) {
           sendError(error)
                .then((sended) =>{ let i = sended })
                .catch((error) =>{ let i = error })
        } else {
          
           name = req.file.originalname
           add_CD(name)
           return res.status(200).redirect("/api/users/premium")
          

            

           
           
       
        }
      });


    }
    
    else{
      
      const changeProfilePhoto = async ( name )=>{ await usersService.changePhoto( id , name) }
   
      const productsStorage = multer.diskStorage({
      
          destination : `./uploads/profile` ,
          filename : function( req , file , cb ){
           cb(null , file.originalname)
          
          }
          
          
          })
      
      const uploadImage = multer({
          
              storage : productsStorage
            }).single("image")
          
      
          
    
      
      uploadImage(req, res, err => {
          if (err) {
            sendError(err)
              .then((sended) =>{ let i = sended })
              .catch((error) =>{ let i = error })
          } else {
             
             name = req.file.filename
             changeProfilePhoto(name)
             res.status(200).redirect("/current")
             
         
          }
        });


    }
   
    
    
    
    
    
    
      

}

module.exports = documents