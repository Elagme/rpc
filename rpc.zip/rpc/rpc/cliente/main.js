var app = rpc("localhost", "gestion_pacientes"); // obtener una referencia a la app RPC

// Obtener referencias a los procedimientos remotos registrados por el servidor
var obtenerPacientes = app.procedure("obtenerPacientes");
var anyadirPaciente = app.procedure("anyadirPaciente");
var eliminarPaciente = app.procedure("eliminarPaciente");

// Mustra la lista de pacientes en la web 
function mostrarPacientes(pacientes) {
    var lista = document.getElementById("lista");

    lista.innerHTML = ""; // vaciar lista por si tenía algo antes
    for (var i = 0; i < pacientes.length; i++) { // poner un LI por cada paciente
        lista.innerHTML += "<li>" + pacientes[i].nombre + " " + pacientes[i].apellidos + " (" + pacientes[i].edad + ") <button onclick='eliminar(" + pacientes[i].id + ")'>Eliminar</button></li>";
    }
}

/*
// PROGRAMACIÓN SÍNCRONA
// TODOS LOS PROCEDIMIENTOS SE USAN ASÍ:
// resultado = procedimiento(argumentos)
// EL PROGRAMA SE BLOQUEA EN EL PROCEDIMIENTO HASTA QUE FINALIZA

// cargar la lista de pacientes
function cargar() {
    console.log("Voy a cargar...")
    var pacientes = obtenerPacientes();
    console.log("Voy a mostrar los datos...")
    mostrarPacientes(pacientes);
}

// Añadir un paciente nuevo
function anyadir() {
    var nombre = document.getElementById("nombre").value;
    var apellidos = document.getElementById("apellidos").value;
    var edad = document.getElementById("edad").value;
    if (edad) edad = parseInt(edad);

    var id = anyadirPaciente(nombre, apellidos, edad);
    if (id == 0) {
        alert("Error al añadir un paciente");
    } else {
        console.log("Se ha añadido el paciente con id", id);
        cargar();
    }
}

// Elimina un paciente
function eliminar(id) {
    if (eliminarPaciente(id)) {
        cargar();
    } else {
        alert("Error. NO se ha podido eliminar ese paciente");
    }
}
*/

// PROGRAMACIÓN ASÍNCRONA
// TODOS LOS PROCEDIMIENTOS SE LLAMAN ASÍ:
// procedimiento(argumentos, function (resultado) {
//    ...
// });
// NO ES BLOQUEANTE, EL CÓDIGO DE DEBAJO CONTINUA ANTES QUE EL CALLBACK

// resultado = procedimiento(argumentos)


// cargar la lista de pacientes
function cargar() {
    console.log("Voy a cargar los pacientes...")
    obtenerPacientes(function (pacientes) {
        console.log("Voy a mostrar los datos...")
        mostrarPacientes(pacientes);
    });
    console.log("Ya he solicitado los pacientes (ahora toca esperar que se ejecute el callback)");
}

// Añadir un paciente nuevo
function anyadir() {
    var nombre = document.getElementById("nombre").value;
    var apellidos = document.getElementById("apellidos").value;
    var edad = document.getElementById("edad").value;
    if (edad) edad = parseInt(edad);

    anyadirPaciente(nombre, apellidos, edad, function (id) {
        if (id == 0) {
            alert("Error al añadir un paciente");
        } else {
            console.log("Se ha añadido el paciente con id", id);
            cargar();
        }
    });
}

// Elimina un paciente
function eliminar(id) {
    eliminarPaciente(id, function (eliminado) {
        if (eliminado) {
            cargar();
        } else {
            alert("Error. NO se ha podido eliminar ese paciente");
        }
    });
}
