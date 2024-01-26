const mongoose = require("mongoose")
const { Schema } = mongoose;


const usersCollection = "users"
const usersEsquema = new mongoose.Schema({

nombre : { type : String , required : true },
apellido : { type : String  },
edad : { type : Number },
email : { type : String , required : true , unique : true },
password : { type : String},
rol: { type : String , default:"user" },
cart: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId()  },
github:{},
oldpasswords:[ { password : { type : String } } ],
premium:{ type : Boolean , default : false},
profilephoto : { type : String , default:"none"},
documents : [ { C_I : { type : String } , C_D : { type : String } } ],
last_connection : { type : String }


})




const usersModelo = mongoose.model(usersCollection,usersEsquema)

module.exports = usersModelo