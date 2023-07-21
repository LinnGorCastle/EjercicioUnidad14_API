// Variables de parametrización del sistema
var doctores = [];
var pacientes = [];
var citasMedicas = [];
const apiUrl = 'http://localhost:3000';

// Función para validar los campos del formulario de doctores
function validarFormularioDoctores(formulario) {
  var nombre = formulario.querySelector('#nombre').value;
  var apellido = formulario.querySelector('#apellido').value;
  var cedula = formulario.querySelector('#cedula').value;
  var especialidad = formulario.querySelector('#especialidad').value;
  var consultorio = formulario.querySelector('#consultorio').value;
  var correo = formulario.querySelector('#correo').value;

  var mensaje = '';
  var validador = true;

  // Expresión regular para validar la cédula (formato numerico y que tenga entre 5 y 10 caracteres)
  var cedulaRegex = /^[1-9]\d{4,9}$/;

  // Expresión regular para validar el correo electrónico (string, caracter @, string, caracter ., string)
  var correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nombre || !apellido || !cedula || !especialidad || !consultorio || !correo) {
    mensaje += '- Por favor, complete todos los campos';
    validador = false;
  }

  if (!cedulaRegex.test(cedula)) {
    mensaje += '- La cédula debe ser numérica y debe tener entre 5 y 10 dígitos.';
    validador = false;
  }

  if (!correoRegex.test(correo)) {
    mensaje += '- Ingrese un correo electrónico válido.';
    validador = false;
  }

  if (!especialidad) {
    mensaje += '- Seleccione cual es la especialidad.';
    validador = false;
  }

  if (validador === false) {
    mensaje = 'Se han presentado errores para almacenar la informacion: ' + mensaje + ''
    alert(mensaje);
  }

  return validador;
}

// Función para validar los campos del formulario de doctores
function validarFormularioPacientes(formulario) {
  var nombre = formulario.querySelector('#nombrePaciente').value;
  var apellido = formulario.querySelector('#apellidoPaciente').value;
  var cedula = formulario.querySelector('#cedulaPaciente').value;
  var edad = formulario.querySelector('#edad').value;
  var telefono = formulario.querySelector('#telefono').value;
  var especialidad = formulario.querySelector('#especialidadPaciente').value;

  var mensaje = '';
  var validador = true;

  // Expresión regular para validar la cédula (formato numerico y que tenga entre 5 y 10 caracteres)
  var cedulaRegex = /^[1-9]\d{4,9}$/;

  // Expresión regular para validar la edad (maximo 3 caracteres)
  var edadRegex = /^\d{1,3}$/;

  // Expresión regular para validar el numero de teléfono (formato numerico con maximo 10 caracteres)
  var telefonoRegex = /^\d{10}$/;

  if (!nombre || !apellido || !cedula || !especialidad || !consultorio || !correo) {
    mensaje += '- Por favor, complete todos los campos';
    validador = false;
  }

  if (!cedulaRegex.test(cedula)) {
    mensaje += '- La cédula debe ser numérica y debe tener entre 5 y 10 dígitos.';
    validador = false;
  }

  if (!edadRegex.test(edad)) {
    mensaje += '- La edad registrada debe ser numerica y de maximo tres digitos.';
    validador = false;
  }

  if (!telefonoRegex.test(telefono)) {
    mensaje += '- El telefono registrado debe ser numerico y debe tener 10 digitos.';
    validador = false;
  }

  if (!especialidad) {
    mensaje += '- Seleccione cual es la especialidad.';
    validador = false;
  }

  if (validador === false) {
    mensaje = 'Se han presentado errores para almacenar la informacion: ' + mensaje + ''
    alert(mensaje);
  }

  return validador;
}

// Función para agregar un doctor
function agregarDoctor(event) {
  event.preventDefault();
  var formulario = document.getElementById('doctorForm');

  if (validarFormularioDoctores(formulario)) {
    var nombre = formulario.querySelector('#nombre').value;
    var apellido = formulario.querySelector('#apellido').value;
    var especialidad = formulario.querySelector('#especialidad').value;
    var consultorio = formulario.querySelector('#consultorio').value;
    var correo = formulario.querySelector('#correo').value;

    // Si pasa todas las validaciones, enviar el doctor a la API
    const doctor = {
      nombre: nombre,
      apellido: apellido,
      especialidad: especialidad,
      consultorio: consultorio,
      correo: correo
    };
    enviarDoctor(doctor);

    // Restaurar el formulario y evitar que se recargue la página
    doctorForm.reset();
  }
}

// Función para agregar un paciente
function agregarPaciente(event) {
  event.preventDefault();
  var formulario = document.getElementById('pacienteForm');

  if (validarFormularioPacientes(formulario)) {
    var nombre = formulario.querySelector('#nombrePaciente').value;
    var apellido = formulario.querySelector('#apellidoPaciente').value;
    var cedula = formulario.querySelector('#cedulaPaciente').value;
    var edad = formulario.querySelector('#edad').value;
    var telefono = formulario.querySelector('#telefono').value;

    const paciente = {
      nombre: nombre,
      apellido: apellido,
      cedula: cedula,
      edad: parseInt(edad),
      telefono: telefono,
      especialidad: especialidad
    };

    enviarPaciente(paciente);

    // Restaurar el formulario y evitar que se recargue la página
    pacienteForm.reset();
  }
}

// Función para enviar datos de pacientes al servidor mediante POST
async function enviarPaciente(paciente) {
  try {
    const response = await fetch(`${apiUrl}/pacientes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paciente)
    });

    if (!response.ok) {
      throw new Error('Error al enviar los datos del paciente.');
    }

    alert('Datos del paciente enviados exitosamente.');
    mostrarPacientes()
  } catch (error) {
    console.error(error);
    alert('Hubo un error al enviar los datos del paciente.');
  }
}

// Función para enviar datos de doctores al servidor mediante POST
async function enviarDoctor(doctor) {
  try {
    const response = await fetch(`${apiUrl}/doctores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(doctor)
    });

    if (!response.ok) {
      throw new Error('Error al enviar los datos del doctor.');
    }

    alert('Datos del doctor enviados exitosamente.');
    // Puedes realizar otras acciones luego de enviar los datos
  } catch (error) {
    console.error(error);
    alert('Hubo un error al enviar los datos del doctor.');
  }
}

// Funcion para consultar los pacientes y cargarlos a la lista desplegable del formulario
async function cargarPacientes() {
  try {

    const options = {
      method: "GET"
    };
    const urlAPI= apiUrl+"/ConPacientes";

    const response = await fetch(urlAPI, options);
    if (!response.ok) {
      throw new Error('Error al obtener los datos de pacientes desde el servidor.');
    }

    const pacientes = await response.json();
    const pacienteSelect = document.getElementById('listaPacientes');

    // Limpiamos las opciones anteriores
    pacienteSelect.innerHTML = '';

    // Agregamos las opciones de pacientes al select
    pacientes.forEach((paciente) => {
      const option = document.createElement('option');
      option.value = paciente.codigo_paciente;
      option.textContent = `${paciente.nombre} ${paciente.apellido}`;
      pacienteSelect.appendChild(option);
    });
  } catch (error) {
    console.error(error);
    alert('Hubo un error al cargar los pacientes desde el servidor.');
  }
}

//funcion para buscar doctores segun la especialidad seleccionada
async function cargarDoctoresPorEspecialidad() {
  const especialidadSelect = document.getElementById('listaEspecialidades');
  const especialidadSeleccionada = especialidadSelect.value;

  if (especialidadSeleccionada) {
    try {
      const response = await fetch(`${apiUrl}/ConDoctores`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos de doctores desde el servidor.');
      }

      const doctores = await response.json();
      const doctorSelect = document.getElementById('listaDoctores');

      // Limpiamos las opciones anteriores
      doctorSelect.innerHTML = '';

      // Filtramos los doctores por la especialidad seleccionada
      const doctoresFiltrados = doctores.filter((doctor) => doctor.especialidad === especialidadSeleccionada);

      // Agregamos la opción inicial al select
      const optionInicial = document.createElement('option');
      optionInicial.value = '';
      optionInicial.textContent = 'Selecciona un doctor';
      doctorSelect.appendChild(optionInicial);

      // Agregamos las opciones de doctores al select
      doctoresFiltrados.forEach((doctor) => {
        const option = document.createElement('option');
        option.value = doctor.codigo_doctor;
        option.textContent = `${doctor.nombre} ${doctor.apellido} (${doctor.especialidad})`;
        doctorSelect.appendChild(option);
      });
    } catch (error) {
      console.error(error);
      alert('Hubo un error al cargar los doctores desde el servidor.');
    }
  } else {
    const doctorSelect = document.getElementById('doctor');
    doctorSelect.innerHTML = '';
  }
}

// Función para validar el formulario de citas médicas
function validarFormularioCitaMedica() {
  const pacienteSelect = document.getElementById('listaPacientes');
  const especialidadSelect = document.getElementById('listaEspecialidades');
  const doctorSelect = document.getElementById('listaDoctores');

  const codigoPaciente = pacienteSelect.value;
  const especialidad = especialidadSelect.value;
  const codigoDoctor = doctorSelect.value;

  if (!codigoPaciente || !especialidad || !codigoDoctor) {
    alert('Por favor, complete todos los campos del formulario de citas médicas.');
    return false;
  }

  // Si pasa todas las validaciones, enviar la cita médica a la API
  const citaMedica = {
    codigo_paciente: codigoPaciente,
    especialidad: especialidad,
    codigo_doctor: codigoDoctor
  };

  crearCitaMedica(citaMedica);

  // Restaurar el formulario y evitar que se recargue la página
  const citaMedicaForm = document.getElementById('citaMedicaForm');
  citaMedicaForm.reset();
  return false;
}

/// Función para enviar datos de citas médicas al servidor mediante POST
async function crearCitaMedica(citaMedica) {
  try {
    const response = await fetch(`${apiUrl}/ConCitasmedicas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(citaMedica)
    });

    if (!response.ok) {
      throw new Error('Error al crear la cita médica.');
    }

    alert('Cita médica creada exitosamente.');
    // Puedes realizar otras acciones luego de crear la cita médica
  } catch (error) {
    console.error(error);
    alert('Hubo un error al crear la cita médica.');
  }

  mostrarCitasMedicas();
}

// Función para mostrar la lista de doctores
async function mostrarDoctores() {
  try {
    
    const options = {
      method: "GET"
    };
    var urlAPI= apiUrl+"/ConDoctores";

    const response = await fetch(urlAPI, options);
    if (!response.ok) {
      throw new Error('Error al obtener los datos de doctores desde el servidor.');
    }

    doctores = await response.json();
    
    var listaDoctores = document.getElementById('listaDoctores');
    listaDoctores.innerHTML = '';
    if (doctores.length > 0) {
      // Crear tabla
      var tabla = document.createElement('table');
      tabla.className = 'table';
  
      // Crear encabezado de tabla
      var encabezado = tabla.createTHead();
      var encabezadoFila = encabezado.insertRow();
  
      var encabezadoNombre = document.createElement('th');
      encabezadoNombre.textContent = 'Nombre';
      encabezadoFila.appendChild(encabezadoNombre);
  
      var encabezadoApellido = document.createElement('th');
      encabezadoApellido.textContent = 'Apellido';
      encabezadoFila.appendChild(encabezadoApellido);
  
      var encabezadoDocumento = document.createElement('th');
      encabezadoDocumento.textContent = 'Num. Documento';
      encabezadoFila.appendChild(encabezadoDocumento);
  
      var encabezadoCorreo = document.createElement('th');
      encabezadoCorreo.textContent = 'Email';
      encabezadoFila.appendChild(encabezadoCorreo);
  
      var encabezadoEspecialidad = document.createElement('th');
      encabezadoEspecialidad.textContent = 'Especialidad';
      encabezadoFila.appendChild(encabezadoEspecialidad);
  
      var encabezadoConsultorio = document.createElement('th');
      encabezadoConsultorio.textContent = 'Cod. Consultorio';
      encabezadoFila.appendChild(encabezadoConsultorio);
  
      // Crear cuerpo de tabla
      var cuerpo = tabla.createTBody();
  
      // Insertar filas con datos de los doctores
      for (var i = 0; i < doctores.length; i++) {
        var doctor = doctores[i];
  
        var fila = cuerpo.insertRow();
  
        var celdaNombre = fila.insertCell();
        celdaNombre.textContent = doctor.nombre;
  
        var celdaApellido = fila.insertCell();
        celdaApellido.textContent = doctor.apellido;
  
        var celdaDocumento = fila.insertCell();
        celdaDocumento.textContent = doctor.cedula;
  
        var celdaCorreo = fila.insertCell();
        celdaCorreo.textContent = doctor.correo;
  
        var celdaEspecialidad = fila.insertCell();
        celdaEspecialidad.textContent = doctor.especialidad;
  
        var celdaConsultorio = fila.insertCell();
        celdaConsultorio.textContent = doctor.consultorio;
      }
  
      // Agregar tabla al contenedor
      listaDoctores.appendChild(tabla);
    } else {
      // Mostrar mensaje si no hay doctores
      listaDoctores.textContent = 'No hay doctores registrados.';
    }
    console.log(doctores);
  } catch (error) {
    console.error(error);
    alert('Hubo un error al obtener los datos de doctores desde el servidor.');
  }
}

// Función para mostrar la lista de pacientes
async function mostrarPacientes() {
  try {
    const options = {
      method: "GET"
    };

    const urlAPI= apiUrl+"/ConPacientes";

    const response = await fetch(urlAPI, options);
    if (!response.ok) {
      throw new Error('Error al obtener los datos de pacientes desde el servidor.');
    }

    pacientes = await response.json();

    var listaPacientes = document.getElementById('listaPacientes');
    listaPacientes.innerHTML = '';
    if (pacientes.length > 0) {
      // Crear tabla
      var tabla = document.createElement('table');
      tabla.className = 'table';
  
      // Crear encabezado de tabla
      var encabezado = tabla.createTHead();
      var encabezadoFila = encabezado.insertRow();
  
      var encabezadoNombre = document.createElement('th');
      encabezadoNombre.textContent = 'Nombre';
      encabezadoFila.appendChild(encabezadoNombre);
  
      var encabezadoApellido = document.createElement('th');
      encabezadoApellido.textContent = 'Apellido';
      encabezadoFila.appendChild(encabezadoApellido);
  
      var encabezadoDocumento = document.createElement('th');
      encabezadoDocumento.textContent = 'Num. Documento';
      encabezadoFila.appendChild(encabezadoDocumento);
  
      var encabezadoCorreo = document.createElement('th');
      encabezadoCorreo.textContent = 'Edad';
      encabezadoFila.appendChild(encabezadoCorreo);
  
      var encabezadoEspecialidad = document.createElement('th');
      encabezadoEspecialidad.textContent = 'Teléfono';
      encabezadoFila.appendChild(encabezadoEspecialidad);
  
      var encabezadoConsultorio = document.createElement('th');
      encabezadoConsultorio.textContent = 'Especialidad';
      encabezadoFila.appendChild(encabezadoConsultorio);
  
      // Crear cuerpo de tabla
      var cuerpo = tabla.createTBody();
  
      // Insertar filas con datos de los doctores
      for (var i = 0; i < pacientes.length; i++) {
        var paciente = pacientes[i];
  
        var fila = cuerpo.insertRow();
  
        var celdaNombre = fila.insertCell();
        celdaNombre.textContent = paciente.nombre;
  
        var celdaApellido = fila.insertCell();
        celdaApellido.textContent = paciente.apellido;
  
        var celdaDocumento = fila.insertCell();
        celdaDocumento.textContent = paciente.cedula;
  
        var celdaEdad = fila.insertCell();
        celdaEdad.textContent = paciente.edad;
  
        var celdaTelefono = fila.insertCell();
        celdaTelefono.textContent = paciente.telefono;
  
        var celdaEspecialidad = fila.insertCell();
        celdaEspecialidad.textContent = paciente.especialidad;
      }
  
      // Agregar tabla al contenedor
      listaPacientes.appendChild(tabla);
    } else {
      // Mostrar mensaje si no hay doctores
      listaPacientes.textContent = 'No hay pacientes registrados registrados.';
    }

  } catch (error) {
    console.error(error);
    alert('Hubo un error al obtener los datos de pacientes desde el servidor.');
  }
}

// Función para mostrar la lista de pacientes
async function mostrarCitasMedicas() {
  try {
    const options = {
      method: "GET"
    };

    const urlAPI= apiUrl+"/ConCitasmedicas";

    const response = await fetch(urlAPI, options);
    if (!response.ok) {
      throw new Error('Error al obtener los datos de pacientes desde el servidor.');
    }

    citasMedicas = await response.json();

    var listaPacientes = document.getElementById('listaCitasMedicas');
    listaPacientes.innerHTML = '';
    if (pacientes.length > 0) {
      // Crear tabla
      var tabla = document.createElement('table');
      tabla.className = 'table';
  
      // Crear encabezado de tabla
      var encabezado = tabla.createTHead();
      var encabezadoFila = encabezado.insertRow();
  
      var encabezadoIdCita = document.createElement('th');
      encabezadoIdCita.textContent = 'id cita';
      encabezadoFila.appendChild(encabezadoIdCita);
  
      var encabezadoNomDoctor = document.createElement('th');
      encabezadoNomDoctor.textContent = 'Nombre Doctor';
      encabezadoFila.appendChild(encabezadoNomDoctor);
  
      var encabezadoApeDoctor = document.createElement('th');
      encabezadoApeDoctor.textContent = 'Apellido Doctor';
      encabezadoFila.appendChild(encabezadoApeDoctor);
  
      var encabezadoNomPaciente = document.createElement('th');
      encabezadoNomPaciente.textContent = 'Nombre Paciente';
      encabezadoFila.appendChild(encabezadoNomPaciente);
  
      var encabezadoApePaciente = document.createElement('th');
      encabezadoApePaciente.textContent = 'Apellido Paciente';
      encabezadoFila.appendChild(encabezadoApePaciente);

      var encabezadoConsultorio = document.createElement('th');
      encabezadoConsultorio.textContent = 'Consultorio';
      encabezadoFila.appendChild(encabezadoConsultorio);
  
      // Crear cuerpo de tabla
      var cuerpo = tabla.createTBody();
  
      // Insertar filas con datos de los doctores
      for (var i = 0; i < citasMedicas.length; i++) {
        var paciente = citasMedicas[i];
  
        var fila = cuerpo.insertRow();
  
        var celdaidCita = fila.insertCell();
        celdaidCita.textContent = citasMedicas.id_cita;
  
        var celdaNomDoctor = fila.insertCell();
        celdaNomDoctor.textContent = citasMedicas.nombre_doctor;
  
        var celdaApeDoctor = fila.insertCell();
        celdaApeDoctor.textContent = citasMedicas.doctor_apellido;
  
        var celdaNomPaciente = fila.insertCell();
        celdaNomPaciente.textContent = citasMedicas.nombre_paciente;
  
        var celdaApePaciente = fila.insertCell();
        celdaApePaciente.textContent = citasMedicas.paciente_apellido;
  
        var celdaConsultorio = fila.insertCell();
        celdaConsultorio.textContent = citasMedicas.consultorio;
      }
  
      // Agregar tabla al contenedor
      listaPacientes.appendChild(tabla);
    } else {
      // Mostrar mensaje si no hay doctores
      listaPacientes.textContent = 'No hay citas médicas registradas.';
    }

  } catch (error) {
    console.error(error);
    alert('Hubo un error al obtener los datos de las citas médicas desde el servidor.');
  }
}

// Función para guardar los datos en un archivo JSON
function guardarDatosEnJSON(nombreArchivo, datos) {
  var datosJSON = JSON.stringify(datos);
  var enlaceDescarga = document.createElement('a');
  enlaceDescarga.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(datosJSON));
  enlaceDescarga.setAttribute('download', nombreArchivo);
  enlaceDescarga.style.display = 'none';
  document.body.appendChild(enlaceDescarga);
  enlaceDescarga.click();
  document.body.removeChild(enlaceDescarga);
}

// Función para descargar el listado de doctores en formato JSON
function descargarDoctores() {
  guardarDatosEnJSON('doctores.json', doctores);
}

// Función para descargar el listado de pacientes en formato JSON
function descargarPacientes() {
  guardarDatosEnJSON('pacientes.json', pacientes);
}

// Función para descargar el listado de citas médicas en formato JSON
function descargarCitasMedicas() {
  guardarDatosEnJSON('citasMedicas.json', citasMedicas);
}

// Eventos
document.getElementById('doctorForm').addEventListener('submit', function (event) {
  event.preventDefault();
  validarFormularioDoctor();
});
document.getElementById('pacienteForm').addEventListener('submit', function (event) {
  event.preventDefault();
  validarFormularioPaciente();
});

// Evento para cargar pacientes cuando se muestra la pestaña de citas médicas
document.getElementById('citasMedicasTab').addEventListener('click', cargarPacientes);

document.getElementById('descargarDoctores').addEventListener('click', descargarDoctores);
document.getElementById('descargarPacientes').addEventListener('click', descargarPacientes);
document.getElementById('descargarCitasMedicas').addEventListener('click', descargarCitasMedicas);
window.addEventListener('DOMContentLoaded', mostrarDoctores);
window.addEventListener('DOMContentLoaded', mostrarPacientes);
window.addEventListener('DOMContentLoaded', mostrarCitasMedicas);

