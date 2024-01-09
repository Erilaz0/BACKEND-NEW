const multer = require("multer")




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
      res.send(err);
    } else {
      res.send('Imagen subida correctamente');
      const name = req.file.filename
      console.log(name) 
    }
  });



}



  

module.exports = productImage