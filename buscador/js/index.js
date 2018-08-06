/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();
playVideoOnScroll();

function listar() {
  $("#mostrarTodos").on('click', function () {
    $.ajax({
      url : './data-1.json',
      type : 'GET',
      data : {},
      async : true,
    }).done(function (data) {
      $("#mostrarTodos").hide();
      var div = $(".tituloContenido");
      var array = data;
      $(".tituloContenido").append("<button id='Ocultar' class='btn-flat waves-effect'>Ocultar Todos</button>")
      for (var i = 0; i < array.length; i++) {
        $(div).append("<div class='datos'>"+"<span class='card-title'>"+"Direcciòn: "+array[i].Direccion+"</span>"+
          "<p>"+"Ciudad: "+array[i].Ciudad+"</p><br/><p>"+"Telefono: "+array[i].Telefono+"</p><br/>"+"<p>"+"Codigo postal: "+array[i].Codigo_Postal+"</p><br/>"+
          "<p>"+"Tipo: "+array[i].Tipo+"</p><br/>"+"<p>"+"Precio: "+array[i].Precio+"</p>"+
          "</div>");
      }

    }).fail(function (data) {
      window.alert("ocurriò un error");
    }).always(function () {
      $("#Ocultar").on('click', function () {
        $(".datos").remove();
        $("#Ocultar").remove()
        $("#mostrarTodos").show();
      });
    });
  });

}

listar();

function busqueda() {
  var c = $("#selectCiudad").val();
  var t = $("#selectTipo").val();
  var r = $("#rangoPrecio").val();

  $("#formulario").on('click', function (event) {
    event.preventDefault();
    $.ajax({
      url : './php/buscador.php',
      type : 'POST',
      data : {'ciudad':c, 'tipo':t, 'precio':r},
      async : true,
      beforeSend : function () {
        $(".datos").remove();
      },
      success : function (data) {
        var response = JSON.parse(data);
        var div = $(".tituloContenido");
        for (var i = 0; i < response.length; i++) {
          $(div).append("<div class='datos'>"+"<span class='card-title'>"+"Direcciòn: "+response[i].Direccion+"</span>"+
            "<p>"+"Ciudad: "+response[i].Ciudad+"</p><br/><p>"+"Telefono: "+response[i].Telefono+"</p><br/>"+"<p>"+"Codigo postal: "+response[i].Codigo_Postal+"</p><br/>"+
            "<p>"+"Tipo: "+response[i].Tipo+"</p><br/>"+"<p>"+"Precio: "+response[i].Precio+"</p>"+
            "</div>");
        }
      }
    })
  });

}
