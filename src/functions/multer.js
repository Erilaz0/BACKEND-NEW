const multer = require("multer")
const path = require("path")
const { sendError } = require("../mailing/send")


const productsStorage = multer.diskStorage({

    destination : "./uploads/products" ,
    filename : function( req , file , cb ){
     cb(null , file.originalname)
    
    }
    
    
    })
    
    
const uploadProductImage = multer({
    
      storage : productsStorage
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