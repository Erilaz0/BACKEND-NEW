const socket = io()


const addToCar = document.getElementsByClassName("productbutton")
const email = document.querySelector(".email")

    
for( let i = 0 ; i < addToCar.length ; i++ ){

addToCar[i].addEventListener("click", async ()=>{
    
    const idButton = addToCar[i].id
    console.log(idButton)
    const data = {
       idProduct : idButton,
       email : email.id,

    }
    
    socket.emit("addToCart", data)
    


})}

