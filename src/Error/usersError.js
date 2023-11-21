const validaUsers = ( user )=>{
let { email , ...otros } = user
   return ` Error al obtener usuario,el ${email} ya esta en uso.`

 
}