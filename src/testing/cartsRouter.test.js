const { describe , it } = require("mocha")
const supertest = require("supertest")
const chai = require("chai")
const mongoose = require("mongoose")
const { generaJWT } = require("../utils")
const usersService = require("../services/users.service")
const cartsService = require("../services/carts.service")
const cartsModel = require("../dao/models/carts.modelo")

mongoose.connect('mongodb+srv://alonsoalonsl431432:4810FWBGvJc1ajOm@eri.tytp383.mongodb.net/?retryWrites=true&w=majority')
const requester = supertest("https://backend-new-production.up.railway.app")
const expect = chai.expect

const testingUser = {

nombre : "test",
apellido : "tester",
edad : 0 , 
email : "tester@gmail.com" ,
password : "testingpassword" , 

}



describe("inicialazing carts router" , async function(){

 
    this.timeout(15000)



 





    describe("testing carts router" , async function(){
    let tokenInfo = { email : "tester@gmail.com"}
    const token = generaJWT(tokenInfo)
    
    
    it("testing POST cart router" , async function(){
    const user = await usersService.createUser(testingUser)   
    const cart = {"idUser":user._id,"products":[{"product":2,"quantity":5},{"product":1,"quantity":4}]}
    const body = await requester.post("/api/carts")
                                .set("cookie" , `token=${token}`)
                                .send(cart)
    
    
    const bodyJson = JSON.parse(body.text)
    
    expect(bodyJson).to.have.property("idUser").that.exist
    
    await mongoose.connection.collection("users").deleteMany({ nombre : "test"})
    await mongoose.connection.collection("carts").deleteMany({ idUser : user._id})


    })

    it("testing GET all products" , async function(){

    const body = await requester.get("/api/carts")
                                .set("cookie" , `token=${token}`)
     
        
    const carts = JSON.parse(body.text)
    const allCarts = carts.carts
    
    allCarts.forEach(element => {
        expect(element).to.has.property("_id")  
        expect(element).to.has.property("idUser")
        expect(element).to.has.property("products").and.is.instanceOf(Array)  
    });
    



    })
  
    it("testing GET product by ID" , async function(){
    const user = await usersService.createUser(testingUser)   
    const cart = {"idUser":user._id,"products":[{"product":2,"quantity":5},{"product":1,"quantity":4}]}
    const cartCreate = await cartsService.createCart(cart)

    const body = await requester.get(`/api/carts/${user._id}`)
                                .set("cookie" , `token=${token}`)
    

    expect(body.statusCode).is.equal(200)
    expect(body.ok).is.equal(true)



    await mongoose.connection.collection("users").deleteMany({ nombre : "test"})
    await mongoose.connection.collection("carts").deleteMany({ idUser : user._id})
    })



    it("testing PUT carts endopint" , async function(){

    const user = await usersService.createUser(testingUser)
    const cart = {"idUser":user._id,"products":[{"product":"650ce530bbb8ee4c084a729f","quantity":5},{"product":"650ce530bbb8ee4c084a72a0","quantity":4}]}
    const createCart = await cartsModel.create(cart)
    const body = await requester.put(`/api/carts/${user._id}/products/650ce530bbb8ee4c084a729f`)
                                .set("cookie" , `token=${token}`)
                                .send({ quantity : 1 })
    
    
    const parsedCart = JSON.parse(body.text)
    
    
    
    
    
    await mongoose.connection.collection("users").deleteMany({ nombre : "test"})
    await mongoose.connection.collection("carts").deleteMany({ idUser : user._id})
    
    expect(parsedCart[0]._id).to.exist
    expect(parsedCart[0].idUser).to.exist
    expect(parsedCart[0].products).to.be.an.instanceOf(Array)
    


    })


    it("testing DELETE cart endpoint" , async function(){
     const user = await usersService.createUser(testingUser)
     const cart = {"idUser":user._id,"products":[{"product":"650ce530bbb8ee4c084a729f","quantity":5},{"product":"650ce530bbb8ee4c084a72a0","quantity":4}]}
     const createCart = await cartsModel.create(cart)
     

     const body = await requester.delete(`/api/carts/${createCart._id}`)
                                 .set("cookie" , `token=${token}`)


     
     expect(body.status).to.exist.and.is.equal(200)
     expect(body.text).to.exist.and.is.equal("cart deleted")
     await mongoose.connection.collection("users").deleteMany({ nombre : "test"})
    



    })


    it("testing DELETE product form cart", async function(){
        const user = await usersService.createUser(testingUser)
        const cart = {"idUser":user._id,"products":[{"product":"650ce530bbb8ee4c084a729f","quantity":5},{"product":"650ce530bbb8ee4c084a72a0","quantity":4}]}
        const createCart = await cartsModel.create(cart)


        const body = await requester.delete(`/api/carts/${createCart._id}/products/${"650ce530bbb8ee4c084a729f"}`)
                                    .set("cookie" , `token=${token}`)
       
       
       
        expect(body.text).to.exist.and.is.equal("producto eliminado")
        expect(body.status).to.exist.and.is.equal(200)
        expect(body.ok).to.exist.and.is.equal(true)
 
        await mongoose.connection.collection("users").deleteMany({ nombre : "test"})
        await mongoose.connection.collection("carts").deleteMany({ idUser : user._id})

    })



})})