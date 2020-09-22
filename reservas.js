var arrayHoteles = ['Llao Llao Resort, Golf & Spa', 'Villa Huinid', 'Villa Beluno', 'El Casco Art Hotel', 'Hotel Panamericano', 'Design Suites Bariloche'];
var huespedes = [1, 2, 3, 4];
var arrayCategorias = ['Standard', 'Superior', 'Presidencial'];


function Reserva(hotel, checkin, checkout, huespedes) {
    this.hotel = hotel;
    this.checkin = checkin;
    this.checkout = checkout;
    this.huespedes = huespedes;
}

function Contacto(nombre, telefono, email, mensaje) {
    this.nombre = nombre;
    this.telefono = telefono;
    this.email = email;
    this.mensaje = mensaje;
}

const reserva = new Reserva('Villa Huinid', '17/09/2020', '20/09/2020', 2);
console.log(reserva);

const contacto = new Contacto('Laura', '12345678', 'lali@gmail.com', 'hola');
console.log(contacto);

// desafío clase DOM //

// agrego las opciones de hoteles en el form

var hoteles = document.createElement('option');
var opciones = document.createTextNode(arrayHoteles)
hoteles.appendChild(opciones);
document.getElementById("hotel").appendChild(hoteles);

// cambio color del text hero

document.getElementById("home-hero").style.color = "rgba(255, 56, 93, 0.8)";

// agrego listado de categorias de habitaciones

var habitaciones = document.createElement('option');
var categorias = document.createTextNode(arrayCategorias)
habitaciones.appendChild(categorias);
habitaciones.setAttribute('align', 'left');
habitaciones.setAttribute('style', 'color: white');
document.getElementById('formulario').appendChild(habitaciones);

