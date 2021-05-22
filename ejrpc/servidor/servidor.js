

// Listado de pacientes
var medicos = [{id: 0, nombre:"Rafael Morilla", login: "a", password: "a"}, //Array 'medicos' con 4 objetos dentro (cada médico tendrá cuatro datos personales)
                {id : 1, nombre: "Javier Zamora", login: "b", password:"b"},
                {id : 2, nombre: "Clara Blanco", login: "c", password: "c"}]; 

var pacientes = [{id :1, nombre: "Paula Blanco", fecha_nacimiento:"09/09/1999", genero:"F", medicos: 0, codigo_acceso:787, observaciones:"nada"},
                 {id :3, nombre: "Paula Negro", fecha_nacimiento:"09/09/1999", genero:"F", medicos: 0, codigo_acceso:788, observaciones:"nada"},
                 {id :2, nombre: "Elena", fecha_nacimiento:"09/09/1999", genero:"F", medicos: 1, codigo_acceso:89, observaciones:"nada"}];  //Cuidado con el objeto 'medicos' si lo relacion con el array 'medicos'];  //Cuidado con el objeto 'medicos' si lo relacion con el array 'medicos'


var vacuna = [{id : 1, nombre : "Astrazeneca", descripcion:"bueno", dosis:1, recomendaciones:"nada"},
              {id : 2, nombre : "Moderna", descripcion:"muy mal", dosis:2, recomendaciones:"descansar"},
              {id : 3, nombre :"Pfizer", descripcion:"nada", dosis:3, recomendaciones:"bueno"}];

var dosis = [{id : 0, vacuna : 1, pacientes : 1, numero : 1, vial : 01, fecha: 3, suministrada : "SI"},
             {id : 1, vacuna : 1, pacientes : 1, numero : 2, vial : 01, fecha: 5, suministrada : "NO"},
             {id : 2, vacuna : 3, pacientes : 3, numero : 1, vial : 01, fecha: 3, suministrada : "SI"}];

var sintoma = [{id : 50, dosis : 0, descripcion : "dolor", fecha : "3"}];

var siguienteId = 4;



//1.Incorporación librería:
var rpc = require("./rpc.js");

//2.Procedimientos o funciones:


// Realiza un login apra el paciente

function login(codigoAcceso) {

    for (var i = 0; i < pacientes.length; i ++) {
        if (pacientes[i].codigo_acceso == codigoAcceso) {
            alert("Codigo acceso correcto")
            return;
        }
        else{
            alert("Codigo acceso incorrecto")
        }
    }
}


/*
function cargarPaciente() {

    for (var i = 0; i<listapacientes.length ; i ++ ){
        if (guarda == listapacientes[i].codigo){
            return listapacientes[i].nombre;
        }
    }
    return false;
}*/

// Obtiene un listado de las dosis del paciente
function listadoDosis(idPcaiente) {
    
}

// Obtiene un listado de los síntomas asociados a una dosis
function listadoSintomas(idDosis) {
    
}

//Añade un nuevo síntoma asociado a una dosis. se indica sólo la descripcion, la fecha la obtine automáticamente el servidor
function anyadirSintoma(idDosis, descricpcion){

}

//Elimina un síntoma
function eliminarSintoma(idSintoma){
    for (var i = 0; i<sintoma.length ; i ++) {
        if (sintoma[i].id == id) {
            pacientes.splice(i, 1);
            return true;
        }
    }
    return false;
}

//rpc.delay = 5000; // retrasar todas las operaciones 5 segundos
var servidor = rpc.server(); // crear el servidor RPC
var app = servidor.createApp("gestion_pacientes"); // creamos la aplicación RPC

// Registrar los procedimientos
app.register(login);
//app.register(cargarPaciente);
app.register(listadoDosis);
app.register(listadoSintomas);
app.register(anyadirSintoma);
app.register(eliminarSintoma);