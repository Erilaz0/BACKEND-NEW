const mongoose = require("mongoose")

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
    type : Boolean , require : true

   },stock:{
    type : Number , require : true

   },category:{
    type : String , require : true

   }



})




const productsModel = mongoose.model( productsCollection , productsEsquema )

module.exports = productsModel