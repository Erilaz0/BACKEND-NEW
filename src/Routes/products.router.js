const Router = require("express").Router
const router = Router()
const { error } = require("console")
const fs = require("fs")
const path = require("path")
const session = require("express-session")
const passport = require("passport")
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
    const category = req.query.category
    const status = req.query.status
    let pagina = req.query.pagina
    const sort = parseInt(req.query.sort)
    let nombre = ""
    let email = ""


    try{
      const id = req.user._id
      
      if(id){ 
    
        const user = await usersModel.findOne({_id:id})
        
        nombre = user.nombre
        email = user.email
      
      }
    }catch(error){console.log(error)}
    
    if(req.session.nombre && req.session.email){ 
   
      nombre = req.session.nombre
      email = req.session.email
     console.log("estan")
    }
   

    if(!nombre && !email){console.log("no estan")}
    
    
    
    

    if(sort || limit || pagina || category || status){
      console.log("entre")
/*sort*/ if(sort && sort === 1 || sort === -1){
    
          const products = await productsModelo.aggregate([{ $sort: { price : sort } }]) // tambien tiene $match y $group
      
     
          res.status(200).render("products",{

          products : products,
          nombre : nombre ,
          email : email 

      
         })}
        
         if(limit){ 
          const products = await productsModelo.find().limit(limit).lean()
          res.status(200).render( "products" , { 
            products : products,
            nombre : nombre ,
            email : email  } 
                  ) 
            }

            
        
       if(pagina){
        
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
  
       
        if(status){    //FILTRAR POR QUERY
     
         
          if(status === "true"){ 
             
             
             const products = await productsModelo.find({status:true}).lean()
                      if(products){
            
                            res.status(200).render("products",{
             
                            products:products,
                            nombre : nombre ,
                            email : email 
                             })}}
           
           
          else if(status === "false"){

            
            
            const products = await productsModelo.find({status:false}).lean()
                      if(products){
            
                         res.status(200).render("products",{
            
                         products:products,
                         nombre : nombre ,
                         email : email 
                         })}
                        else{res.status(400).send("Todos los productos disponibles")}
                        }


           }
        
        
        if(category){    //FILTRAR POR QUERY
     
            console.log("kuchau")
           if(category){ const products = await productsModelo.find({category}).lean()
            if(products){
             
              res.status(200).render("products",{
             
              products:products,
              nombre : nombre ,
              email : email 
            })
          }
        }
          
            
         
     }} 
    
   else{
        
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


