const socket = io();




const form = document.querySelector("#form")
const deleteForm = document.querySelector("#del")

const pr = []

function enviar(e){
    e.preventDefault()
   

const title = document.querySelector("#title").value
const price = document.querySelector("#price").value
const description = document.querySelector("#description").value
const stock = document.querySelector("#stock").value
const category = document.querySelector("#category").value
const code = document.querySelector("#code").value

const newProduct = {
    title:title,
    price:price,
    description:description,
    stock:stock,
    category:category,
    code:code
}

socket.emit("newProduct", newProduct)
}




function enviarEliminado(e){
    e.preventDefault()
const id = document.querySelector("#idp").value

const idObject = {id : id}

socket.emit("deleted",idObject)


}






deleteForm.addEventListener("submit",enviarEliminado)
form.addEventListener("submit",enviar)








 


