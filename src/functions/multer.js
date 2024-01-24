const multer = require("multer")
const path = require("path")



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
      res.send(err);
    } else {
      res.send('Imagen subida correctamente');
      const name = req.file.filename
      console.log(name) 
    }
  });



}



  

module.exports = productImage