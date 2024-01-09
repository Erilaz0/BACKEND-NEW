const socket = io();
const formdata = new FormData()



const form = document.querySelector("#form")
const deleteForm = document.querySelector("#del")
const chatSendButton = document.querySelector("#messageButton")



function enviar(e){
    e.preventDefault()


const title = document.querySelector("#title").value
const price = document.querySelector("#price").value
const description = document.querySelector("#description").value
const stock = document.querySelector("#stock").value
const category = document.querySelector("#category").value
const code = document.querySelector("#code").value
const email = document.querySelector(".email")
const image = document.querySelector("#image")
const file = image.files[0]
formdata.append(`image` , file)

fetch("http://localhost:8080/realtimeproducts", {method : `POST` , body: formdata})
 



if(email.id === `type="submit"`){
    const newProduct = {
        title:title,
        price:price,
        description:description,
        stock:stock,
        category:category,
        code:code,
        thumbnail:file.name
        
    
    }


    socket.emit("newProduct", newProduct )
}else{

    const newProduct = {
        title:title,
        price:price,
        description:description,
        stock:stock,
        category:category,
        code:code,
        owner:email.id,
        thumbnail:file.name
    
    }
  
    socket.emit("newProduct", newProduct )
}




}




function enviarEliminado(e){

    e.preventDefault()
const email = document.querySelector(".email")
const id = document.querySelector("#idp").value
if(email.id === `type="submit"`){
  
    const idObject = { id : id }

    socket.emit("deleted",idObject)


}else{
    
    const idObject = { id : id , email : email.id }

    socket.emit("deleted",idObject)
    

}


}


function enviarMensaje(e){

    e.preventDefault()

const user = document.querySelector(".messageId").id
const message = document.querySelector(".messageId").value

if(!user && !message){
    console.log("error")
    
}else{
  
   
    const datos = {user : user, message : message}

    socket.emit("ne",datos)
    
    }


}

if(deleteForm){deleteForm.addEventListener("submit",enviarEliminado)}
if(form){form.addEventListener("submit",enviar)}
if(chatSendButton){chatSendButton.addEventListener("click",enviarMensaje)}


socket.on("new", mensaje => {
    console.log(mensaje)
    
    const mensajes = document.querySelector("#msj")
    mensajes.innerHTML = "";
    mensaje.forEach((data) => {
        const mensajeHTML = `${data.user} : ${data.message}<br>`;
        mensajes.innerHTML += mensajeHTML;
      })
   

})








 


