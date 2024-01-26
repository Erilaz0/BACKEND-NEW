const socket = io();
const formdata = new FormData()



const form = document.querySelector("#form")
const deleteForm = document.querySelector("#del")
const chatSendButton = document.querySelector("#messageButton")
const getUser = document.querySelector("#get_user")
const cleanusers = document.querySelector(`#cleanusers`)


async function clean(e){
   
    e.preventDefault()
    
    const expiredusers = document.querySelector("#expiredusers")
    fetch(`https://backend-new-production.up.railway.app/api/users/expiredusers`, { method: `DELETE` })
     .then(response => response.json())
     .then(number => expiredusers.innerHTML = `Usuarios eliminados de la base de datos por expiracion ${number}`)
     .catch(error => {let i = error})

}




function userById(e){
    
    e.preventDefault()
    const id = document.querySelector("#id").value
    
    fetch(`https://backend-new-production.up.railway.app/api/users/${id}/user`,{method:`GET`})
    .then(response => response.json())
    .then(async (user)=>{
       let userData = user
       
       const user_credentials = document.querySelector("#user_credentials")
       user_credentials.innerHTML = `
       
       <p>ID:${userData._id}</p>
       <p>Nombre:${userData.nombre}</p>
       <p>Apellido:${userData.apellido}</p>
       <p>Edad:${userData.edad}</p>
       <p>Email:${userData.email}</p>
       <p>Ultima Conexion:${userData.last_connection}</p>
       <p>Rol:${userData.rol}</p>
       <p>Premium:${userData.premium}</p>
       <p>ID del carrito asociado:${userData.cart}</p>
       
       `

    })
    .catch(error => {let i = error})


}


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

fetch("https://backend-new-production.up.railway.app/realtimeproducts", {method : `POST` , body: formdata})
 



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
let i = 0
    
}else{
  
   
    const datos = {user : user, message : message}

    socket.emit("ne",datos)
    
    }


}

if(deleteForm){deleteForm.addEventListener("submit",enviarEliminado)}
if(form){form.addEventListener("submit",enviar)}
if(chatSendButton){chatSendButton.addEventListener("submit",enviarMensaje)}
if(getUser){getUser.addEventListener("submit", userById )}
if(cleanusers){cleanusers.addEventListener("click" , clean )}


socket.on("new", mensaje => {
   
    
    const mensajes = document.querySelector("#msj")
    mensajes.innerHTML = "";
    mensaje.forEach((data) => {
        const mensajeHTML = `${data.user} : ${data.message}<br>`;
        mensajes.innerHTML += mensajeHTML;
      })
   

})








 


