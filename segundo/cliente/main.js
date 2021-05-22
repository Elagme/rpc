var seccionActual="medicoPaciente";

function cambiarSeccion(seccion){  //Para cambiar de una ventana a otra 
    document.getElementById(seccionActual).classList.remove("activa");//quita de la clase activa
    document.getElementById(seccion).classList.add("activa");
    seccionActual = seccion;
}

var medicoId = null;
var pacienteId = null;

function mostrar(){
    cambiarSeccion("ventanaLogin")
}

function mostrar2(){
    cambiarSeccion("loginPaciente")  //Aqui entre paréntesis hay que mandarle que vaya a la parte del PACIENTE 
}

function iniciarSesion(){
    var credenciales = {
        login: document.getElementById("usuari").value,
        password: document.getElementById("contraseñ").value
    }
    
    rest.post("/api/medico/login", credenciales, function (estado, id){
        if(estado == 200){
            alert("OK medico logueado es: " + id);
            medicoId = id;
            cambiarSeccion("listadoPacientes"); //Si usuario y contraseña es una de esas 3 entonces se cambia a la ventana del listado de pacientes
            tablaPacientes(medicoId);
            
        }
        else{
            alert("Usuario y contraseña incorrecto");
        }
    });
}

//Este rest es para que en la ventana de listadoPacientes nos aparezca solo el nombre de los pacientes
function tablaPacientes(medicoId) {
    rest.get("/api/medico/" + medicoId, function (estado, medico){
        if (estado == 200) {
            alert ("Bienvenido " + medico);
            return;
        }
    });
   
    rest.get("/api/medico/" + medicoId + "/pacientes", function (estado, pacientes) {
        if (estado != 200) {
            alert("Error cargando la lista de pacientes");
            return;
        }

        var lista = document.getElementById("tablavariable");

        lista.innerHTML = "";
        for (var i = 0; i < pacientes.length; i++) {
            lista.innerHTML += '<tr><td>' + pacientes[i].nombre + '</td><td><button type="button" class="buttons" onclick="consultarEsePaciente('+ pacientes[i].id +')">Consultar</button></td> </tr>'; 
        }
        
    });

}

// Obtener el nombre de la vacuna
var vacunas;
rest.get("/api/vacuna", function (estado, vacuna) {
    if(estado!=200){
        alert('Error en la carga de las vacunas');
        return;
    }
    vacunas=vacuna;
});

//¿Como poner los datos de la lista?
function consultarEsePaciente(pacienteId){
    cambiarSeccion("datosPaciente");
    rest.get("/api/paciente/" + pacienteId, function(estado,paciente){
        if(estado!=200){
            alert('Error en la carga de los datos de los pacientes');
            return;
        }
        
        var valor= document.getElementById("tablatabla");
        valor.innerHTML = "<tr><th>ID:</th><th><input id='i' type='text' placeholder='ID' value='"+ paciente.id+"'></th></tr>"+   //El valor del VALUE es lo que aparece dentro de la casilla de la  tabla
        "<tr><th>Nombre:</th><th><input id='n' type='text' placeholder='ID' value='"+ paciente.nombre+"'></th></tr>"+
        "<tr><th>Fecha Nacimiento:</th><th><input id='fn' type='text' placeholder='Fecha nacimiento' value='"+paciente.fecha_nacimiento +"'></th></tr>"+
        "<tr><th>Género:</th><th><input id='g' type='text' placeholder='Género' value='"+paciente.genero+"'></th></tr>"+
        "<tr><th>Médico:</th><th><input id='m' type='text' placeholder='Médico' value='"+paciente.medico+"'></th></tr>"+
        "<tr><th>Observaciones:</th><th><input id='o' type='text' placeholder='Observaciones' value='"+ paciente.observaciones +"'></th></tr>";
    });
    
    rest.get("/api/dosis", function (estado, dosis) {
        if(estado!=200){
            alert('Error en la carga de las dosis del paciente');
            return;
        }
    
       //Obtener el nombre de la vacuna:
        var nombreVacuna; 
        for (var i = 0; i < vacunas.length; i ++) {
            if (vacunas[i].id == dosis.vacunaD) {
                nombreVacuna =vacunas[i].nombre; 
                break;
            }
        }
    
        var datosD = document.getElementById("tablavariabledosis");
        datosD.innerHTML += "<tr><th><input type='text' value='"+ dosis.fechaD +"'></th>"+
                                "<th><input type='text' value='" + dosis.numD +"'></th>"+
                                "<th><input type='text' value='" + nombreVacuna + "'></th>"+
                                "<th><input type='text' value='"+ dosis.vialD + "'></th>"+
                                "<th><button onclick='sintomasVer()'>Sintomas</th>"+
                                "<th><input type='text' value='"+ dosis.suministradaD +"'></th>" +
                                "<th><button onclick='eliminarS()'>Eliminar</th></tr>";
});

    rest.get("/api/vacuna", function (estado, vacuna) {
        if(estado!=200){
            alert('Error en la carga de las vacunas');
            return;
        }
    });

    
    var parametros = {
        fecha: document.getElementById("f").value,
        numeroD: document.getElementById("n").value,
        vacuna: document.getElementById("v").value,
        vial: document.getElementById("vi").value
    }

    rest.post("/api/paciente/" + pacienteId + "/dosis", parametros, function (estado, dosis) {
        if (estado == 201) {
            document.getElementById("tablavariabledosis").insertRow(-1).innerHTML = "<td>" + fecha + "</td><td>"+ numeroD + "</td><td>" + vacuna + "</td><td>" + vial + "</td><td><input type = 'button' value='Eliminar' onclick='Borrar(this)'/></td> <td><input type = 'button' value='Sintoma' onclick='sintoma()'/></td>";
        }

    });


}

function eliminarS(fila){
    rest.delete("/api/dosis/" + idDosis, function( estado, respuesta ){
        if (estado==200){
            var filas = fila.parentNode.parentNode.rowIndex;// row index indica en que posicion esta la fila
            document.getElementById("tablavariabledosis").deleteRow(filas-1);//-1 porque sino no deja eliminar la primera fila que añades
        
        }
        else{
            alert("No se ha podido eliminar dosis")
        }
       
    });
    
}



function nuevoPaciente(){
    cambiarSeccion("formularioPaciente");
    alert("Nuevo");
    var pac = { 
        id: document.getElementById("i").value,
        nombre: document.getElementById("n").value,
        fech_nac: document.getElementById("fn").value,
        genero: document.getElementById("g").value,
        medico: document.getElementById("m").value,
        cod_acc: document.getElementById("ca").value,
        observaciones: document.getElementById("o").value
        };
    
    rest.post("/api/medico/" + medicoId + "/pacientes", pac, function (estado, respuesta) { 
        if (estado == 201){ 
            alert("caca");
           }
        
        else {
            alert("Error añadiendo paciente");

        }
    });   
    
}

function actualizarPaciente(){
    cambiarSeccion("listadoPacientes")
    rest.put("/api/dosis/"+ pacienteId, function (estado, respuesta){
        if (estado != 404){
            alert("Error, no se ha podido actualizar")
        }

    });
}











function volverMedicoPaciente(){
    cambiarSeccion("medicoPaciente");
}



function volverLogin(){
    cambiarSeccion("ventanaLogin");
}



function dosisPorPoner(){
    cambiarSeccion("dPendiente");
}




////////////////////////////VACUNAS DOSIS


//RPC:


//Obtener una referencia a la app RPC:
var app = rpc("localhost", "gestion_pacientes"); // obtener una referencia a la app RPC

//Obtener referencias a los procedimientos remotos registrados por el servidor

var login = app.procedure("login");
var cargarPaciente = app.procedure("cargarPaciente");

//Las demás cosas:

function verificacionLogin(){

    var acceso = document.getElementById("accesoPac").value;  

    login (acceso, function (paciente) {//aqui llamo a la funcion login del servidor 
        if(paciente.codigoAcceso == acceso){
           alert("(Login correcto) Bienvenido ", paciente.nombre);
            cambiarSeccion("listadoDosis");
        }

        else {
            alert("Login incorrecto")
            
        }
    });
}
