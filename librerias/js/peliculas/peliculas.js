// Función para crear un Card con la informacion general de una pelicula
function Card(objeto) {
  return `
          <div class="col s6 m6">
            <div class="card blue-grey darken-4 item-pelicula" id="${objeto.id}">
              <div class="card-image">
                <img src="${objeto.poster}" alt="${objeto.titulo} Poster" class="img-card">
              </div>
              <div class="card-content waves-effect waves-light">
                <span class="card-title">${objeto.titulo}</span>
              </div>
            </div>
          </div>
        `;
}

// Función para mostrar los datos de la pagina actual
function InitPeliculas(datos, pagina, elementosPorPagina) {
  const moviesContainer = $("#movies-container");
  moviesContainer.empty();
  var indiceInicial = (pagina - 1) * elementosPorPagina;
  var indiceFinal = indiceInicial + elementosPorPagina;
  var datosPorPagina = datos.slice(indiceInicial, indiceFinal);

  const movieCards = datosPorPagina.map(function (movie) {
    var element = Card(movie);
    moviesContainer.append(element);
  });
}

function Paginacion(datos, paginaActual, elementosPorPagina) {
  // Agregar los botones de navegación de la paginación
  var contenedorBotones = $("#paginacion");
  var numeroDePaginas = Math.ceil(datos.length / elementosPorPagina);

  for (var i = 1; i <= numeroDePaginas; i++) {
    var boton = $('<li class="waves-effect"><a href="#!">' + i + "</a></li>");
    boton.on("click", { pagina: i }, function (evento) {
      paginaActual = evento.data.pagina;
      InitPeliculas(paginaActual, elementosPorPagina);
    });
    contenedorBotones.append(boton);
  }
}

function desactivarFlechas(paginaActual, ultimaPagina) {
  var $pagination = $(".pagination");
  var $first = $pagination.find("li:first-of-type");
  var $last = $pagination.find("li:last-child");

  if (paginaActual === 1) {
    $first.addClass("disabled");
    $last.removeClass("disabled");
  } else if (paginaActual !== 1) {
    $first.removeClass("disabled");
  }
  if (paginaActual === ultimaPagina) {
    $last.addClass("disabled");
    $first.removeClass("disabled");
  } else if (paginaActual !== ultimaPagina) {
    $last.removeClass("disabled");
  }
}

$(document).ready(() => {
  const peliculas = datos.peliculas;
  // Variables para controlar la paginación
  var paginaActual = 1;
  var elementosPorPagina = 4;
  InitPeliculas(peliculas, paginaActual, elementosPorPagina);

  $(".item-pelicula").click(function () {
    var id = $(this).attr("id");
    console.log("El ID es: " + id);
  });

  var ultimaPagina = Math.ceil(peliculas.length / elementosPorPagina);

  //Mostrar Paginación
  $("#paginacion").materializePagination({
    align: "center",
    lastPage: ultimaPagina,
    firstPage: 1,
    useUrlParameter: false,
    onClickCallback: function (requestedPage) {
      paginaActual = requestedPage;
      InitPeliculas(peliculas, paginaActual, elementosPorPagina);

      $(".item-pelicula").click(function () {
        var id = $(this).attr("id");
        console.log("El ID es: " + id);
      });

      desactivarFlechas(paginaActual, ultimaPagina);

      console.log("Requested page is " + requestedPage);
    },
  });

  desactivarFlechas(1, ultimaPagina);
});
