const passport = require("passport")
const handleBars = require("express-handlebars")
const productsService = require("../../services/products.service.js")
const usersService = require("../../services/users.service.js")
const cartsService = require("../../services/carts.service.js")
const cartCreateAndComprobe = require("../../functions/cartCeateAndComprobe.js")
const productsModel = require("../../dao/models/products.modelo.js")
const CustomError = require("../../Error/customError.js")
const typeError = require("../../Error/typeError.js")


async function getProducts( req , res ){

    
    if(!req.cookies.token){
        res.redirect("/api/sessions/login")
        req.logger.error(CustomError.CustomError( "ERR invalid token" , "token de session no valido" , typeError.ERROR_AUTENTICACION  , "user in products router with invalid token"))
        return
      }
     
     
      req.logger.warn();
     
     
      let data = req.cookies.datos
      const limit = parseInt(req.query.limit)
      const category = req.query.category
      const status = req.query.status
      let pagina = req.query.pagina
      const sort = parseInt(req.query.sort)
      let nombre = ""
      let email = ""
     

      if(data){
         nombre = data.nombre
         email = data.email
      }
      
  

  
      try{
        let id = req.user._id
        
        if(id){ 
      
          const user = await usersService.userById( id)
          
          nombre = user.nombre
          email = user.email
        
        }else{
          id = false
             }
      }catch(error){
        id = false
                   }
     
     
     
     
     
     
     // esta funcion se encarga de comprobar si el usuario que ah ingresado tiene un carrito, si no , se le crea uno 
     cartCreateAndComprobe(email)
      
      
      
      
     
      
  
      if(!nombre && !email){res.status(200).send( { message : " Datos de la sesion ( nombre y email ) no reconocidos " } ) }
      
     
      
  
      if(sort || limit || pagina || category || status){
        
  /*sort*/ if(sort && sort === 1 || sort === -1){
      
            const products = await productsService.sortPrice(sort) // tambien tiene $match y $group
        
       
            res.status(200).render("products",{
  
            products : products,
            nombre : nombre ,
            email : email 
  
        
           })}
          
           if(limit){ 
            const products = await productsService.productByLimit(limit)
            res.status(200).render( "products" , { 
              products : products,
              nombre : nombre ,
              email : email  } 
                    ) 
              }
  
              
          
         if(pagina){
          let limite = 20
          const products = await productsService.products_Paginate( pagina , limite )
            
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
       
           
            
               
               
               const products = await productsService.productsByStatus(status)
                        if(products){
              
                              res.status(200).render("products",{
               
                              products:products,
                              nombre : nombre ,
                              email : email 
                               })}}
             
             
            
  
             
          
          
          if(category){    //FILTRAR POR QUERY
       
              
             if(category){ const products = await productsService.productsByCategory( category )
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
      let limite = 20
      const products = await productsService.products_Paginate( pagina , limite )
      const productsCategory = await productsService.getProducts()
      const categoriasRepetidas = []

      for(let i = 0 ; i < productsCategory.length ; i++){
     
        const pr = productsCategory[i].category
        categoriasRepetidas.push(pr)

       }
       const categorias = [... new Set(categoriasRepetidas)]
      
      let {totalPages,
           hasPrevPage,
           hasNextPage,
           prevPage,
           nextPage} = products
      
      res.status(200).render("products",{
  
      products : products.docs,
      categorias : categorias ,
      nombre : nombre ,
      email : email ,
      totalPages,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage
  
  
        })

      
     }//DEVOLVER PAGINA INDICADA EN LA QUERY
  
  
  



}

module.exports = getProducts