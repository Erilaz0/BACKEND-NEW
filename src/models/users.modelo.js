const mongoose = require("mongoose")


const usersCollection = "users"
const usersEsquema = new mongoose.Schema({

nombre : { type : String , required : true },
email : { type : String , required : true , unique : true },
password : { type : String , required : true },
rol: { type : String , default:"user" }


})

const usersModelo = mongoose.model(usersCollection,usersEsquema)

module.exports = usersModelo