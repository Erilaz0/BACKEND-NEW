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
oldpasswords:[ { password : { type : String ,} } ],
premium:{ type : Boolean , default : false}


})

//usersEsquema.set('toObject', { getters: true }); // To ensure the default value is always returned

// Set default value for oldpasswords
//usersEsquema.path('oldpasswords').default([]);


const usersModelo = mongoose.model(usersCollection,usersEsquema)

module.exports = usersModelo