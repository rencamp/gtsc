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

  var used_letters = [];

  $('#submit_button').click(function(){
    var letter = $('#secretcode_input').val(); //gets user input
    var current_result = $('#letters').val(); //gets letters used from the hidden input tag
    current_result = current_result + "," + letter; //appends new letter to current result list
    $('#secretcode_input').val(""); //sets the user input to empty

    //Verify if the user inputted the letter
    var itContains = $.inArray(letter, used_letters) > -1;

    //calls the php file to check if the user input has a match
    $.ajax({
      method: "POST",
      url: "php/check_code.php",
      data: { letters: current_result },
    })
      .done(function( msg ) { //the variable msg holds the returned string from the php file
        if ( msg ) {
          $('#result').text(msg);//displays the result

          //updates the letters used for the hidden input tag
          $('#letters').val($('#letters').val() + "," + letter);

         
          //appends the user input to "Letters used:"
          if (letter) {

            //Added verification to ensure that the letter is not appended again on the page
            if (!itContains) {
              used_letters.push(letter);
              $('#letters_used').append('<span class="btn btn-info">' + letter + '</span>');
            }
          }

          if (msg.localeCompare($.cookie("secretcode")) > 0) {
            alert('You have successfully guessed the word!');
            $.removeCookie('secretcode', { path: '/' });
            location.reload(true); //parameter is necessary to reload from server, and not from cache.
          }


        }
      });
  });

  
  $("#secretcode_input").keypress(function (e){
      // Check if the user pressed "enter" button with keycode 13
      if(e.which == 13){
        $(this).blur();
        $("#submit_button").focus().click();
        $(this).focus();
      }
  });
});