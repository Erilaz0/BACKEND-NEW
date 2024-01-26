const supertest = require("supertest")
const chai = require("chai")
const { describe , it } = require("mocha")
const { generaJWT } = require("../utils")
const mongoose = require("mongoose")
const productsService = require("../services/products.service")
const { sendError } = require("../mailing/send")


mongoose.connect('mongodb+srv://alonsoalonsl431432:4810FWBGvJc1ajOm@eri.tytp383.mongodb.net/?retryWrites=true&w=majority')



const expect = chai.expect
const requester = supertest("http://localhost:8080")

const product = {
  "title":"test product",
  "description":"test description",
  "code": 0 ,
  "price": 0,
  "status": true,
  "stock": 0,
  "category":"test"
   }







     

describe( "PRODUCTS ROUTER TEST" ,async function (){


  this.timeout(10000)
  





  before( async function(){

    const products = await mongoose.connection.collection("products").findOne(product)
   
   if(products){
   let id = products._id
    await mongoose.connection.collection("products").deleteOne( { _id : id } )

   }else{}

  })




  after( async function(){

    const findProduct = await mongoose.connection.collection("products").findOne({ description : product.description})
   
    if(findProduct){
    let id = findProduct._id
    try{
  
      await mongoose.connection.collection("products").deleteMany( { description : product.description } )
      
    }catch(error){

     sendError(error)
        .then((sended) =>{ let i = sended })
        .catch((error) =>{ let i = error })
    }
    
   
 
    }else{}
 

   


  })





  
  describe( "testing products router" ,async function(){
   
   
   
    let tokenInfo = { email : "tester@gmail.com"}
    const token = generaJWT(tokenInfo)

    it( "testing POST products endpoint" , async function(){

      
      const  body  = await requester.post("/api/products/")
                                    .set( "cookie" , `token=${token}`)
                                    .send(product)
      
      expect(body.status).is.eq(201)
      expect(body._body).to.have.property("newProduct")
      
          
                                        })




    it("testing get products by id" , async function(){
     
     
     const productsCreate = await productsService.createProduct(product)
     const body = await requester.get(`/api/products/${productsCreate._id}`)
                                 .set("cookie", `token=${token}`)
     
     
     expect(body.status).is.eq(200)
     expect(body._body).to.have.property("_id")
     expect(body._body).to.have.property("owner")
     expect(body._body).to.have.property("title").and.is.equal("test product")
     expect(body._body).to.have.property("description").and.is.equal("test description")
      await mongoose.connection.collection("products").deleteOne( { _id : productsCreate._id } )
                                 




    })




    it("testing PUT endpoint - modificando un producto" , async function(){
     
      const bodyRequest = { "title" : "test" }
  
      const productsCreate = await productsService.createProduct(product)
      const body = await requester.put(`/api/products/${productsCreate._id}`)
                            .set("cookie", `token=${token}`)
                            .send(bodyRequest)
      
      expect(body).to.have.property("statusCode").to.be.equal(200)
      expect(body).to.have.property("text").to.be.equal('product updated properly')
      expect(body).to.have.property("ok").to.be.equal(true)

     })


    

    it("testing DELETE products router" , async function(){

     const productsCreate = await productsService.createProduct(product)
     
     const body = await requester.delete(`/api/products/${productsCreate._id}`)
                           .set( "cookie" , `token=${token}` )

     
     
     expect(body).to.have.property("statusCode").to.be.equal(200)
     expect(body).to.have.property("ok").to.be.equal(true)
    
    


    })



  it("testing GET products router" , async function(){

   const body = await requester.get("/api/products")
                               .set( "cookie" , `token=${token}` )

  
   expect(body.status).to.be.equal(200)
   expect(body).to.have.property("ok").to.be.equal(true)
   



  })


    })

})