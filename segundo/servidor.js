var medicos = [{id: 0, nombre:"Rafael Morilla", login: "a", password: "a"}, //Array 'medicos' con 4 objetos dentro (cada médico tendrá cuatro datos personales)
                {id : 1, nombre: "Javier Zamora", login: "b", password:"b"},
                {id : 2, nombre: "Clara Blanco", login: "c", password: "c"}]; 

var pacientes = [{id :1, nombre: "Paula Blanco", fecha_nacimiento:"09/09/1999", genero:"F", medicos: 0, codigo_acceso:787, observaciones:"nada"},
                 {id :3, nombre: "Paula Negro", fecha_nacimiento:"09/09/1999", genero:"F", medicos: 0, codigo_acceso:787, observaciones:"nada"},
                 {id :2, nombre: "Elena", fecha_nacimiento:"09/09/1999", genero:"F", medicos: 1, codigo_acceso:89, observaciones:"nada"}];  //Cuidado con el objeto 'medicos' si lo relacion con el array 'medicos'];  //Cuidado con el objeto 'medicos' si lo relacion con el array 'medicos'


var vacuna = [{id : 1, nombre : "Astrazeneca", descripcion:"bueno", dosis:1, recomendaciones:"nada"},
              {id : 2, nombre : "Moderna", descripcion:"muy mal", dosis:2, recomendaciones:"descansar"},
              {id : 3, nombre :"Pfizer", descripcion:"nada", dosis:3, recomendaciones:"bueno"}];

var dosis = [{id : 0, vacuna : 1, pacientes : 1, numero : 1, vial : 01, fecha: 3, suministrada : "SI"},
             {id : 1, vacuna : 1, pacientes : 1, numero : 2, vial : 01, fecha: 5, suministrada : "NO"},
             {id : 2, vacuna : 3, pacientes : 3, numero : 1, vial : 01, fecha: 3, suministrada : "SI"}];

var sintoma = [{id : 50, dosis : 0, descripcion : "dolor", fecha : "3"}];

var express = require("express");
var app = express();
app.use(express.json());
app.use("/medico", express.static ("cliente"));

//Realiza un login para medico.En body se indican las credenciales
app.post("/api/medico/login", function (req, res) {
    var log = req.body.login;
    var pass = req.body.password;

    console.log("Login: ", log);
    console.log("Password: ", pass);

    for(var i = 0; i < medicos.length; i++) {
        if(medicos[i].password == pass & medicos[i].login == log){
            res.status(200).json(medicos[i].id);
            return;
        }
        
    }
});

//Obtiene los datos del médico (no devolver la contraseña)
app.get("/api/medico/:idMedico", function (req,res){
    var idMedico = req.params.idMedico; //params es el input
    // En la url pones: localhost3000/api/medico/2 y entonces te aparece en la terminal el console dicendo que el idMedico es 2
    console.log("Medico con el idMedico:",idMedico);
    //Para saber cual es el paciente que tiene ese id hago un bucle
    for(var i = 0; i < medicos.length; i++){
        if(medicos[i].id == idMedico){
            res.status(200).json(medicos[i].nombre);
            return;
        }
    }
    res.status(404).send("NO se ha encontrado el id" + idMedico);
});


//LISTADO: Obtiene un array con los datos de sus pacientes
app.get("/api/medico/:idMedico/pacientes", function (req,res){
    var idMedico = req.params.idMedico;
    var pacientesaux = [];
    for(var i = 0; i < pacientes.length; i++){
        if (pacientes[i].medicos == idMedico) {
            pacientesaux.push(pacientes[i]);
        }
    }
    res.status(200).json(pacientesaux);
    console.log(pacientesaux);
});

//CLICK: Obtiene los datos del paciente indicado (no devolver el código de acceso)
//FALTA LO DEL PARENTESIs
app.get("/api/paciente/:idPaciente", function (req,res){
    var idPaciente = req.params.idPaciente; //params es el input
    // En la url pones: localhost3000/api/paciente/2 y entonces te aparece en la terminal el console dicendo que el idPaciente es 2
    console.log("Paciente con el id:", idPaciente);
    //Para saber cual es el paciente que tiene ese id hago un bucle
    for(var i = 0; i < pacientes.length; i++){
        if(pacientes[i].id == idPaciente){
            res.status(200).json({ id : pacientes[i].id, nombre: pacientes[i].nombre, fecha_nacimiento: pacientes[i].fecha_nacimiento, genero: pacientes[i].genero, medico: pacientes[i].medicos, observaciones: pacientes[i].observaciones});  //Muestra todo menos CODIGO ACCESO
            return;//para salir de la funcion
        }
    }
    res.status(404).send("NO se ha encontrado el id" + idPaciente);
});


//Crea un nuevo paciente
var siguientePaciente = 4;
app.post("/api/medico/:idMedico/pacientes", function (req,res){
    var nuevo ={
        id: siguientePaciente,
        nombre: req.body.nombre, 
        fech_nac: req.body.fecha_nacimiento,
        genero: req.body.genero,
        medicos: req.body.medicos,
        cod_acc: req.body.codigo_acceso,
        observaciones: req.body.observaciones

    };
    pacientes.push(nuevo);
    siguientePaciente++;
    res.status(201).send("Paciente creado");
     
});

//Actualiza los datos de un paciente
app.put("/api/paciente/:idPaciente", function (req,res){
    var idPaciente = req.params.idPaciente;
    console.log("Paciente con el id:",idPaciente);
    for (var i = 0; i<pacientes.length;i++){
        if (pacientes[i].id == idPaciente){
            pacientes[i] = req.body;//req body da toso lo nuevo del jason del postman
            res.send("Ok, paciente actualizado");
            return;
        }
    }
    res.status(404).send("NO se ha encontrado el id" + idPaciente);
});


//////////////////////////////////////////////////////////////////////////////// DOSIS VACUNAS

//Obtiene un array de dosis.
//Cada dosis tendrá un array asociado con los síntomas introducidos por el paciente.
//Tiene 2 parámetros opcionales:
//  - paciente: Id del paciente
//  - fecha: Fecha de la dosis

app.get("/api/dosis", function (req,res){
    for(var i = 0; i < dosis.length; i++){
            res.status(200).json({ fechaD: dosis[i].fecha, numD: dosis[i].numero, vacunaD: dosis[i].vacuna, vialD: dosis[i].vial, suministradaD: dosis[i].suministrada, sintomaD: dosis[i].sintoma}); 
            return;
    }
    res.status(404).send("NO se ha encontrado la dosis");
});



//Obtiene un array con los datos de las vacunas
app.get("/api/vacuna", function (req,res){
    
    res.status(200).json(vacuna);

    });


//Inserta una nueva dosis a un paciente:
app.post("/api/paciente/:idPaciente/dosis", function (req,res){
    var idPaciente = req.params.idPaciente;
    console.log("Paciente con el id:", idPaciente);

    for(var i = 0; i < dosis.length ; i++){
        if(dosis[i].pacientes == idPaciente){
            var nuevaDosis = req.body;
            console.log("Insertar una nueva dosis:", nuevaDosis);
            dosis.push(nuevaDosis);//para meterlo en la lista
            res.status(201).send("Nueva dosis añadida");
            return;
        }
    }
    res.status(404).send("NO se ha encontrado el id"+idPaciente);
});

//Actualiza los datos de una dosis. Sólo se puede actualizar si la dosis no ha sido inoculada (SUMINISTRADA)
app.put("/api/dosis/:idDosis", function (req,res){
    var idDosis = req.params.idDosis;
    console.log("Actualizar la dosis con id:", idDosis);
        for (var i = 0; i < dosis.length; i++) {
            if (dosis[i].id == idDosis) {
                if (dosis[i].suministrada == "no") { //Si NO ha sido suministrada, entonces se actualiza
                    dosis[i] = req.body;
                    res.send("Ok, dosis actualizado");
                    return;
                }
            }
        }
        res.status(404).send("No se ha encontrado y actualizado la dosis con id " + idDosis);
    });

//Elimina una dosis. Sólo se puede borrar si la dosis no ha sido inoculada
app.delete("/api/dosis/:idDosis", function (req,res){
    var idDosis = req.params.idDosis; 
    console.log("Eliminar la dosis con el id:", idDosis);
    for(var i = 0; i < dosis.length; i++){
        if(dosis[i].id == idDosis){
            if (dosis[i].suministrada == "NO") {
                dosis.splice(i,1)// i es las poiscion, y el 1 es la cantidad qu quieres eliminar 1
                res.status(200).send("Ok, dosis eliminado");
                return;
            }
        }
    }
    res.status(404).send("NO se puede eliminar la dosis con ese id" + idDosis);

});




/*
//Añadir medicamento
app.post("/medicamentos", function (req, res) {
    var nuevo = req.body;
    console.log("Insertar un nuevo medicamento:", nuevo);
    medicamentos.push(nuevo); // Inserto el nuevo medicamento en el array de medicamentos
    res.status(201).send("Nuevo medicamento añadido");
});
*/


var puerto=3000;
app.listen(puerto, function (){
    console.log("Servidor en marcha en el puerto: " + puerto)
});








//RPC:


//1.Incorporación librería:
var rpc = require("./rpc.js");


//2.Procedimientos o funciones:

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


function cargarPaciente() {

    for (var i = 0; i<listapacientes.length ; i ++ ){
        if (guarda == listapacientes[i].codigo){
            return listapacientes[i].nombre;
        }
    }
    return false;
}


function listadoDosis(idPaciente) {

}

function listadoSintomas(idDosis) {

}

function anyadirSintoma(idDosis, descripcion) {

}

function eliminarSintoma(idSintomas) {
    
}


//rpc.delay = 5000; // retrasar todas las operaciones 5 segundos
var servidor = rpc.server(); // crear el servidor RPC
var app = servidor.createApp("gestion_pacientes"); // creamos la aplicación RPC

// Registrar los procedimientos/funciones creadas:
app.register(login);
app.register(cargarPaciente);



