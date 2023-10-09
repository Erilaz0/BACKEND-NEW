const Router = require("express").Router
const router = Router()
const { error } = require("console")
const fs = require("fs")
const path = require("path")
const productsModelo = require("../models/products.modelo.js") 
const usersModel = require("../models/users.modelo.js")
const handleBars = require("express-handlebars")

/*
 

const products = path.join(__dirname,"..","archivosJson","products.json")

function saveProducts(pr){

     fs.writeFileSync(products,JSON.stringify(pr))

}


function getProducts(path){

    return JSON.parse(fs.readFileSync(path))




}
*/





router.get("/", async (req,res)=>{
   
    const limit = parseInt(req.query.limit)
    let pagina = req.query.pagina
    const sort = parseInt(req.query.sort)
    const nombre = req.session.nombre
    const email = req.session.email
    
    
    
    

    //ORDEN ASC O DECS
    if(sort === 1 || sort === -1){
    
      const products = await productsModelo.aggregate([{ $sort: { price : sort } }]) // tambien tiene $match y $group
      
     
       res.status(200).render("products",{

       products : products,
       nombre : nombre ,
        email : email 

      
      })}







   
  

    //FILTRAR POR LIMITE
    if(limit){ 
      const products = await productsModelo.find().limit(limit).lean()
      res.status(200).render( "products" , { 
        products : products,
        nombre : nombre ,
        email : email  } ) 
    }
    
    
    
    










    //FILTRAR POR PAGINA
    //DEVOLVER PAGINA 1
    if (!pagina || pagina === 0 ){
        
        pagina = 1
        const products = await productsModelo.paginate({},{ limit : 20 , lean : true , page : pagina })
        
        let {totalPages,
             hasPrevPage,
             hasNextPage,
             prevPage,
             nextPage} = products
        
        res.status(200).render("products",{

        products : products.docs,
        nombre : nombre ,
        email : email ,
        totalPages,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage


        })

    }//DEVOLVER PAGINA INDICADA EN LA QUERY
    else{
      
      const products = await productsModelo.paginate({},{ limit : 20 , lean : true , page : pagina })
        
        let {totalPages,
             hasPrevPage,
             hasNextPage,
             prevPage,
             nextPage} = products
        
        res.status(200).render("products",{

        products : products.docs,
        nombre : nombre ,
        email : email ,
        totalPages,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage


        })
      
      }








      
        //FILTRAR POR QUERY
     if(!sort && !pagina && !limit){//acalramos q no tome sort o pagina, ya que al estar todo pasado por query params va a intentar tomar los querys d epaginate,
      try {
        const query = req.query
        
          const products = await productsModelo.find(query).lean()
          if(products){res.status(200).render("products",{
            products:products,
            nombre : nombre ,
            email : email 
          })}
           
        
    }catch(error){console.log(error)}}

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


const updateProduct = await productsModelo.updateOne({_id:id},productToUpdate)

  


   
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
    const productDeleted = await productsModelo.deleteOne({_id:id})
    if(productDeleted){

     
      res.status(200).send("Producto id: " + id + "eliminado correctamente")
       

    }
    else{

      res.status(400).send("Producto id: " + id + "no existe")
     


    }


    




})







module.exports = router


