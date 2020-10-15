

function Reserva(hotel, checkin, checkout, huespedes, habitacion, tarifa) {
    this.hotel = hotel;
    this.checkin = checkin;
    this.checkout = checkout;
    this.huespedes = huespedes;
    this.habitacion = habitacion;
    this.tarifa = tarifa;
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

localStorage.huespedes = huespedesSelect.value;

// Armado lista de categorias de habitaciones y tarifas
let reserva = null;

function mostrarDispo(hotel, checkin, checkout, huespedes) {

    const $container = $('#modal-info');

    $container.html( 
    `<div class="d-flex flex-column justify-content-around">
        <h1 class="text-josefin text-uppercase text-center mb-3"><strong>${hotel}</strong></h1>
        <div class="d-flex flex-column flex-lg-row mt-3">
            <p class="text-lato mx-3"><i class="fas fa-user-friends px-2"></i>  Huéspedes: ${huespedes}</p> 
            <p class="text-lato mx-3"><i class="fas fa-plane-arrival px-2"></i>  Check in: ${checkin}</p>
            <p class="text-lato mx-3"><i class="fas fa-plane-departure px-2"></i>  Check out: ${checkout}</p>
        </div>
    </div>
    `);

    const opciones = datosReserva.filter(elem => {
        return elem.hotel == hotel;
    })

    const modalCategorias = $('#modal-categorias');
    modalCategorias.html('');

    opciones.forEach(elem => {
        let content = $(`<div class="d-flex flex-column flex-lg-row mx-auto">
        <div class="card mb-3" style="width: 18rem;">
            <img src="${elem.imgFile}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${elem.habitacion}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.<p>
                <p>Tarifa por noche $ ${elem.tarifa} </p>
                <button type="submit" class="btn btn-primary">Seleccionar</button>
            </div>
      </div>
           </div>
        `);

        content.find('button').click(function (e) {
            $container.html('');

            $('#modal-categorias').removeClass('d-flex').addClass('d-none');
            $('#modal-header-1').hide();
            
            $('#modal-reserva').removeClass('d-none').addClass('d-flex');
            $('#modal-header-2').show();

            let checkinReserva = localStorage.getItem('checkin');
            let checkoutReserva = localStorage.getItem('checkout');
            const totalNoches = moment(checkoutReserva).diff(moment(checkinReserva), 'days');
            console.log(totalNoches);

            $('#modal-reserva').html(`
                <form class="form-contacto d-flex flex-column ml-4 w-50 text-josefin">
                    <input type="text" name="nombre" placeholder="nombre y apellido:" required class="p-3 mb-4"/>
                    <input type="text" name="nacionalidad" placeholder="nacionalidad:" required class="p-3 mb-4"/>
                    <input type="tel" name="telefono" placeholder="teléfono" class="p-3 mb-4"/>
                    <input type="email" name="email" placeholder="email" required class="p-3 mb-4"/>
                </form>
            <div class="d-flex flex-column justify-content-around ml-4 w-50 text-josefin display-5 mb-4">
                <h2 class="mb-3">Detalle de tu reserva:</h2>
                <ul>
                    <li class="mb-3">Hotel: <b>${hotel} </b></li>
                    <li class="mb-3">Categoría de habitación: <b>${elem.habitacion} </b></li>
                    <li class="mb-3">Total de noches: <b> ${totalNoches} </b></li>
                    <li class="mb-3">Monto total de la reserva: <b>$ ${elem.tarifa * totalNoches} </b></li>
                </ul>
                <button id="confirmar-reserva" type="submit" class="btn btn-primary align-self-end mr-5" style="font-size: 1.5rem">Confirmar</button>
            </div>
            `);

            reserva = new Reserva(elem.hotel, checkinReserva, checkoutReserva, localStorage.getItem('huespedes'), elem.habitacion, elem.tarifa);

            $('#confirmar-reserva').click(function(e) {
                $.ajax({
                    url: "/confirmacion.json",
                    dataType: "json",
                    success: function (response) {
                        let msg = `${response.confirmacion}. <br>Código de reserva: ${response.codigo}. <br>Te enviaremos un email con todos los datos de tu reserva.`;

                        $('#modal-reserva').removeClass('d-flex').addClass('d-none');
                        $('#modal-confirmacion').removeClass('d-none').addClass('d-flex');
                        $('#modal-header-2').hide();
                        $('#modal-header-3').show();
                        
                        $('#modal-confirmacion').html(msg);
                    }
                });
            });

        });

        content.appendTo(modalCategorias);



		// modalCategorias.append(content);
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
    const huespedes = $("#huespedes").val();

    localStorage.setItem('hotel', hotel);
    localStorage.setItem('checkin', checkin);
    localStorage.setItem('checkout', checkout);
    localStorage.setItem('huespedes', huespedes);

    mostrarDispo(hotel, checkin, checkout, huespedes)

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




