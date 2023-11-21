const  { faker } = require("@faker-js/faker")

async function mockingController( req , res ){


const fakeProducts = []
for(let i = 0 ; i < 100 ; i++){

const newProduct = { 
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
        
      
                  };
   
fakeProducts.push(newProduct)

   }
   res.status(200).render("mocking",{

     fakeProducts : fakeProducts

   })
       

}

module.exports = mockingController