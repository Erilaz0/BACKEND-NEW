const mongoose = require("mongoose")


const usersCollection = "users"
const usersEsquema = new mongoose.Schema({

nombre : { type : String , required : true },
email : { type : String , required : true , unique : true },
password : { type : String},
rol: { type : String , default:"user" },
github:{}


})

const usersModelo = mongoose.model(usersCollection,usersEsquema)

module.exports = usersModelo