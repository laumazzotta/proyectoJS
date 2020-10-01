
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

const hotelesSelect = document.getElementById("hotel");

// armado select de Hoteles

const hoteles = crearListado(datosReserva, "hotel");

cargarSelect(hoteles, hotelesSelect);

function cargarSelect(array, select) {
	array.forEach(element => {
		let option = document.createElement('option');
		option.value = element;
		option.textContent = element;
		select.appendChild(option);
	})
}

function crearListado(array, key) {
    const listado = [];
    
    array.forEach(elem => {
        if (!listado.includes(elem[key])) {
			listado.push(elem[key]);
		}
    })
    return listado.sort();

}

// Armado del checkin //
const dateCheckin = new Date();
const diaCheckin = dateCheckin.getDay().toString().padStart(2, "0");
const mesCheckin = dateCheckin.getMonth().toString().padStart(2, "0");
const anioCheckin = dateCheckin.getFullYear().toString();
const fechaCheckIn = anioCheckin + '-' + mesCheckin + '-' + diaCheckin;
const checkinSelect = document.getElementById("checkin");
checkinSelect.value = fechaCheckIn;

// Tomar valor de LocalStorage si está disponible
if (localStorage.getItem('checkin')) {
    checkinSelect.value = localStorage.getItem('checkin');
}

// Armado del checkout //
const dateCheckout = new Date();
dateCheckout.setDate(dateCheckin.getDate() + 1);
const diaCheckout = dateCheckout.getDay().toString().padStart(2, "0");
const mesCheckout = dateCheckout.getMonth().toString().padStart(2, "0");
const anioCheckout = dateCheckout.getFullYear().toString();
const fechaCheckout = anioCheckout + '-' + mesCheckout + '-' + diaCheckout;
const checkoutSelect = document.getElementById("checkout");
checkoutSelect.value = fechaCheckout;

// Tomar valor de LocalStorage si está disponible
if (localStorage.getItem('checkout')) {
    checkoutSelect.value = localStorage.getItem('checkout');
}

// Armado select de huespedes //

var arrayHuespedes = [1, 2, 3, 4];

const huespedesSelect = document.getElementById("huespedes");
for(let i = 0; i < arrayHuespedes.length; i++) {
    const cantidadHuespedes  = document.createElement('option');
    cantidadHuespedes.value = i+1;
    cantidadHuespedes.text = arrayHuespedes[i];
    huespedesSelect.appendChild(cantidadHuespedes);
}

// Armado lista de categorias de habitaciones y tarifas

function mostrarDispo(hotel, checkin, checkout, cantHuespedes) {

    const container = document.getElementById('categorias');

    container.innerHTML = 
    `<h1 class="text-josefin"><strong>${hotel}</strong></h1>
    <p class="text-lato">Huespedes: ${cantHuespedes}</p> 
    <p class="text-lato">Fecha Check in: ${checkin}</p>
    <p class="text-lato">Fecha Check out: ${checkout}</p>`

    const opciones = datosReserva.filter(elem => {
        return elem.hotel == hotel;
    })
    opciones.forEach(elem => {
        let resultado = document.createElement('div');
		resultado.innerHTML = elem.habitacion + ' $' + elem.tarifa;
		container.appendChild(resultado);
    });

    container.style.textAlign = "center";
    
}

// EVENTO boton BUSCAR //

const modal = document.getElementById("modal");
const boton = document.getElementById("submit");
const closeBtn = document.getElementsByClassName("close")[0];

boton.addEventListener('click', function(){
    const hotel = document.getElementById("hotel").value;
    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const cantHuespedes = document.getElementById("huespedes").value;

    localStorage.setItem('hotel', hotel);
    localStorage.setItem('checkin', checkin);
    localStorage.setItem('checkout', checkout);
    localStorage.setItem('cantHuespedes', cantHuespedes);

    mostrarDispo(hotel, checkin, checkout, cantHuespedes)

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



