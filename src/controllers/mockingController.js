const  { faker } = require("@faker-js/faker")

async function mockingController( req , res ){

  const min = 18;
    const max = 80;
  const nombre = faker.internet.displayName();
  const apellido = faker.internet.displayName()
  const edad = Math.floor(Math.random() * (max - min + 1)) + min;
  const email = faker.internet.email();
  const password = faker.internet.password();

  const usuario = {
      nombre: nombre,
      apellido: apellido,
      edad: edad,
      email: email,
      password: password
  };
  console.log(` se genero el usuario ${ JSON.stringify(usuario) } ` )
  res.status(200).json( {usuario} );







  /*

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
       */

}

module.exports = mockingController