//Codigo para generar información de categorias y almacenarlas en un arreglo.
var categorias = [];
var categorias1 = [];
(()=>{
  //Este arreglo es para generar textos de prueba
  let textosDePrueba=[
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
      "Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
      "Quaerat quod qui molestiae sequi, sint aliquam omnis quos voluptas?",
      "Non impedit illum eligendi voluptas. Delectus nisi neque aspernatur asperiores.",
      "Ducimus, repellendus voluptate quo veritatis tempora recusandae dolorem optio illum."
  ]
  
  //Genera dinamicamente los JSON de prueba para esta evaluacion,
  //Primer ciclo para las categorias y segundo ciclo para las apps de cada categoria

  
  let contador = 1;
  for (let i=0;i<5;i++){//Generar 5 categorias
      let categoria = {
          nombreCategoria:"Categoria "+i,
          descripcion:textosDePrueba[Math.floor(Math.random() * (5 - 1))],
          aplicaciones:[]
      };
      for (let j=0;j<10;j++){//Generar 10 apps por categoria
          let aplicacion = {
              codigo:contador,
              nombre:"App "+contador,
              descripcion:textosDePrueba[Math.floor(Math.random() * (5 - 1))],
              icono:`img/app-icons/${contador}.webp`,
              instalada:contador%3==0?true:false,
              app:"app/demo.apk",
              calificacion:Math.floor(Math.random() * (5 - 1)) + 1,
              descargas:1000,
              desarrollador:`Desarrollador ${(i+1)*(j+1)}`,
              imagenes:["img/app-screenshots/1.webp","img/app-screenshots/2.webp","img/app-screenshots/3.webp"],
              comentarios:[
                  {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Juan"},
                  {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Pedro"},
                  {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Maria"},
              ]
          };
          contador++;
          categoria.aplicaciones.push(aplicacion);
      }
      categorias.push(categoria);
  }
  
  //console.log(categorias);
  bdlocalStorage();
  cargarCategoria();
  
})();


function bdlocalStorage(){
  var localStorage = window.localStorage;
  localStorage.setItem('appstore', JSON.stringify(categorias));
  if (localStorage.getItem('appstore')== null) {
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
 let valueCategoria=0;
 cargarAPPS(valueCategoria);
}

//llenar apps
$("#categoria").on("change", function () {
 valueCategoria = document.getElementById("categoria").value;
 cargarAPPS(valueCategoria);
});

function  cargarAPPS(valueCategoria) {
 $("#app").html(" ");

 for (let i = 0; i < categorias1.length; i++) {
 	if (i==valueCategoria) {
 		for (let j = 0; j < categorias1[i].aplicaciones.length ; j++) {

      let estrellas='';
      let contEstrellas=0;
 
      contEstrellas=categorias1[i].aplicaciones[j].calificacion;
      for (let k = 0; k <contEstrellas; k++) {
        estrellas+='<i class="fas fa-star "></i>';
      } 
      for (let k = 0; k <(5-contEstrellas); k++) {
        estrellas+='<i class="far fa-star "></i>';
      } 
     
     
 			$("#app").append(
     `<div class="col-6  col-sm-3  col-md-3 col-xl-2 col-lg-2  mt-2 " data-toggle="modal" data-target="#descripcionApp">
     <div class="card tar ml-2 mr-2 mt-2">
        <img src="${categorias1[i].aplicaciones[j].icono}" class="card-img-top padImg" alt="...">
        <div class="mt-3">
          <h5 class="card-title">${categorias1[i].aplicaciones[j].nombre}</h5>
          <p>
         ${categorias1[i].aplicaciones[j].desarrollador}
          </p>
          <div class="star">${estrellas}</div>
          <h6>$100</h6>
          </div>          
      </div></div>`)
  	}		
		}
	}
}
