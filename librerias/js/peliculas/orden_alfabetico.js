$(document).ready(function () {
  OrdenAlfabetico();

  $(".select_search").formSelect();
  $(".btn-buscar").click(function () {
    let select_value = $(".select_search").val();
    let input_value = $(".input-value").val();

    OrdenAlfabetico(select_value, input_value);
  });
});

function OrdenAlfabetico(letra = "", titulo = "") {
  if (letra == "" && titulo == "") {
    console.log("todos los datos");
  } else if (letra.length > 0 && titulo == "") {
    console.log("peliculas que comienzan con " + letra);
  } else if (letra.length > 0 && titulo.length > 0) {
    console.log(
      "peliculas que comienzan con " +
        letra +
        " y que contengan el titulo: " +
        titulo
    );
  }
}
