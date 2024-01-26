const multer = require("multer")
const { sendError } = require("../mailing/send")




const premiumStorage = multer.diskStorage({

    destination : "./uploads/documents" ,
    filename : function( req , file , cb ){
     cb(null , file.originalname)
    
    }
    
    
    })
    
    
const uploadProductImage = multer({
    
      storage : premiumStorage
    }).single("image")


const productImage = (req , res , err)=>{

  uploadProductImage(req, res, err => {
    if (err) {
      sendError(err)
              .then((sended) =>{ let i = sended })
              .catch((error) =>{ let i = error })
    } else {
      res.send('Imagen subida correctamente');
      const name = req.file.filename
      
    }
  });



}



  

module.exports = productImage