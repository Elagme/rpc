function cambiarSeccion(seccion){  //Para cambiar de una ventana a otra 
    document.getElementById(seccionActual).classList.remove("activa");//quita de la clase activa
    document.getElementById(seccion).classList.add("activa");
    seccionActual = seccion;
}


//Obtener una referencia a la app RPC:

var app = rpc("localhost", "gestion_pacientes");

// Obtener referencias a los procedimientos remotos registrados por el servidor
var login = app.procedure("login");
//var cargarPaciente = app.procedure("cargarPaciente");
var listadoDosis = app.procedure("listadoDosis");
var listadoSintomas = app.procedure("listadoSintoma");
var anyadirSintoma = app.procedure("anyadirSintoma");
var eliminarSintoma = app.procedure("eliminarSintoma");


//Las demás cosas:


