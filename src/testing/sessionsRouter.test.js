const { it , describe } = require("mocha")
const chai = require("chai")
const expect = chai.expect
const supertest = require("supertest")
const mongoose = require("mongoose")
const usersService = require("../services/users.service")
const bcrypt = require("bcrypt")






const requester = supertest("http://localhost:8080")


const testingLoginData = {

    email : "test@gmail.com" , 
    password : "test"
      
      }



mongoose.connect('mongodb+srv://alonsoalonsl431432:4810FWBGvJc1ajOm@eri.tytp383.mongodb.net/?retryWrites=true&w=majority')


describe(" SESSIONS ENDOPINTS TEST " , async function(){


    this.timeout(10000)


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
        expect(body).to.have.property("status").and.is.equal(302)
        expect(body.header).to.have.property("nombre").and.is.equal('test user')
        expect(body.header).to.have.property("apellido").and.is.equal('test Last name')
        expect(body.header).to.have.property("edad").and.is.equal('21')
        expect(body.header).to.have.property("email").and.is.equal('test@gmail.com')
        expect(body.header).to.have.property("password").and.is.equal(password)
        
        
        const email = body.header
        await mongoose.connection.collection("users").deleteMany({ email : email.email})



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

          expect(body.header).to.have.property("nombre").to.be.equal("test user")
          expect(body.header).to.have.property("email").to.be.equal("test@gmail.com")
          expect(body.header).to.have.property("set-cookie").and.is.an.instanceOf(Array)
          expect(body).to.have.property("text").to.be.equal('OK. Redirecting to /api/products')
          expect(body).to.have.property("ok").to.be.equal(true)
          expect(body).to.have.property("status").to.be.equal(200)
  
          const headerData = body.header
          const email = headerData.email

          await mongoose.connection.collection("users").deleteMany({ email : email })

          
          




       })
    
    
    
    
    
    
    
    })



})