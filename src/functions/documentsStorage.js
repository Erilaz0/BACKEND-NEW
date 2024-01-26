const multer = require("multer")




async function documentsStorage(req , res){

    const dest = req.params.uid
  
    
    const productsStorage = multer.diskStorage({
    
        destination : `./uploads/${dest}` ,
        filename : function( req , file , cb ){
         cb(null , file.originalname)
        
        }
        
        
        })

    const uploadImage = multer({
        
            storage : productsStorage
          }).single("image")
        
    return uploadImage(req , res )
        
  

    
    
    
    
      

}

module.exports = documentsStorage