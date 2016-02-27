<?php
/*Generate new secret code if cookie is not set*/
if(!isset($_COOKIE['secretcode'])){

	$response = file_get_contents('http://www.randomtext.me/api/lorem/p/4-5');
	$json = json_decode($response,true);
	$strings = str_replace(".</p>", '', $json['text_out']);
	$strings = explode('<p>', $strings);
	$code = array_pop($strings); //removes empty first element
	setcookie('secretcode', $code, time() + (86400 * 30), "/");
}
?>