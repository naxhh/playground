<?php
//secureity mode on!
echo json_encode( array(
	'id' => 1,
	'nick' => 'nax',
	'email' => 'nax_hh@hotmail.com',
	'admin' => true,
	'logged' => true

), JSON_FORCE_OBJECT);