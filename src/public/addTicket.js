const socket = io()

const sendTicket = document.querySelector(".sendTicket")
const id = document.querySelector(".sendTicket").id
const delete_product = document.querySelectorAll(".delete_product")


for( let i = 0 ; i < delete_product.length ; i++ ){
        
        
        delete_product[i].addEventListener("click", async ()=>{
        
        let idProduct = document.querySelector(".delete_product").id

        let data = {
          idProduct : idProduct,
          id:id


        }
        socket.emit("deleteProductCart" , data)

        socket.on("reload", reloadPage =>{

          location.reload()


        })
        
            
        
        
        })
        
        
        
        }

sendTicket.addEventListener("click", ()=>{

socket.emit( "sendTicket" , id )

})






