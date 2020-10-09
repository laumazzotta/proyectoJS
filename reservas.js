$("h1").hover(function() {
    $(this).css("font-family", 'Playfair Display');
},
function() {
    $(this).css("font-family", "montserrat");
});


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

    const $container = $('#categorias');

    $container.html( 
    `<div class="d-flex flex-column w-50">
    <h1 class="text-josefin text-uppercase mb-3"><strong>${hotel}</strong></h1>
    <p class="text-lato"><i class="fas fa-user-friends px-2"></i>  Huéspedes: ${cantHuespedes}</p> 
    <p class="text-lato"><i class="fas fa-plane-arrival px-2"></i>  Check in: ${checkin}</p>
    <p class="text-lato"><i class="fas fa-plane-departure px-2"></i>  Check out: ${checkout}</p>
    </div>
    `);

    const opciones = datosReserva.filter(elem => {
        return elem.hotel == hotel;
    })
    opciones.forEach(elem => {
        let content = `<form class="mx-auto my-auto">
           <input type="radio" id="habitacion">
           <label for="habitacion" class="px-3 py-2 text-center"> ${elem.habitacion} <br> $${elem.tarifa} </label>
           </form>
        `;

		$('#categorias').append(content);
    });
    
}

// EVENTO boton BUSCAR //

const modal = $("#modal");
const boton = $("#submit");
const closeBtn = $("#modal .close");

boton.click(function(){
    const hotel = $("#hotel").val();
    const checkin = $("#checkin").val();
    const checkout = $("#checkout").val();
    const cantHuespedes = $("#huespedes").val();

    localStorage.setItem('hotel', hotel);
    localStorage.setItem('checkin', checkin);
    localStorage.setItem('checkout', checkout);
    localStorage.setItem('cantHuespedes', cantHuespedes);

    mostrarDispo(hotel, checkin, checkout, cantHuespedes)

    modal.show();

});

closeBtn.click(function(){
    modal.hide();
});

$('#submit').click(function (event) {
    event.preventDefault();
});

window.onclick = function(event) {
    if (event.target.id == "modal") {
        modal.hide();
    }
};

