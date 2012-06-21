<?php

$templates = array(
	//path => /index
	//contents => <html>
	array(
		"path" => "/test",
		"contents" => "<li><%= name %></li>"
	),
	array(
		"path" => "/login",
		"contents" => "<a><%= test %></a>"
	)
);

echo json_encode($templates, JSON_FORCE_OBJECT);

?>