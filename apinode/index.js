'use estrict'

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

console.log('config.db', config.db);
mongoose.connect(config.db, (error, resp) => {
  if(error){
    return console.log(`Error al conectar con base de datos: ${error}`)
  }else {
      app.listen(config.port, () => {
        console.log(`API REST Corriendo en http://localhost:${config.port}`);
      });
  }
});
