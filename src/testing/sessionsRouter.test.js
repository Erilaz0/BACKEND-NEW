const { it , describe } = require("mocha")
const chai = require("chai")
const expect = chai.expect
const supertest = require("supertest")
const mongoose = require("mongoose")
const usersService = require("../services/users.service")
const bcrypt = require("bcrypt")
const config = require("../config/config")

let DB = process.env.MONGO_URL || config.MONGO_URL





const requester = supertest("https://backend-new-production.up.railway.app")


const testingLoginData = {

    email : "test@gmail.com" , 
    password : "test"
      
      }



mongoose.connect(DB)


describe(" SESSIONS ENDOPINTS TEST " , async function(){


    this.timeout(10000)

    before(async function(){

        await mongoose.connection.collection("users").deleteMany({ email : testingLoginData.email})
    
      })

    describe( "Starting test..." , async function(){


       it("POST Register Endpoint", async function(){
        const password = await bcrypt.hash( "test" , 10 )
        const testingUser = {

            nombre : "test user",
            apellido : "test Last name",
            edad : 21 ,
            email : "test@gmail.com",
            password: password
            
            
            }



        const body = await requester.post("/api/sessions/register")
                                    .send(testingUser)

       
        expect(body).to.have.property("text").and.is.equal('Found. Redirecting to /api/sessions/login')
        
        
        
        const email = body.header
        await mongoose.connection.collection("users").deleteMany({ email : testingUser.email})



       })


       it("POST Login Endpoint" , async function(){
          const password = await bcrypt.hash( "test" , 10 )
          const testingUser = {

              nombre : "test user",
              apellido : "test Last name",
              edad : 21 ,
              email : "test@gmail.com",
              password: password
            
            
              }


          

          const user = await usersService.createUser(testingUser)
          const body = await requester.post("/api/sessions/login")
                                      .send(testingLoginData)

         
          expect(body.header).to.have.property("set-cookie").and.is.an.instanceOf(Array)
          expect(body).to.have.property("text").to.be.equal('Found. Redirecting to /api/products')
          expect(body).to.have.property("status").to.be.equal(302)
  
          

          await mongoose.connection.collection("users").deleteMany({ email : testingUser.email })

          
          




       })
    
    
    
    
    
    
    
    })



})