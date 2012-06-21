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
		"contents" => '
			<div id="login">
				<form>
					<p>
						<label for="email">Email: </label>
						<input type="text" placeholder="me@example.com" id="email" />
					</p>
					<p>
						<label for="pass">Password: </label>
						<input type="password" value="1234567" id="pass" />
					</p>
					<p>
						<input type="submit" value="Login" />
					</p>
				</form>
			</div>
		'
	)
);

echo json_encode($templates, JSON_FORCE_OBJECT);

?>