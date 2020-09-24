var arrayHoteles = ['Llao Llao Resort, Golf & Spa', 'Villa Huinid', 'Villa Beluno', 'El Casco Art Hotel', 'Hotel Panamericano', 'Design Suites Bariloche'];
var arrayHuespedes = [1, 2, 3, 4];
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

// agrego arrayHoteles al select de hoteles //

const hotelesSelect = document.getElementById("hotel");
for(let i = 0; i < arrayHoteles.length; i++) {
    const optionHotel = document.createElement('option');
    optionHotel.value = i;
    optionHotel.text = arrayHoteles[i];
    hotelesSelect.appendChild(optionHotel);
}

// agrego arrayHuespedes al select del huespedes //

const huespedesSelect = document.getElementById("huespedes");
for(let i = 0; i < arrayHuespedes.length; i++) {
    const cantidadHuespedes  = document.createElement('option');
    cantidadHuespedes.value = i;
    cantidadHuespedes.text = arrayHuespedes[i];
    huespedesSelect.appendChild(cantidadHuespedes);
}

// agrego listado de categorias de habitaciones

const habitaciones = document.createElement('p');
const categorias = document.createTextNode(arrayCategorias)
habitaciones.appendChild(categorias);
habitaciones.setAttribute('align', 'left');
habitaciones.setAttribute('style', 'color: grey');
document.getElementById('categorias').appendChild(habitaciones);

// EVENTOS //

const modal = document.getElementById("modal");
const boton = document.getElementById("submit");
const closeBtn = document.getElementsByClassName("close")[0];

boton.addEventListener('click', function(){
    modal.style.display = "block";
});

closeBtn.addEventListener('click', function() {
    modal.style.display = "none";
});

boton.addEventListener('click', function(event){
    event.preventDefault()
});

window.onclick = function(event) {
    if (event.target == modal) {
    modal.style.display = "none";
    }
};
