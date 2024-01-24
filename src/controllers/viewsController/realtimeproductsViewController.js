
async function realtimeproductsView( req , res ){
   
  
  
  if(req.cookies.datos){
   
    const { email } = req.cookies.datos 
    
    res.setHeader("Content-Type","text/html")
    res.status(200).render(  "realtimeproducts" , { email : email } )

   }else if(req.cookies.admin){
    let admin = true
    res.setHeader("Content-Type","text/html")
    res.status(200).render( "realtimeproducts" , { admin } )
   }else{

   req.logger.warn("no se puede acceder a las cookies - datos . realtimeproductsViewController.js")

   }
      
     
   
   

    }

module.exports = realtimeproductsView