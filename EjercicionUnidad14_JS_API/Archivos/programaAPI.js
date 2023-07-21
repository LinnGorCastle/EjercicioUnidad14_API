const express = require('express');
const db = require('./conexion');

const router = express.Router();

///Metodos POST para el registro de Doctores, Pacientes y Citas médicas
// Crear un nuevo doctor
router.post('/doctores', (req, res) => {
  const { nombre, apellido, especialidad, consultorio, email } = req.body;

  const insertQuery = `INSERT INTO doctor (nombre, apellido, especialidad, consultorio, email) VALUES (?, ?, ?, ?, ?)`;
  db.query(insertQuery, [nombre, apellido, especialidad, consultorio, email], (err, result) => {
    if (err) {
      console.error('Error creando el doctor: ' + err);
      res.status(500).json({ error: 'Error creando el doctor' });
    } else {
      res.status(201).json({ message: 'Doctor creado exitosamente' });
    }
  });
});

// Crear un nuevo paciente
router.post('/pacientes', (req, res) => {
  const { nombre, apellido, edad, documento, telefono } = req.body;

  const insertQuery = `INSERT INTO paciente (nombre, apellido, edad, documento, telefono) VALUES (?, ?, ?, ?, ?)`;
  db.query(insertQuery, [nombre, apellido, edad, documento, telefono], (err, result) => {
    if (err) {
      console.error('Error creando el paciente: ' + err);
      res.status(500).json({ error: 'Error creando el paciente' });
    } else {
      res.status(201).json({ message: 'paciente creado exitosamente' });
    }
  });
});

// Crear una nueva cita médica
router.post('/citamedica', (req, res) => {
  const { paciente_id, especialidad, doctor_id } = req.body;

  const insertQuery = `INSERT INTO citamedica (paciente_id, especialidad, doctor_id) VALUES (?, ?, ?)`;
  db.query(insertQuery, [paciente_id, especialidad, doctor_id], (err, result) => {
    if (err) {
      console.error('Error creando la cita medica: ' + err);
      res.status(500).json({ error: 'Error creando la cita medica' });
    } else {
      res.status(201).json({ message: 'cita medica creada exitosamente' });
    }
  });
});

///Metodos GET para la consulta de los datos registrados para doctores, pacientes y citas médicas
// consultar listado de doctores
router.get('/ConDoctores', (req, res) => {
  const selectQuery = 'SELECT * FROM doctor';
  db.query(selectQuery, (err, result) => {
    if (err) {
      console.error('Error consultando los doctores: ' + err);
      res.status(500).json({ error: 'Error consultando los doctores' });
    } else {
      res.status(200).json(result);
    }
  });
});

// Consultar listado de pacientes
router.get('/ConPacientes', (req, res) => {
  const selectQuery = 'SELECT * FROM paciente';
  db.query(selectQuery, (err, result) => {
    if (err) {
      console.error('Error consultando los pacientes: ' + err);
      res.status(500).json({ error: 'Error consultando los pacientes' });
    } else {
      res.status(200).json(result);
    }
  });
});

// Consultar listado de citas médicas
router.get('/ConCitasmedicas', (req, res) => {
  const selectQuery = 'SELECT citamedica.id id_cita, doctor.id as id_doctor, doctor.nombre as nombre_doctor, doctor.apellido as doctor_apellido, paciente.id id_paciente, paciente.nombre as nombre_paciente, paciente.apellido as paciente_apellido, doctor.consultorio  FROM citamedica inner join paciente on paciente.id = citamedica.paciente_id inner join doctor on doctor.id = citamedica.doctor_id';
  db.query(selectQuery, (err, result) => {
    if (err) {
      console.error('Error consultando las citas medicas: ' + err);
      res.status(500).json({ error: 'Error consultando las citas medicas' });
    } else {
      res.status(200).json(result);
    }
  });
});

module.exports = router;