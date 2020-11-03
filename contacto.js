
function Contacto(nombre, telefono, email, mensaje) {
    this.nombre = nombre;
    this.telefono = telefono;
    this.email = email;
    this.mensaje = mensaje;
}

const submitContacto = $('#submitContacto');

submitContacto.click(function (event) {
   
    let formData = {
        'nombre' : $('#nombre').val(),
        'telefono' : $('#telefono').val(),
        'email' : $('#email').val(),
        'mensaje' : $('#mensaje').val(),
    };

    $.ajax({
        type : 'GET',
        url: '/contactos.json',
        data : formData,
        dataType : 'json',
        encode : true
    })
    .done(function (data) {
        $('#contacto').append(
            `<div class="mx-auto my-4 text-center text-josefin display-5 w-lg-50 w-xs-100 text-white wow zoomIn" style="z-index: 100;">
                <p>${(data.message)}</p>
            </div>`
        );
    });

    event.preventDefault();
});

