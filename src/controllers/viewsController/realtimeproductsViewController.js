
async function realtimeproductsView( req , res ){
   if(req.cookies.datos){
   
    const { email } = req.cookies.datos 
    
    res.status(200).render("realtimeproducts",{
  
      email:email
    })

   }else{

    res.status(200).render("realtimeproducts")
   }
      
     
   
   

    }

module.exports = realtimeproductsView