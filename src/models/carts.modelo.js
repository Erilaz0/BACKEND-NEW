const mongoose = require("mongoose")

const cartCollection = "carts"
const cartEsquema = new mongoose.Schema({


    products:[
        {
            product : { type : Number , required : true},
            
            quantity : { type : Number, required : true }
            
        }
             ]})



const cartsModel = mongoose.model( cartCollection , cartEsquema )

module.exports = cartsModel