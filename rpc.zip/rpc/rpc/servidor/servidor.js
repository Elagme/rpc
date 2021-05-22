var rpc = require("./rpc.js");

// Listado de pacientes
var pacientes = [
    { id: 1, nombre: "Diego", apellidos: "Marcos", edad: 30 }
];
var siguienteId = 2;

// Obtener el listado de pacientes
function obtenerPacientes() {
    return pacientes;
}

// Crear un nuevo paciente y retorna su id o 0 si ha fallado
function anyadirPaciente(nom, ape, ed) {
    if (!nom || !ape || !ed) return 0;

    var id = siguienteId;
    siguienteId++;
    console.log("Añadir paciente", nom, ape, ed);
    pacientes.push({ id: id, nombre: nom, apellidos: ape, edad: ed });
    return id;
}

// eliminar paciente y retorna si ha sido borrado o no
function eliminarPaciente(id) {
    for (var i = 0; i<pacientes.length ; i ++) {
        if (pacientes[i].id == id) {
            pacientes.splice(i, 1);
            return true; // paciente borrado
        }
    }
    return false; // paciente no borrado (no encontrado)
}

//rpc.delay = 5000; // retrasar todas las operaciones 5 segundos
var servidor = rpc.server(); // crear el servidor RPC
var app = servidor.createApp("gestion_pacientes"); // creamos la aplicación RPC

// Registrar los procedimientos
app.register(obtenerPacientes);
app.register(anyadirPaciente);
app.register(eliminarPaciente);