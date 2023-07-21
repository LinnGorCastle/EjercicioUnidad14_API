const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 3000;

// metodo para interpretar los objetos a tipo JSON
app.use(bodyParser.json());

//rutas de acceso a los metodos de la API
const programaAPI = require('./Archivos/programaAPI');
app.use(programaAPI);

//metodo para disponer la API
app.listen(port, () => {
  console.log(`Servidor corriendo en la ruta http://localhost:${port}`);
});