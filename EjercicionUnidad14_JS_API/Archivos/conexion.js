const mysql = require('mysql');

//objeto con la cadena de conexion a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'unidad14api',
});

// funcion para conectarse a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error conectandose a la base de datos: ' + err.stack);
    return;
  }
  console.log('conexion exitosa a la base de datos ' + db.threadId);
});

module.exports = db;