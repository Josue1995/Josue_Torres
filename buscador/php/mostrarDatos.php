<?php
  function Ciudades(){
    $ciudades = array();
    $c = file_get_contents("data-1.json");
    $content = json_decode($c, true);
    for ($i=0; $i < sizeof($content) ; $i++) {
      array_push($ciudades, $content[$i]['Ciudad']);
    }
    $valores = array_values(array_unique($ciudades));
    return $valores;
  }

  function Tipos()
  {
    $tipos = array();
    $c = file_get_contents("data-1.json");
    $content = json_decode($c, true);
    for ($i=0; $i < sizeof($content) ; $i++) {
      array_push($tipos, $content[$i]['Tipo']);
    }
    $valores = array_values(array_unique($tipos));
    return $valores;
  }

 ?>
