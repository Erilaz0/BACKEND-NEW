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
  req.logger.info(` se genero el usuario ${ JSON.stringify(usuario) } ` )
  
  res.setHeader("Content-Type","application/json")
  res.status(200).json( {usuario} );



}

module.exports = mockingController