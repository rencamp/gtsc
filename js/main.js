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

$(document).ready(function(){

  $('#submit_button').click(function(){
    var letter = $('#secretcode_input').val(); //gets user input
    var current_result = $('#letters').val(); //gets letters used from the hidden input tag
    current_result = current_result + "," + letter; //appends new letter to current result list
    $('#secretcode_input').val(""); //sets the user input to empty

    //calls the php file to check if the user input has a match
    $.ajax({
      method: "POST",
      url: "php/check_code.php",
      data: { letters: current_result }
    })
      .done(function( msg ) { //the variable msg holds the returned string from the php file
        if ( msg ) {
          $('#result').text(msg);//displays the result

          //updates the letters used for the hidden input tag
          $('#letters').val($('#letters').val() + "," + letter);

          //Replaces " " to "space"
          if ( letter == " " ) {
            letter = "space";
          }

          //appends the user input to "Letters used:"
          if (letter) {
            $('#letters_used').append('<span class="btn btn-info">' + letter + '</span>');
          }
        }
      });
  });
});