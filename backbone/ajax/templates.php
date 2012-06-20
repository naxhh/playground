<?php

$templates = array(
	//path => /index
	//contents => <html>
	array(
		"path" => "/index",
		"contents" => "a"
	),
	array(
		"path" => "/index2",
		"contents" => "a"
	)
);

#echo json_encode($templates, JSON_FORCE_OBJECT);

?>
{{"path":"\/index","contents":"a"},{"path":"\/index2","contents":"a"}}