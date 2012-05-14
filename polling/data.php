<?php
set_time_limit(0);

$archivo='data.txt';

$ultima_mod=isset($_GET['timeserver']) ? $_GET['timeserver'] : 0;
$mod_actual=filemtime($archivo);

while($mod_actual<=$ultima_mod){
	usleep(1);
	clearstatcache();
	$mod_actual=filemtime($archivo);
}

$respuesta=array();
$respuesta['datos']=nl2br(strip_tags(stripslashes(file_get_contents($archivo)),'<a><b>'));
$respuesta['timeserver']=$mod_actual;

echo json_encode($respuesta);
?>