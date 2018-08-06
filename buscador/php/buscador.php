<?php
  $_ciudad = $_POST["ciudad"];
  $_tipo = $_POST["tipo"];
  $_precio = $_POST["precio"];
  $k = 0;
  $busqueda = array();
  $price1 = "$";
  $price2 = "$";
  while ($_precio[$k] != ';') {
    $price1 = $price1.$_precio[$k];
    $k=$k + 1 ;
  }
  $k= $k+1;
  while ($k < strlen($_precio)){
    $price2 = $price2.$_precio[$k];
    $k=$k + 1 ;
  }

  $datos = file_get_contents('../data-1.json');
  $data = json_decode($datos, true);
  for ($i=0; $i < sizeof($data); $i++) {
     if($_ciudad == "Elige una ciudad" && $_tipo == "Elige un tipo" && $data[$i]['Precio'] >= $price1 && $data[$i]['Precio'] <= $price2){
       array_push($busqueda, $data[$i]);
     }elseif ($data[$i]['Ciudad'] == $_ciudad && $_tipo == "Elige un tipo" && $data[$i]['Precio'] >= $price1 && $data[$i]['Precio'] <= $price2) {
       array_push($busqueda, $data[$i]);
     }elseif ($_ciudad == "Elige una ciudad" && $data[$i]['Tipo'] == $_tipo && $data[$i]['Precio'] >= $price1 && $data[$i]['Precio'] <= $price2) {
       array_push($busqueda, $data[$i]);
     }elseif ($data[$i]['Ciudad'] == $_ciudad && $data[$i]['Tipo'] == $_tipo && $data[$i]['Precio'] >= $price1 && $data[$i]['Precio'] <= $price2) {
       array_push($busqueda, $data[$i]);
     }else {

     }

  }

  echo json_encode($busqueda);
 ?>
