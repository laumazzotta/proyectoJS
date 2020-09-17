var hoteles = ['Llao Llao Resort, Golf & Spa', 'Villa Huinid', 'Villa Beluno', 'El Casco Art Hotel', 'Hotel Panamericano', 'Design Suites Bariloche'];
var huespedes = [1, 2, 3, 4];


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