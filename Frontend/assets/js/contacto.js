var modal = document.getElementById("myModal"); //MODELO MODAL
var span = document.getElementsByClassName("close")[0]; //BOTON CLOSE

//CUANDO CIERRA, SE OCULTA EL MODAL
span.onclick = function () {
    modal.style.display = "none";
    window.location.href = "index.html"; //VOLVER AL INICIO
}

// SE OCULTA CADA VEZ QUE SE REINICIA
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

$('.contact-form').submit(function (e) {
    e.preventDefault();
    
    //OBTENER VALORES QUE INGRESO EN FORMULARIO
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const destino = document.getElementById("destino").value;
    const pasajeros = document.getElementById("pasajeros").value;
    const fecha = document.getElementById("fecha-aproximada").value;
    const mensaje = document.getElementById("mensaje").value;
    
    document.getElementById("modal-message").innerHTML = "¡Gracias " + nombre + "! Recibimos tu consulta, te contestaremos a la dirección que proporcionaste.";
    modal.style.display = "block";

    setTimeout(function(){
        window.location.href = "index.html"; //VOLVER AL INICIO
    }, 6000); //6 SEGUNDOS
});
