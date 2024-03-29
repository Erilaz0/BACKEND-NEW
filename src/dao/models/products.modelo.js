const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")


const productsCollection = "products"
const productsEsquema = new mongoose.Schema({

   title:{
    type : String , require : true

   },
   description:{
    type : String , require : true

   },code:{
    type : Number , require : true

   },price:{
    type : Number , require : true

   },status:{
    type : Boolean , require : true , default : true 

   },stock:{
    type : Number , require : true

   },category:{
    type : String , require : true

   },
   thumbnail:{ type : String },
   
  owner : { type : String , default : "admin"}



})


productsEsquema.plugin(mongoosePaginate)

const productsModel = mongoose.model( productsCollection , productsEsquema )

module.exports = productsModel