const socket = io();




const form = document.querySelector("#form")

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
pr.push(newProduct)



socket.on("nombre",data=>{

      
   
    data.emit("newProduct",pr)
  
  
  
  })



}


form.addEventListener("submit",enviar)








 


