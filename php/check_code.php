<?php
/**
 * Project Name: Guess The Secret Code Game
 * GitHub: https://github.com/rencamp/gtsc
 * Demo: http://reneecampanilla.com/gtsc/
 * Description: This is a simple project about guessing the secret code using HTML, CSS, JS, and PHP
 * Version: 1
 * Author: Renee Campanilla
 * Author URI: http://reneecampanilla.com
 * License: GPL2
 * Developers are free to use and modify this project
 */

/*Generate new code if cookie is not set*/
if(!isset($_COOKIE['secretcode'])){

	$response = file_get_contents('http://www.randomtext.me/api/lorem/p/4-5');
	$json = json_decode($response,true);
	$strings = str_replace(".</p>", '', $json['text_out']);
	$strings = explode('<p>', $strings);
	$code = array_pop($strings); //removes empty first element
	setcookie('secretcode', $code, time() + (86400 * 30), "/");
}

$secretcode = $_COOKIE['secretcode'];
// $secretcode = "Grumpy Wizards make toxic brew for the Evil Queen and Jack"; //Change this to whatever code you desire
$code_array = str_split($secretcode); //split the string

//Declare the code map, this will contain the status of each letter. 
//If user guessed the letter correctly, 
//the status will be marked 'got_it' and empty if failed.
$code_map = array();

//this for-loop generates the structure for the code_map
for ($a=0; $a < count($code_array); $a++) { 
	$code_map[] = array(
					'letter' => $code_array[$a],
					'status' => ''
				);
}

if ( isset($_POST['letters']) && !empty($_POST['letters']) ) {

	//Retrieves the letters in the hidden input tag
	$letters = ((isset($_POST['letters'])&&!empty($_POST['letters']))?$_POST['letters']:"");

	//Splits the letters for checking
	$letters_array = explode(",", $letters);

	//Checks the code map and the letters provided by the user
	for ( $x = 0; $x < count($letters_array); $x++ ) {
		if ( in_array($letters_array[$x], $code_array) ) {
			for ( $y = 0; $y < count($code_map); $y++ ) {
				if ( $letters_array[$x] == $code_map[$y]['letter'] ) {
					//Status for that letter will be marked as 'got_it' if letters are matched
					$code_map[$y]['status'] = "got_it";
				}
			}
		}
	}

	$result = "";
	//This for-loop prepares the result based from the code_map
	for ( $z = 0; $z < count($code_map); $z++ ) {
		if ( $code_map[$z]['status'] == 'got_it' ) {
			//Letter will be displayed if status is got_it

			$result .= $code_map[$z]['letter'];
		} 

		else {

			//A dash will be displayed if status is empty
			$result .=  preg_match('/\s/', $code_map[$z]['letter']) ? " " : "-";
		}
	}

	//Returns the formatted/prepared string
	echo $result;
}

?>