<?php

$archivo = 'data.txt';
$f = fopen($archivo, 'a');

$string = $_GET['s'].PHP_EOL;

fwrite($f, $string);

fclose($f);

?>