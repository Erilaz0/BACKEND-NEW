const Router = require("express").Router
const router = Router()
const { error } = require("console")
const fs = require("fs")
const path = require("path")
const productsModelo = require("../models/products.modelo.js") 
const productsModel = require("../models/products.modelo.js")

/*
 

const products = path.join(__dirname,"..","archivosJson","products.json")

function saveProducts(pr){

     fs.writeFileSync(products,JSON.stringify(pr))

}


function getProducts(path){

    return JSON.parse(fs.readFileSync(path))




}
*/

router.get("/",async (req,res)=>{
    const limit = parseInt(req.query.limit)
    //const Products = getProducts(products)
    const products = await productsModelo.find({},"-_id title description code price stock category")
    if (!limit || limit === 0){
        
        res.status(200).send(products)
       
    }
    else{

       const limitContainer = []
       for(i = 0; i < limit; i++){
        limitContainer.push(products[i])
           


       }
       res.send(limitContainer)
      }

})


router.get("/:pid", async (req,res)=>{
      const id = req.params.pid
      const products = await productsModelo.findOne({"_id":id}).select("-_id")
      
      if(products){ 
        
        res.status(200).send(products)
      
      }else{

        res.status(400).send("Prodcuto id " + id + " no encontrado")


      }
    
    }

)


router.post("/", async (req,res)=>{

    const {title, description, code, price, status, stock, category} = req.body
    if (!title || !description || !code || !price || !status || !stock || !category) {
        return res.status(400).json({ error: 'Complete all required fields in the body' });
    }
   
    

    
    const newProduct = {
        title,
        description,
        code, 
        price, 
        status,
        stock,
        category,
        

          }

    await productsModelo.create(newProduct)
    res.status(201).json({ newProduct });

})

router.put("/:pid", async (req,res)=>{

const id = req.params.pid
const productToUpdate = req.body


const updateProduct = await productsModel.updateOne({_id:id},productToUpdate)

  


   
if(updateProduct){  
  res.status(200).json("Producto actualizado correctamente")
 }
else{

    res.status(400).send("producto no actualizado")
}
}
)


router.delete("/:pid", async (req,res)=>{

    const id = req.params.pid
    const productDeleted = await productsModel.deleteOne({_id:id})
    if(productDeleted){

     
      res.status(200).send("Producto id: " + id + "eliminado correctamente")
       

    }
    else{

      res.status(400).send("Producto id: " + id + "no existe")
     


    }


    




})







module.exports = router
