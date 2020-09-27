//Codigo para generar información de categorias y almacenarlas en un arreglo.
var categorias = [];
var categorias1 = [];
(() => {
    //Este arreglo es para generar textos de prueba
    let textosDePrueba = [
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
        "Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
        "Quaerat quod qui molestiae sequi, sint aliquam omnis quos voluptas?",
        "Non impedit illum eligendi voluptas. Delectus nisi neque aspernatur asperiores.",
        "Ducimus, repellendus voluptate quo veritatis tempora recusandae dolorem optio illum."
    ]

    //Genera dinamicamente los JSON de prueba para esta evaluacion,
    //Primer ciclo para las categorias y segundo ciclo para las apps de cada categoria


    let contador = 1;
    for (let i = 0; i < 5; i++) { //Generar 5 categorias
        let categoria = {
            nombreCategoria: "Categoria " + i,
            descripcion: textosDePrueba[Math.floor(Math.random() * (5 - 1))],
            aplicaciones: []
        };
        for (let j = 0; j < 10; j++) { //Generar 10 apps por categoria
            let aplicacion = {
                codigo: contador,
                nombre: "App " + contador,
                descripcion: textosDePrueba[Math.floor(Math.random() * (5 - 1))],
                icono: `img/app-icons/${contador}.webp`,
                instalada: contador % 3 == 0 ? true : false,
                app: "app/demo.apk",
                calificacion: Math.floor(Math.random() * (5 - 1)) + 1,
                descargas: 1000,
                desarrollador: `Desarrollador ${(i+1)*(j+1)}`,
                imagenes: ["img/app-screenshots/1.webp", "img/app-screenshots/2.webp", "img/app-screenshots/3.webp"],
                comentarios: [
                    { comentario: textosDePrueba[Math.floor(Math.random() * (5 - 1))], calificacion: Math.floor(Math.random() * (5 - 1)) + 1, fecha: "12/12/2012", usuario: "Juan" },
                    { comentario: textosDePrueba[Math.floor(Math.random() * (5 - 1))], calificacion: Math.floor(Math.random() * (5 - 1)) + 1, fecha: "12/12/2012", usuario: "Pedro" },
                    { comentario: textosDePrueba[Math.floor(Math.random() * (5 - 1))], calificacion: Math.floor(Math.random() * (5 - 1)) + 1, fecha: "12/12/2012", usuario: "Maria" },
                ]
            };
            contador++;
            categoria.aplicaciones.push(aplicacion);
        }
        categorias.push(categoria);
    }


    bdlocalStorage();
    cargarCategoria();
    console.log(categorias1);

})();


function bdlocalStorage() {
    var localStorage = window.localStorage;
    localStorage.setItem('appstore', JSON.stringify(categorias));
    if (localStorage.getItem('appstore') == null) {
        // statement
        localStorage.setItem('appstore', JSON.stringify(appstore));
    } else {
        // statement
        categorias1 = JSON.parse(localStorage.getItem('appstore'));
    }
}


function cargarCategoria() {

    $("#categoria").html(" ");

    for (let i = 0; i < categorias1.length; i++) {
        $("#categoria").append(
            `<option value="${i}">${categorias1[i].nombreCategoria}</option>`
        )
    }
    let valueCategoria = 0;
    cargarAPPS(valueCategoria);
}

//llenar apps
$("#categoria").on("change", function() {
    valueCategoria = document.getElementById("categoria").value;
    cargarAPPS(valueCategoria);
});

function cargarAPPS(valueCategoria) {
    $("#app").html(" ");

    for (let i = 0; i < categorias1.length; i++) {
        if (i == valueCategoria) {
            for (let j = 0; j < categorias1[i].aplicaciones.length; j++) {

                let estrellas = '';
                let contEstrellas = 0;

                contEstrellas = categorias1[i].aplicaciones[j].calificacion;
                for (let k = 0; k < contEstrellas; k++) {
                    estrellas += '<i class="fas fa-star "></i>';
                }
                for (let k = 0; k < (5 - contEstrellas); k++) {
                    estrellas += '<i class="far fa-star "></i>';
                }

                let precio = Math.floor(Math.random() * (100 - 1)) + 1;
                $("#app").append(
                    `<div class="col-6  col-sm-3  col-md-3 col-xl-2 col-lg-2  mt-2 " >
        <div class="card tar mt-2 " >
        <div onclick="cargarModal(${i},${j})"> <img src="${categorias1[i].aplicaciones[j].icono}" class="card-img-top padImg" alt="...">
        <div class="mt-3 ml-2">
          <h5 class="card-title">${categorias1[i].aplicaciones[j].nombre}</h5>
          <p>
          ${categorias1[i].aplicaciones[j].desarrollador}
          </p>
          <div class="star">${estrellas}</div>
          <h6>$ ${precio}</h6>
          </div> </div> <button type="button" id="btnEliminar"  onclick="eliminarAPP(${i},${j})" class="btn btn-outline-danger btn-sm"><i class="fas fa-trash-alt"></i></button>         
        </div></div>`)
            }
        }
    }
}

function cargarModal(categoria, app) {
    titulo = categorias1[categoria].aplicaciones[app].nombre;
    icono = categorias1[categoria].aplicaciones[app].icono;
    desarrollador = categorias1[categoria].aplicaciones[app].desarrollador;
    categoriaAPP = categorias1[categoria].descripcion;
    precio = `$ ${Math.floor(Math.random() * (100 - 1)) + 1}`;

    //llenar datos modal
    $('#nombreApp').html(titulo);
    $('#ico').html(`<img src="${icono}" class="card-img">`);
    $('#desarrolladorApp').html(desarrollador);
    $('#desApp').append(categoriaAPP);
    $('#precioApp').html(precio);

    //instalar
    instalarApp = categorias1[categoria].aplicaciones[app].instalada;
    if (instalarApp == false) {
        $('#btnInstalar').fadeIn();
    }

    //obtener estrellas
    let estrellas = '';

    contEstrellas = categorias1[categoria].aplicaciones[app].calificacion;

    if (contEstrellas > 2) {
        // statement
        for (let k = 0; k < contEstrellas; k++) {
            estrellas += '<i class="fas fa-star" style="color:green"></i>';
        }
        for (let k = 0; k < (5 - contEstrellas); k++) {
            estrellas += '<i class="far fa-star" style="color:green"></i>';
        }
        estrellas += '<a style="color:green"> ' + contEstrellas + '.0</a>';
    } else {
        // statement
        for (let k = 0; k < contEstrellas; k++) {
            estrellas += '<i class="fas fa-star" style="color:red"></i>';
        }
        for (let k = 0; k < (5 - contEstrellas); k++) {
            estrellas += '<i class="far fa-star" style="color:red"></i>';
        }
        estrellas += '<b style="color:red"> ' + contEstrellas + '.0</b>';
    }

    $("#estrellasApp").html(" ");
    $("#estrellasApp").append(estrellas);



    //obtener img
    let imagenes = '';

    for (let m = 0; m < categorias1[categoria].aplicaciones[app].imagenes.length; m++) {
        if (m == 0) {
            // statement
            imagenes += `<div class="carousel-item active">
            <img src="${categorias1[categoria].aplicaciones[app].imagenes[m]}" class="d-block w-100" alt="...">
            </div>`;
        } else {
            // statement
            imagenes += `<div class="carousel-item">
            <img src="${categorias1[categoria].aplicaciones[app].imagenes[m]}" class="d-block w-100" alt="...">
            </div>`;
        }
    }
    $("#img").html(" ");
    $("#img").append(imagenes);

    //obtener comentarios
    let comentario = '';

    for (let j = 0; j < categorias1[categoria].aplicaciones[app].comentarios.length; j++) {
        comentario += `<div class="col-md-2">
    <i class="fas fa-user-circle fa-3x rounded-circle" style="color:#007bff;background-color:#004993"></i></div>
    <div class="col-md-10">
    <b id="usuarioComentario">${categorias1[categoria].aplicaciones[app].comentarios[j].usuario}</b>
    <p id="comentario">
    <small class="text-muted">${categorias1[categoria].aplicaciones[app].comentarios[j].comentario}</small>
    </p></div><hr>`;
    }
    $("#comentarios").html(" ");
    $("#comentarios").append(comentario);


    //mostrar modal
    $('#descripcionApp').modal('show');
}

//
function eliminarAPP(cat, app) {
    $('#descripcionApp').modal('hide');
    //console.log('eliminar');
    categorias1[cat].aplicaciones.splice(app, 1);
    cargarAPPS(cat);
    localStorage.setItem('appstore', categorias1);
}

//abrir modal guardar
$("#btnNuevo").on("click", () => {

    for (let j = 0; j < 50; j++) {
        document.getElementById('slcIcono').innerHTML +=
            `<option value="img/app-icons/${j}.webp">Icono ${j}</option>`;
    }
    for (let j = 0; j < 5; j++) {
        document.getElementById('slcCate').innerHTML +=
            `<option value="${j}">Categoria ${j}</option>`;
    }
    $('#modalAdd').modal('show');
});

//guardar app
function guardarApp() {
    let nombreAplicacion = $('#nombreAplicacion').val();
    let desarrollador = $('#desarrollador').val();
    let calificacion = $('#calificacion').val();
    let slcIcono = $('#slcIcono').val();
    let slcCate = $('#slcCate').val();
    let descripcionCat = $('#descripcionCat').val();

    contador = categorias1[slcCate].aplicaciones.length;

    //Este arreglo es para generar textos de prueba
    let textosDePrueba = [
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
        "Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
        "Quaerat quod qui molestiae sequi, sint aliquam omnis quos voluptas?",
        "Non impedit illum eligendi voluptas. Delectus nisi neque aspernatur asperiores.",
        "Ducimus, repellendus voluptate quo veritatis tempora recusandae dolorem optio illum."
    ]

    const app = {
        codigo: contador,
        nombre: nombreAplicacion,
        descripcion: descripcionCat,
        icono: slcIcono,
        instalada: contador % 3 == 0 ? true : false,
        app: "app/demo.apk",
        calificacion: calificacion,
        descargas: 1000,
        desarrollador: desarrollador,
        imagenes: ["img/app-screenshots/1.webp", "img/app-screenshots/2.webp", "img/app-screenshots/3.webp"],
        comentarios: [
            { comentario: textosDePrueba[Math.floor(Math.random() * (5 - 1))], calificacion: Math.floor(Math.random() * (5 - 1)) + 1, fecha: "12/12/2012", usuario: "Juan" },
            { comentario: textosDePrueba[Math.floor(Math.random() * (5 - 1))], calificacion: Math.floor(Math.random() * (5 - 1)) + 1, fecha: "12/12/2012", usuario: "Pedro" },
            { comentario: textosDePrueba[Math.floor(Math.random() * (5 - 1))], calificacion: Math.floor(Math.random() * (5 - 1)) + 1, fecha: "12/12/2012", usuario: "Maria" },
        ]
    }

    //console.log(app);
    categorias1[slcCate].aplicaciones.push(app);
    localStorage.setItem('appstore', categorias1);
    //console.log(categorias1);

    $('#modalAdd').modal('hide');
    cargarAPPS(slcCate);
}