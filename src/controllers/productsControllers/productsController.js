const productsService = require("../../services/products.service.js")
const usersService = require("../../services/users.service.js")
const cartCreateAndComprobe = require("../../functions/cartCeateAndComprobe.js")
const CustomError = require("../../Error/customError.js")
const typeError = require("../../Error/typeError.js")




async function getProducts( req , res ){


    
     
     
      req.logger.debug("acceso a products");
     
     
      let data = req.cookies.datos
      const limit = parseInt(req.query.limit)
      const category = req.query.category
      const status = req.query.status
      let pagina = req.query.pagina
      const sort = parseInt(req.query.sort)
      let nombre = ""
      let email = ""
      let id ;
      

      if(data){
         nombre = data.nombre
         email = data.email
         id = data.id
      }
      
  

  
      
     
     
     
     
     
     // esta funcion se encarga de comprobar si el usuario que ah ingresado tiene un carrito, si no , se le crea uno 
     try{   cartCreateAndComprobe(email)}
     catch(error){req.logger.debug("No se ah poidio crear el carrito - productsController.js")}
  
      
      
      
     
     
      
  
      if(!nombre && !email){req.logger.debug("No hay Nombre ni Email para proceder - productsController") }
      
     
      
  
      if(sort || limit || pagina || category || status){
        
  /*sort*/ if(sort && sort === 1 || sort === -1){
      
            const products = await productsService.sortPrice(sort) // tambien tiene $match y $group
            const productsCategory = await productsService.getProducts()
            const categoriasRepetidas = []
            if( products && productsCategory && categoriasRepetidas ){
              for(let i = 0 ; i < productsCategory.length ; i++){
           
                const pr = productsCategory[i].category
                categoriasRepetidas.push(pr)
        
               }
               const categorias = [... new Set(categoriasRepetidas)]
          
         
              res.status(200).render("products",{
    
              products : products,
              nombre : nombre ,
              email : email ,
              categorias : categorias
    
          
             })


            }else{
              req.logger.warn("LA OPCION SORT EN PRODUCTS NO AH PODIDO ACCEDER A LA SIGUIENTE DATA : constante - products ,constante - productsCategory , constante - categoriasRepetidas")

            }
      
           }
          
           if(limit){ 
            const productsCategory = await productsService.getProducts()
            const categoriasRepetidas = []
            if(productsCategory && categoriasRepetidas){
               

              for(let i = 0 ; i < productsCategory.length ; i++){
           
                const pr = productsCategory[i].category
                categoriasRepetidas.push(pr)
        
               }
               const categorias = [... new Set(categoriasRepetidas)]
  
                const products = await productsService.productByLimit(limit)
                res.status(200).render( "products" , { 
                
                  products : products,
                  nombre : nombre ,
                  email : email ,
                  categorias : categorias  } 
                       ) 

            }else{
              req.logger.warn("LA OPCION LIMIT EN PRODUCTS NO AH PODIDO ACCEDER A LA SIGUIENTE DATA : constante - productsCategory , constante - categoriasRepetidas")
            }
      
        
              }
  
              
          
         if(pagina){
          const productsCategory = await productsService.getProducts()
          const categoriasRepetidas = []

          if( productsCategory && categoriasRepetidas ){

            for(let i = 0 ; i < productsCategory.length ; i++){
         
              const pr = productsCategory[i].category
              categoriasRepetidas.push(pr)
      
             }
            const categorias = [... new Set(categoriasRepetidas)]
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
              categorias : categorias,
              totalPages,
              hasPrevPage,
              hasNextPage,
              prevPage,
              nextPage
      
      
              })

          }else{
            req.logger.warn("LA OPCION PAGINA EN PRODUCTS NO AH PODIDO ACCEDER A LA SIGUIENTE DATA : constante - productsCategory , constante - categoriasRepetidas")

          }
    
          
          }
    
         
          if(status){    //FILTRAR POR QUERY
       
           
            const productsCategory = await productsService.getProducts()
            const categoriasRepetidas = []
            if( productsCategory && categoriasRepetidas ){
             
              for(let i = 0 ; i < productsCategory.length ; i++){
           
                const pr = productsCategory[i].category
                categoriasRepetidas.push(pr)
        
               }
               const categorias = [... new Set(categoriasRepetidas)]
                 
                 
                 const products = await productsService.productsByStatus(status)
                          if(products){
                
                                res.status(200).render("products",{
                 
                                products:products,
                                nombre : nombre ,
                                email : email ,
                                categorias : categorias
                                 })}else{

                                  req.logger.warn("No se ah podido encontrar productos con el cmapo status")
                                 }

            }else{
              req.logger.warn("LA OPCION STATUS EN PRODUCTS NO AH PODIDO ACCEDER A LA SIGUIENTE DATA : constante - productsCategory , constante - categoriasRepetidas")

            }
      
           }
             
             
            
  
             
          
          
          if(category){    //FILTRAR POR QUERY
       
              
             if(category){ 
                const products = await productsService.productsByCategory( category )
                const productsCategory = await productsService.getProducts()
                const categoriasRepetidas = []

              if( products , productsCategory , categoriasRepetidas ){
                
          
                for(let i = 0 ; i < productsCategory.length ; i++){
               
                  const pr = productsCategory[i].category
                  categoriasRepetidas.push(pr)
          
                 }
                 const categorias = [... new Set(categoriasRepetidas)]
               
                res.status(200).render("products",{
               
                products:products,
                nombre : nombre ,
                email : email,
                categorias : categorias
              })
            }else{

              req.logger.warn("LA OPCION CATEGORY EN PRODUCTS NO AH PODIDO ACCEDER A LA SIGUIENTE DATA : constante - products , constante - productsCategory , constante - categoriasRepetidas")
            }
          }
            
              
           
       }} 
      
     else{
      
      pagina = 1
      let limite = 20
      const products = await productsService.products_Paginate( pagina , limite )
      const productsCategory = await productsService.getProducts()
      const categoriasRepetidas = []
      if( products , productsCategory , categoriasRepetidas ){

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
        iduser : id ,
        products : products.docs ,
        categorias : categorias ,
        nombre : nombre ,
        email : email ,
        totalPages,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage
    
    
          }
          )}else{
            req.logger.warn("LA OPCION NO QUERY EN PRODUCTS NO AH PODIDO ACCEDER A LA SIGUIENTE DATA : constante - products , constante - productsCategory , constante - categoriasRepetidas")
            
          }

     

      
     }//DEVOLVER PAGINA INDICADA EN LA QUERY
  
  
  



}

module.exports = getProducts