const socket = io()


const send = document.querySelector("#send") 


function sendFunction(e){

e.preventDefault()
const email = document.querySelector("#email").value
console.log(email)

socket.emit("rest",email)
    
}

if(send){
    send.addEventListener("submit",sendFunction)

}

