// Importamos las funciones que queremos probar
const {
  validarEdad,
  validarTelefono,
  validarCorreo,
  validarCedula,
} = require('./script');

// Pruebas para la función validarEdad
test('Validar edad: Edad válida (entre 0 y 99)', () => {
  expect(validarEdad('25')).toBe(true);
});

test('Validar edad: Edad no válida (número negativo)', () => {
  expect(validarEdad('-10')).toBe(false);
});

test('Validar edad: Edad no válida (no es un número)', () => {
  expect(validarEdad('abc')).toBe(false);
});

test('Validar edad: Edad no válida (mayor a 99)', () => {
  expect(validarEdad('150')).toBe(false);
});

// Pruebas para la función validarTelefono
test('Validar teléfono: Teléfono válido (formato correcto)', () => {
  expect(validarTelefono('1234567890')).toBe(true);
});

test('Validar teléfono: Teléfono no válido (más de 10 dígitos)', () => {
  expect(validarTelefono('12345678901')).toBe(false);
});

test('Validar teléfono: Teléfono no válido (menos de 10 dígitos)', () => {
  expect(validarTelefono('123456789')).toBe(false);
});

test('Validar teléfono: Teléfono no válido (contiene letras)', () => {
  expect(validarTelefono('1234567abc')).toBe(false);
});

// Pruebas para la función validarCorreo
test('Validar correo: Correo válido', () => {
  expect(validarCorreo('usuario@example.com')).toBe(true);
});

test('Validar correo: Correo no válido (sin @)', () => {
  expect(validarCorreo('usuarioexample.com')).toBe(false);
});

test('Validar correo: Correo no válido (sin dominio)', () => {
  expect(validarCorreo('usuario@')).toBe(false);
});

test('Validar correo: Correo no válido (dominio inválido)', () => {
  expect(validarCorreo('usuario@example')).toBe(false);
});

// Pruebas para la función validarCedula
test('Validar cédula: Cédula válida (9 dígitos numéricos)', () => {
  expect(validarCedula('123456789')).toBe(true);
});

test('Validar cédula: Cédula no válida (más de 9 dígitos)', () => {
  expect(validarCedula('1234567890')).toBe(false);
});

test('Validar cédula: Cédula no válida (menos de 9 dígitos)', () => {
  expect(validarCedula('12345678')).toBe(false);
});

test('Validar cédula: Cédula no válida (contiene letras)', () => {
  expect(validarCedula('1234567abc')).toBe(false);
});