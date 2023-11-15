const socket = io()

const sendTicket = document.querySelector(".sendTicket")
const id = document.querySelector(".sendTicket").id

sendTicket.addEventListener("click", ()=>{

socket.emit( "sendTicket" , id )

})






