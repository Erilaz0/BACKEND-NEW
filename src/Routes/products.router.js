const Router = require("express").Router
const router = Router()
const { error } = require("console")
const fs = require("fs")
const path = require("path")


const products = path.join(__dirname,"..","archivosJson","products.json")

function saveProducts(pr){

     fs.writeFileSync(products,JSON.stringify(pr))

}


function getProducts(path){

    return JSON.parse(fs.readFileSync(path))




}

router.get("/",(req,res)=>{
    const limit = parseInt(req.query.limit)
    const Products = getProducts(products)
    
    if (!limit || limit === 0){
        res.send(getProducts(products))
       
    }
    else{

       const limitContainer = []
       for(i = 0; i < limit; i++){
        limitContainer.push(Products[i])
           


       }
       res.send(limitContainer)
      }

})


router.get("/:pid",(req,res)=>{
      const id = parseInt(req.params.pid)
      const Products = getProducts(products)
      const idProduct = Products.find(product => product.id === id)
      if(idProduct){ 
        
        res.json(idProduct)
      
      }else{

        res.status(400).send("Prodcuto id " + id + " no encontrado")


      }
    
    }

)


router.post("/",(req,res)=>{

    const {title, description, code, price, status, stock, category} = req.body
    if (!title || !description || !code || !price || !status || !stock || !category) {
        return res.status(400).json({ error: 'Complete all required fields in the body' });
    }
   
    console.log(title)

    const Products = getProducts(products)
    const newProduct = {
        title,
        description,
        code, 
        price, 
        status,
        stock,
        category,
        id:Products.length + 1

          }

    Products.push(newProduct)
    saveProducts(Products)
    res.status(201).json({ newProduct });

})

router.put("/:pid",(req,res)=>{

const id = parseInt(req.params.pid)
const {title, description, code, price, status, stock, category} = req.body
 if(!title || !description || !code || !price || !status || !stock || !category){

     res.status(400).JSON.parse({error:"completa todos los cammpos"})

 }

 else{

  const Products = getProducts(products)
  const productUpdateId = Products.findIndex(product => product.id === id)

  Products[productUpdateId] = {


    title,
    description,
    code, 
    price, 
    status,
    stock, 
    category,
    id : productUpdateId

      
  } 
   
  saveProducts(Products)
  res.status(200).send("Producto actualizado correctamente")
 }
})


router.delete("/:pid",(req,res)=>{

    const id = req.params.pid
    const Products = getProducts(products)
    const indexProductToDelete = Products.findIndex(product => product.id === id)
    if(!indexProductToDelete){

      res.status(400).send("Producto id: " + id + "no existe")

       

    }
    else{

      const index = indexProductToDelete - 1

      Products.splice(index,1)
      saveProducts(Products)
      res.status(200).send("Producto id: " + id + "eliminado correctamente")


    }


    




})







module.exports = router
