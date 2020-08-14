
//Author:Patrick Dunlap
//Date: 8/11/2020

$( document ).ready(function() {
  load_pieces();        // Make the default pieces .
  load_scrabble_pieces();     // Make 7 random pieces.
  load_droppable_targets();   // Load up the droppable targers
  fill_in_table();            // Add the special icons.
});



//This function is for determining the current word
function find_word(read_left) {
  var word = "";            // The current word.
  var current_score = 0;        // create the current score and start it at 0
  var saved_score = word_score;       // Saved score from previous words.
  var board_length = game_board.length;       
  var word_count = complete_words.length;    

  // The word is now blank.
  $("#word").html("____");
  $("#score").html(saved_score);    // Technically this starts at 0, then adds up to whatever the saved score is.

  // Go through the game board and generate a possible word.
  for(var i = 0; i < board_length; i++) {
    word += find_letter(game_board[i].tile);
    current_score += find_score(game_board[i].tile);
  }

 //factors in doubling
  current_score += (current_score * word_multiplier());

  //keep track of the current score
  saved_score += current_score;

  // Put the score of the dropped tile into the HTML doc.
  $("#score").html(saved_score);

  // If the word is not empty, show it on the screen!
  if(word != "") {
    $("#word").html(word);
    return;
  }

  // Otherwise the word is now blank.
  $("#word").html("____");
}


//1 is double and 2 is triple
function word_multiplier() {
  // Get board array length. This will be useful for our checks next.
  var gameboard_length = game_board.length;

  // Go through the game board and see if any spots have the
  // class "double_word" or "triple_word"
  for (var i = 0; i < gameboard_length; i++) {
    var space_ID = "#" + game_board[i].id

    if ( $(space_ID).hasClass('double_word') == true ) {
      // Sweet! Double the word's value!
      return 1;
    }
    else if ( $(space_ID).hasClass('triple_word') == true ) {
      // SWEET! IT'S A TRIPLE!
      return 2;
    }
  }

  // Otherwise return 0.
  return 0;
}


function find_score(given_id) {
  // First figure out which letter we have.
  var letter = find_letter(given_id);
  var score = 0;

  for(var i = 0; i < 27; i++) {
    // Get an object to look at.
    var obj = pieces[i];

    // See if this is the right object.
    if(obj.letter == letter) {
      score = obj.value;

      // Need to determine if this piece is a DOUBLE or not.
      // Droppable zones 6 & 8 are DOUBLE letter scores.
      var extra = score * letter_multiplier(given_id);
      score = score + extra;

      return score;
    }
  }

  // If we get here, then we weren't given a nice valid letter. >:(
  return -1;
}


//This is used to figure out what the multiplier on a letter is
function letter_multiplier(given_id) {
  var space;

  for(var i = 0; i < game_board.length; i++) {
    if(game_board[i].tile == given_id){
      space = "#" + game_board[i].id;
    }
  }

  //look for triple spaces
  if ( $(space).hasClass("double_letter") == true ) {
    return 1;
  }
  else if ( $(space).hasClass("triple_letter") == true ) {
    
    return 2;
  }

  // Otherwise return 1.
  return 0;
}



 /* Source used: https://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
*    This function gets the row / col index for given droppableID
*/
function find_table_position(droppableID) {

// Figure out the row / col
// URL: https://stackoverflow.com/questions/96428/how-do-i-split-a-string-breaking-at-a-particular-character
var test = String(droppableID).split('_');
var row = String(test[0]).split('row');
row = row[1];
var col = String(test[1]).split('col');
col = col[1];

var arry = [];      // Save the row / col in an array, so that we can return both at once.
arry.push(row);
arry.push(col);

// Return the row / col in an array.
return arry;
}


//Will return the id of a number
function find_letter(given_id) {

// Go through the 7 pieces,
for(var i = 0; i < 7; i++) {
  // If we found the piece we're looking for, awesome!
  if(game_tiles[i].id == given_id) {
    // Just return its letter!
    return game_tiles[i].letter;
  }
}

// Or try looking in the completed word array
for(var i = 0; i < complete_words.length; i++) {
  for(var x = 0; x < complete_words[i].length; x++) {
    if(given_id == complete_words[i][x].id) {
      return complete_words[i][x].letter;
    }
  }
}

// If we get here, we weren't given a nice draggable ID like "piece1", so return -1
return -1;
}


//This function is used for creating a new random tile
function get_random_tile() {

var all_letters = [];
var total_letters = 0;

for (var i = 0; i < 26; i++) {
  var current_letter = pieces[i].letter;    
  var remaining = pieces[i].remaining;     
  total_letters += remaining;               

  for (var x = 0; x < remaining; x++) {
    all_letters.push(current_letter);       // Add "remaining" number of the current letter to the array.
  }
}

// Pick a random number and return that letter.
var random_num = getRandomInt(0, total_letters - 1);   // Off by one error if we don't subtract. 0 to 100 is bad. Want 0 to 99.
var letter = all_letters[random_num];       // Save the letter.

// Find the letter to decrement.
for (var i = 0; i < 26; i++) {
  if (pieces[i].letter == letter) {
    pieces[i].remaining--;                  // Decrement letter remaining for this letter.
    return letter;                          // Return the letter's index.
  }
}

// Error if we get here.
return -1;
}




// This table was one of the things I was helped with by a friend who was a previous student
function load_pieces() {
pieces = [
  {"letter":"A", "value":  1,  "amount":  9,  "remaining":  9},
  {"letter":"B", "value":  3,  "amount":  2,  "remaining":  2},
  {"letter":"C", "value":  3,  "amount":  2,  "remaining":  2},
  {"letter":"D", "value":  2,  "amount":  4,  "remaining":  4},
  {"letter":"E", "value":  1,  "amount": 12,  "remaining": 12},
  {"letter":"F", "value":  4,  "amount":  2,  "remaining":  2},
  {"letter":"G", "value":  2,  "amount":  3,  "remaining":  3},
  {"letter":"H", "value":  4,  "amount":  2,  "remaining":  2},
  {"letter":"I", "value":  1,  "amount":  9,  "remaining":  9},
  {"letter":"J", "value":  8,  "amount":  1,  "remaining":  1},
  {"letter":"K", "value":  5,  "amount":  1,  "remaining":  1},
  {"letter":"L", "value":  1,  "amount":  4,  "remaining":  4},
  {"letter":"M", "value":  3,  "amount":  2,  "remaining":  2},
  {"letter":"N", "value":  1,  "amount":  6,  "remaining":  6},
  {"letter":"O", "value":  1,  "amount":  8,  "remaining":  8},
  {"letter":"P", "value":  3,  "amount":  2,  "remaining":  2},
  {"letter":"Q", "value": 10,  "amount":  1,  "remaining":  1},
  {"letter":"R", "value":  1,  "amount":  6,  "remaining":  6},
  {"letter":"S", "value":  1,  "amount":  4,  "remaining":  4},
  {"letter":"T", "value":  1,  "amount":  6,  "remaining":  6},
  {"letter":"U", "value":  1,  "amount":  4,  "remaining":  4},
  {"letter":"V", "value":  4,  "amount":  2,  "remaining":  2},
  {"letter":"W", "value":  4,  "amount":  2,  "remaining":  2},
  {"letter":"X", "value":  8,  "amount":  1,  "remaining":  1},
  {"letter":"Y", "value":  4,  "amount":  2,  "remaining":  2},
  {"letter":"Z", "value": 10,  "amount":  1,  "remaining":  1},
  {"letter":"_", "value":  0,  "amount":  0,  "remaining":  0}    
];                                                                
}


//source: https://stackoverflow.com/questions/3065342/how-do-i-iterate-through-table-rows-and-cells-in-javascript
function fill_in_table() {
var row = 0;
var col = 0;


$('#scrabble_board tr').each(function() {
  col = 0;
  $(this).find('td').each(function() {

    $(this).attr('id', 'row' + row + '_' + 'col' + col);
    col++;

  });
  row++;
});
}



//This function is used to make sure the word is valid
function submit_word() {
  // Call find_word to update the word.
  find_word();

  var word = $("#word").html();

  // The user needs to play a tile first...
  if (word == "____") {
    // The user isn't so smart. Tell them to try again.
    $("#messages").html("<br><div class='highlight_centered_error'> \
    There is not a currently a word on the board</div>");
    return -1;
  }

  // Make sure the word is lower cased or it might not be found in the dictionary!
  word = word.toLowerCase();


  // Let's see if our word is in the dictionary.
  if ( dict[ word ] ) {
    $("#messages").html("<br><div class='highlight_centered_success'> \
    Nice job! \"" + word + "is a good word!\" <br><br> \
    <button class='smaller_button' onclick='save_word();'>Continue?.</button><br><br></div>");
    return 1;
  }
  else {
    $("#messages").html("<br><div class='highlight_centered_error'> \
    Sorry. \"" + word + "\" is not a valid word. \ </div>");
    return -1;
  }

}




//save the currently used word
function save_word() {
  var game_board_length = game_board.length;      // Get gameboard array length
  var word;                                       // array for the current word
  var index = 0;

  // Let the user know what's going on.
  $("#messages").html("<br><div class='highlight_centered_success'> \
  SAVING WORD.</div>");

  // Move the game board array into the compete_words array.
  // First make an array and save everything in the game array into it.
  word = [];

  // Save everything in the game area into this new array.
  for(var i = 0; i < game_board_length; i++) {

    var obj = {};
    obj["id"] = game_board[i].id;
    obj["letter"] = find_letter(game_board[i].tile);
    var tile_ID = game_board[i].tile;

    word.push(obj);   // Push object back.

    $("#" + obj["id"]).droppable('disable');

    // Make the draggable disabled too so that the user can't drag the tile back to the rack.
    try {
      $("#" + tile_ID).draggable('disable');

      // Also change the id of the tile so it doesn't get recalled either.
      // use the game board length and current letter to make each disabled tile have a unique id.
      $("#" + tile_ID).attr("id", "disabled" + (i + complete_words.length) );  // start at 0, add length to make unique

      // Generate a new letter to be used.
      var new_letter = get_random_tile();

      // Change the game tiles array to reflect the new letter.
      for(var x = 0; x < 7; x++) {
        if(game_tiles[x].id == tile_ID) {
          index = x;  // index for the new piece.
          game_tiles[x].letter = new_letter;
        }
      }

      // Used in the next part, to create a new tile.
      var base_URL = "img/scrabble/Scrabble_Tile_";

      // Create a new draggable object with the new letter and ID of the old one.
      var new_piece = "<img class='pieces' id='piece" + index + "' src='" + base_URL + new_letter + ".jpg" + "'></img>";

      // Append to the rack.
      $("#rack").append(new_piece);

      // Make the piece draggable.
      $("#piece" + index).draggable({
        appendTo: scrabble_board,
        revert: "invalid",            // This is key. Only the rack and game board are considered valid!
        start: function(ev, ui) {
          // Save original position. (used for swapping tiles)
          startPos = ui.helper.position();
        },
        stop: function() {
          // If an invalid event is found, this will return the draggable object to its
          // default "invalid" option. From this Stackoverflow post (also used in the droppable part.)
          $(this).draggable('option','revert','invalid');
        }
      });
    }
    catch(e) {
      // the above code might fail on multiple words.
      // if so just ignore it.
    }
  }

  // Save the current word score. This will become the total score now.
  word_score = parseInt($("#score").html());  // Save it as an int.

  // Save the given word in the complete_words array
  complete_words.push(word);

  // Now that we've saved the game board array, let's empty it.
  game_board = [];

  // Reset all the Scrabble tiles
  reset_tiles();

  // And update the word / score as well.
  find_word();

  return;
}



//puts all the tiles back on the rack
function reset_tiles() {

  // Load up the 7 pieces and move them back to the game rack.
  for(var i = 0; i < 7; i++) {
    var piece_ID = "#piece" + i;

    // Reposition the tile on top of the rack, nicely in a row with the other tiles.

   
    var pos = $("#the_rack").position();

  

    var img_left = pos.left + 30 + (50 * i);      // This controls left to right placement.
    var img_top = pos.top + 30;                   // This controls top to bottom placement.

    // 
    $(piece_ID).css("left", img_left).css("top", img_top).css("position", "absolute");

    $('#rack').append($(piece_ID));
  }

  // Now delete everything in the game board array. Do this by just emptying the array.
  game_board = [];

  // Reset the used letters counter.
  used_letters = 0;

  // Update the word that is displayed.
  find_word();

  return;
}




 //reset the entire game state
function reset_game_board() {
  var word_count = complete_words.length;

  // First clear the game board array.
  game_board = [];    // Easy way of doing this.
  // URL for more ways of doing this: https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript

  // Now reset the pieces array.
  load_pieces();

  // Set the score back to zero.
  word_score = 0;

  // Reset the used letters counter.
  used_letters = 0;

  // Remove all the scrabble tiles in the rack.
  for(var i = 0; i < 7; i++) {
    var tileID = '#' + game_tiles[i].id;
    $(tileID).draggable("destroy");    // Destroys the draggable element.
    $(tileID).remove();                // Removes the tile from the page.
    // URL for more info: https://stackoverflow.com/questions/11452677/jqueryui-properly-removing-a-draggable-element
  }

  // Remove all the scrabble tiles on the game board.
  for(var i = 0; i < word_count; i++) {
    // Get the individual spaces to remove.
    for(var x = 0; x < complete_words[i].length; x++) {
      var space = complete_words[i][x].id;

      // Make the space droppable again.
      $("#" + space).droppable("enable");

      // Remove the tile attached to the space.
      $("#disabled" + (i + x)).remove();    // The i + x will access all of them, since i starts at 0.
    }
  }

  // Clear the complete word array.
  complete_words = [];

  // Load up some new Scrabble pieces!
  load_scrabble_pieces();

  // Resets the HTML "Word: " and "Score: " display.
  find_word();    // Technically this returns -1 and just wipes the display clean.

  

  return;
}





var pieces = [];


var game_board = [
  // Example of what WOULD be in this array. An obj with "id" of the dropable spot and the tile that was dropped.
  //{"id": "drop0",  "tile": "pieceX"},
];

// JavaScript array to keep track of past words
var complete_words = [

];

// JavaScript array of objects to determine what letter each piece is.
// This gets configured by load_scrabble_pieces()
var game_tiles = [
  {"id": "piece0", "letter": "A"},
  {"id": "piece1", "letter": "B"},
  {"id": "piece2", "letter": "C"},
  {"id": "piece3", "letter": "D"},
  {"id": "piece4", "letter": "E"},
  {"id": "piece5", "letter": "F"},
  {"id": "piece6", "letter": "G"}
];

// Boolean for reading left to right or top to bottom
var left_right = false;

// For detecting multiple words played
// TODO: is this being used?
var number_of_words = 0;

// Used for getting the original position of a draggable object.
// As seen here: https://stackoverflow.com/questions/12350259/original-position-of-a-draggable-in-jquery-ui
var startPos;

// source code: http://ejohn.org/blog/dictionary-lookups-in-javascript/

var dict = {};

// URL: http://linuxcommando.blogspot.com/2008/05/how-to-convert-text-files-to-all-upper.html
$.get( "files/dictionary.txt", function( txt ) {
    // Get an array of all the words
    var words = txt.split( "\n" );

    // And add them as properties to the dictionary lookup
    // This will allow for fast lookups later
    for ( var i = 0; i < words.length; i++ ) {
        dict[ words[i] ] = true;
    }
});

// Save the score of all the words saved. Only updates when a word is saved, which allows
// the scoring function (find_word()) to work properly.
var word_score = 0;

// First letter for 2nd and on words played.
var first_letter = "";

// Keep track of the letters of used words. This is handy for tracking adding an "S" to
// a currently created word "hope" - if we had an S, then we have 5 letters. If we remove an
// S, we have 4 letters that need to be removed.
var used_letters = 0;





 //this fuction will load the pieces on the rack
function load_scrabble_pieces() {
  var base_url = "img/scrabble/Scrabble_Tile_";     // base URL of the image
  var random_letter = "";            // Random letter for the tile
  var piece = "";           // HTML for the current tile (image tag)
  var piece_ID = "";          // ID for the current tile. In the form "piece#" where # is between 0 and 6.
  var pos;                    // Position of the rack.
  var img_left, img_top;       // Used to set the tile's position, based on the position of the rack (pos)

  // Load up 7 pieces
  for(var i = 0; i < 7; i++) {
    // This gets a random letter (letter's index in the array).
    random_letter = get_random_tile();

    // Make the img HTML and img ID so we can easily append the tiles.
    piece = "<img class='pieces' id='piece" + i + "' src='" + base_url + random_letter + ".jpg" + "'></img>";
    piece_ID = "#piece" + i;
    game_tiles[i].letter = random_letter;

    // Reposition the tile on top of the rack, nicely in a row with the other tiles.

    // We first get the rack's location on the screen. Idea from a Stackoverflow post,
    // URL: https://stackoverflow.com/questions/885144/how-to-get-current-position-of-an-image-in-jquery
    pos = $("#the_rack").position();

    // Now figure out where to reposition the board piece.
    img_left = pos.left + 30 + (50 * i);      // This controls left to right placement.
    img_top = pos.top + 30;                   // This controls top to bottom placement.

    /* Load onto the page and make draggable.
       The height / width get set using these tricks:
       https://stackoverflow.com/questions/10863658/load-image-with-jquery-and-append-it-to-the-dom
       https://stackoverflow.com/questions/2183863/how-to-set-height-width-to-image-using-jquery
       https://stackoverflow.com/questions/9704087/jquery-add-image-at-specific-co-ordinates

       The relative stuff came from this w3schools page. I realized I could set the top and left
       relative to the rack (and the board for the droppable targets), which makes things wayyyyy
       easier. URL: http://www.w3schools.com/css/css_positioning.asp
    */
    // Add the piece to the screen
    $("#rack").append(piece);

    // Move the piece relative to where the rack is located on the screen.
    $(piece_ID).css("left", img_left).css("top", img_top).css("position", "absolute");

    // Make the piece draggable.
    $(piece_ID).draggable({
      appendTo: scrabble_board,
      revert: "invalid",            // This is key. Only the rack and game board are considered valid!
      start: function(ev, ui) {
        // Save original position. (used for swapping tiles)
        startPos = ui.helper.position();  // startPos is a global variable found in variables.js
      },
      stop: function() {
        // If an invalid event is found, this will return the draggable object to its
        // default "invalid" option. From this Stackoverflow post (also used in the droppable part.)
        $(this).draggable('option','revert','invalid');
      }
    });
  }
}



/**
 *    This function will create the "targets" the will be loaded onto
 *
 */


function load_droppable_targets() {


  $("#get_new_tile").droppable( {
    accept: ".ui-draggable",
    appendTo: "body",
    drop: function(event, ui) {
      var draggableID = ui.draggable.attr("id");
      var droppableID = $(this).attr("id");
      

      // Update the tile piece with the new image.
      // The idea came from this post on Stackoverflow:
      // https://stackoverflow.com/questions/554273/changing-the-image-source-using-jquery
      // I had to modify this to work on different IDs, as simply "draggableID" did nothing.
      $("#" + draggableID).attr("src", "img/scrabble/Scrabble_Tile_" + new_letter + ".jpg");

      // Place the tile back where it came from, either the rack or the game board.
      var posX = startPos.left;
      var posY = startPos.top;

      // Move the draggable image so it doesn't fly around randomly like to the bottom of the screen or whatever.
      ui.draggable.css("left", posX);
      ui.draggable.css("top", posY);
      ui.draggable.css("position", "absolute");

      // Update the letter's remaining table

      // Update the word as well, in case the user changed the word.
      find_word();
    } 

  });



  /**
   *      Rack logic. Positions the rack on page load.
   *      Recalling the tiles is handled by the reset_tiles function.
   *      Positioning is done using the ui.helper.position method which the jQuery UI provides.
   *
   */
  $("#the_rack").droppable( {
    accept: ".ui-draggable",
    appendTo: "body",
    drop: function(event, ui) {
      var draggableID = ui.draggable.attr("id");
      var droppableID = $(this).attr("id");

      // Get board array length. This will be useful for our checks next.
      var gameboard_length = game_board.length;

      // Need to check for complete words, if there's any then change some logic.
      var number_of_words = complete_words.length;

      // See if this element is in the array and at the beginning or end.
      for(var i = 0; i < gameboard_length; i++) {
        if (game_board[i].tile == draggableID) {

          // Make the spot droppable again.
          var spot_id = "#" + game_board[i].id;
          $(spot_id).droppable("enable");

          // We found it! Remove it from the game board array.
          // URL for this help: https://stackoverflow.com/questions/5767325/remove-a-particular-element-from-an-array-in-javascript
          game_board.splice(i, 1);

          find_word();            // Update the word & score.

          // This trick comes from Stackoverflow.
          // URL: https://stackoverflow.com/questions/849030/how-do-i-get-the-coordinate-position-after-using-jquery-drag-and-drop
          var currentPos = ui.helper.position();
          var posX = parseInt(currentPos.left);
          var posY = parseInt(currentPos.top);

          // Move the draggable image so it doesn't fly around randomly like to the bottom of the screen or whatever.
          ui.draggable.css("left", posX);
          ui.draggable.css("top", posY);
          ui.draggable.css("position", "absolute");

          // Move the tile over to the rack. Prevents weird bugs where the table changes sizes and thinks there's two tiles in one spot.
          $('#rack').append($(ui.draggable));

          // If there's any completed words, and we just removed the last currently played word,
          // we need to remove any disabled tiles from the word array.
          if(number_of_words > 0) {

            // See if its time to remove these letters.
            if(gameboard_length - 1 <= used_letters) {        // Yep, the length is at or below the user_letters
              // Remove disabled tiles.
              game_board.splice(0, gameboard_length);

              // Reset the used_letters counter.
              used_letters = 0;
            }
          }

          find_word();              // Update word & score.
          return;                   // Quit now.
        }
      }
    }
  });


  /**
   *    Scrabble game board logic. Allows swapping of tiles that are not saved,
   *    determines valid game moves for both one word and multiple words. One word
   *    logic works very well - multiple word logic is bound to have bugs due to
   *    the complexity of having many words on the board at once.
   *
   */
  $("#scrabble_board td").droppable({
    accept: ".ui-draggable",
    appendTo: "body",
    drop: function(event, ui) {
      // To figure out which draggable / droppable ID was activated, I used this sweet code from stackoverflow:
      // https://stackoverflow.com/questions/5562853/jquery-ui-get-id-of-droppable-element-when-dropped-an-item
      var draggableID = ui.draggable.attr("id");    // The current Scrabble tile ID
      var droppableID = $(this).attr("id");         // The current spot on the game board ID
      var duplicate = false;            // This originally meant "we've seen this tile already". I will need to use this to support swapping of tiles.
      var dup_index = 0;                // I think this was to be where in the game board array the duplicate is.
      //left_right                      // Determines if the word is read left to right, or top to bottom. (THIS IS GLOBAL, IT NEEDS TO BE FOR THE FIND_WORD FUNCTION!)
      var insert_beg = false;           // Determines if we should tiles at the beginning or the end.
      var star_spot = "row7_col7";      // Star in the middle of the board.
      var gameboard_length = 0;         // The length of the game board array (global array).
      var number_of_words = 0;          // Number of played words.
      var valid = 0;                    // Used for determining valid right angles.
      var prev_spaceID = "";            // Used for determining left/right vs up/down and also inserting at the beginning / end. And even saved letters.

      // Remove old error messages.
      $("#messages").html("");

      // Get board array length. This will be useful for our checks next.
      gameboard_length = game_board.length;

      // Also determine how many words are currently played.
      number_of_words = complete_words.length;

     

        //check to se if it is already on the board
      for (var i = 0; i < gameboard_length; i++) {
        if (game_board[i].tile == draggableID) {
          duplicate = true;       // We've got a duplicate.
          dup_index = i;          // Save the index for later.
        }
      }

      if (duplicate == true) {
          $("#messages").html("<br><div class='highlight_centered_error'> \
          Tiles that are already placed on the board cannot be moved. </div>");

          // Force the draggable to revert.
          // https://stackoverflow.com/questions/6071409/draggable-revert-if-outside-this-div-and-inside-of-other-draggables-using-both
          ui.draggable.draggable('option', 'revert', true);
          return;
      }

      if( $(this).find(".ui-draggable").length == 1 ) {
        var original_tile = $("#" + droppableID).find("img")[0].id;

        // startPos has the original position of the current droppable.
        var posX = startPos.left;
        var posY = startPos.top;

        // Set the position of the old tile.
        $("#" + original_tile).css("left", posX);
        $("#" + original_tile).css("top", posY);
        $("#" + original_tile).css("position", "absolute");

        // Move the tile over to the rack. Prevents weird bugs where the table changes sizes and thinks there's two tiles in one spot.
        $('#rack').append($("#" + original_tile));

        // Now put the new tile in the spot where the older tile was.
        // (ui.draggable refers to the current tile that we want to place on the board.)
        ui.draggable.css("top", $(this).css("top"));
        ui.draggable.css("left", $(this).css("left"));
        ui.draggable.css("position", "relative");

        // Append the new tile to the game board
        $(this).append($(ui.draggable));

        // Now update the game board array with the new letter.
        for(var i = 0; i < gameboard_length; i++) {
          if(game_board[i].tile == original_tile) {
            game_board[i].tile = draggableID;
          }
        }

        find_word();        // Update the word
        return;             // We're done so quit.
      }

      if(number_of_words == 0) {
        //*****************************************
        //* Game board is empty case.
        //* If so, the user must start at the star.
        //*****************************************
        if (gameboard_length == 0) {
          if (droppableID != star_spot) {
            /* The only valid place is the star, row7_col7 */
            $("#messages").html("<br><div class='highlight_centered_error'> \
            Please start at the star in the middle of the game board.</div>");

            // Force the draggable to revert. Idea from:
            // https://stackoverflow.com/questions/6071409/draggable-revert-if-outside-this-div-and-inside-of-other-draggables-using-both
            ui.draggable.draggable('option', 'revert', true);
            return;
          }
          else {
            $("#messages").html("");      // Remove that old error message.
          }
        }

        //*****************************************
        //* Game board length 1 case, OR moving the 2nd tile around the first tile.
        //*****************************************
        if (gameboard_length == 1 || (gameboard_length == 2 && duplicate == true) ) {


          // If we get here, we should determine what the index is of our current
          // tile. Then we can use some math to determine what moves are allowed.
          var past_pos = find_table_position(game_board[0].id);
          var cur_pos = find_table_position(droppableID);

          allowed_arrays = [
            [ parseInt(past_pos[0]) - 1, past_pos[1] ],     // these two are l / r
            [ parseInt(past_pos[0]) + 1, past_pos[1] ],
            [ past_pos[0], parseInt(past_pos[1]) - 1],     // these two are t / b
            [ past_pos[0], parseInt(past_pos[1]) + 1]
          ];

          // See if we have one of the allowed positions.
          var test = cur_pos.toString();

          if (test == allowed_arrays[0].toString() || test == allowed_arrays[1].toString() ) {
            // Yeah! And it's top to bottom!
            console.log("Allowed. T/B");
            left_right = false;

            // Need to insert at the front if we're inserting at the top.
            if (test == allowed_arrays[0].toString()) {
              console.log("Inserting at the beginning of the game board array.");
              insert_beg = true;
            }
          }
          else if (test == allowed_arrays[2].toString() || test == allowed_arrays[3].toString() ) {
            // Yep! And it's left to right too!
            console.log("Allowed. L/R");
            left_right = true;

            // Need to insert at the front if we're inserting from the left.
            if (test == allowed_arrays[2].toString()) {
              console.log("Inserting at the beginning of the game board array.");
              insert_beg = true;
            }
          }
          else {
            // Tell the user what the error was.
            $("#messages").html("<br><div class='highlight_centered_error'> \
            Sorry, diagonals are not allowed once at least one tile has been placed.</div>");

            // Force the draggable to revert. Idea from:
            // https://stackoverflow.com/questions/6071409/draggable-revert-if-outside-this-div-and-inside-of-other-draggables-using-both
            ui.draggable.draggable('option', 'revert', true);
            return;
          }

        }

        if (gameboard_length >= 2) {
          /*
              X+X
              X*X
              X*X
              X+X

              * = the first / second tiles
              + = valid space
              X = NOT VALID SPACE

              Assuming (7,7) & (8,7) are already placed,
              then two valid places are (6,7) & (9,7)
          */
          if (left_right == true) {     // **** Left and right case   ****
            // First col - 1 and last col + 1 are valid, with same row.
            var valid_left = find_table_position(game_board[0].id);
            var valid_right = find_table_position(game_board[gameboard_length - 1].id);
            var cur_pos = find_table_position(droppableID);

            // Add or subtract for the valid position.
            valid_left[1] = parseInt(valid_left[1]) - 1;
            valid_right[1] = parseInt(valid_right[1]) + 1;

            var test = cur_pos.toString();      // Test against the current position.

            // See if this is a valid move!
            if ( test == valid_left.toString() || test == valid_right.toString() ) {
              // Yes! It is allowed!
              console.log("Allowed. L/R. Game board length = " + gameboard_length);

              if( test == valid_left.toString() ) {
                insert_beg = true;
              }
            }
            else {                // Not allowed.
              // Tell the user what the error was.
              $("#messages").html("<br><div class='highlight_centered_error'> \
              Sorry, only left and right placements are allowed when 2 or more tiles are played.</div>");

              // Force the draggable to revert. Idea from:
              // https://stackoverflow.com/questions/6071409/draggable-revert-if-outside-this-div-and-inside-of-other-draggables-using-both
              ui.draggable.draggable('option', 'revert', true);
              return;
            }
          }
          else {                          // **** Top and bottom case.    *****
            // First row - 1 and last row + 1 are valid, with same col.
            var valid_top = find_table_position(game_board[0].id);
            var valid_bottom = find_table_position(game_board[gameboard_length - 1].id);
            var cur_pos = find_table_position(droppableID);

            // Add or subtract for the valid position.
            valid_top[0] = parseInt(valid_top[0]) - 1;
            valid_bottom[0] = parseInt(valid_bottom[0]) + 1;

            var test = cur_pos.toString();      // Test against the current position.

            // See if this is a valid move!
            if ( test == valid_top.toString() || test == valid_bottom.toString() ) {
              // Yes! It is allowed!
              console.log("Allowed. T/B. Game board length = " + gameboard_length);

              if (test == valid_top.toString()) {
                insert_beg = true;
              }
            }
            else {                 // Not allowed.
              // Tell the user what the error was.
              $("#messages").html("<br><div class='highlight_centered_error'> \
              Sorry, only up and down positions are allowed when 2 or more tiles are played.</div>");

              // Force the draggable to revert. Idea from:
              // https://stackoverflow.com/questions/6071409/draggable-revert-if-outside-this-div-and-inside-of-other-draggables-using-both
              ui.draggable.draggable('option', 'revert', true);
              return;
            }
          }
        }
      }
      //*************************************************************************
      //* Logic for more than one word here
      //*************************************************************************
      else {
        // Need to first determine all the possible valid moves.
        // This will be an array of IDs that are right angles around
        // the game board tiles (both saved and unsaved words)
        var possible_moves = [];

        // We will first determine valid spaces to move to around saved words.

        //************************************************************
        //* Scan COMPLETED WORDS array for possible valid placement
        //************************************************************
        for(var i = 0; i < number_of_words; i++) {
          // Get number of tiles in the current word.
          var num_tiles = complete_words[i].length;

          // Now go through the current word and grab all right angle spaces around each letter.
          // Make sure to ignore DISABLED spaces.
          for(var x = 0; x < num_tiles; x++) {
            var cur_letterID = complete_words[i][x].id;
            var coordinates = find_table_position(cur_letterID);    // Get the row / col values.

            /*
                X*X
                *+*
                X*X

                + = current position to look at
                * = valid spots, l/r = row(-1),col & row(+1),col + t/b = row,col(-1) & row,col(+1)
                X = not valid spot
            */
            // Allow both left/right & top/bottom placement.
            if(gameboard_length < 1) {
              valid = [
                "row" + (parseInt(coordinates[0]) - 1) + "_col" + coordinates[1],     // top of space
                "row" + (parseInt(coordinates[0]) + 1) + "_col" + coordinates[1],     // bottom of space
                "row" + (coordinates[0]) + "_col" + (parseInt(coordinates[1]) - 1),   // left of space
                "row" + (coordinates[0]) + "_col" + (parseInt(coordinates[1]) + 1)    // right of space
              ];
            }
            // Only allow left to right spaces.
            else if(gameboard_length >= 1 && left_right == true) {
              valid = [
                "row" + (coordinates[0]) + "_col" + (parseInt(coordinates[1]) - 1),   // left of space
                "row" + (coordinates[0]) + "_col" + (parseInt(coordinates[1]) + 1)    // right of space
              ];

              // Make sure we stay in the same row.
              var test_spaceID = game_board[0];
              var test_coord = find_table_position(test_spaceID);

              // Row is [0], so if these are the same, we're good.
              if (test_coord[0] == valid[0]) {
                // valid
              }
              // Not valid otherwise.
              else {
                valid = [];   // make it null so it won't match.
              }
            }
            // Only allow top to bottom spaces.
            else if(gameboard_length >= 1 && left_right == false) {
              valid = [
                "row" + (parseInt(coordinates[0]) - 1) + "_col" + coordinates[1],     // top of space
                "row" + (parseInt(coordinates[0]) + 1) + "_col" + coordinates[1]      // bottom of space
              ];

              // Make sure to stay in the same column.
              var test_spaceID = game_board[0];
              var test_coord = find_table_position(test_spaceID);

              // Col is [1], so if these are the same, we're good.
              if (test_coord[1] != valid[1]) {
                valid = [];   // Not valid. Make it null so it won't match.
              }               // Note, no need for else since else does nothing in this case.
            }

            // Make sure each space is not disabled, and not in the possible moves array already.
            if(gameboard_length == 0) {
              for(y = 0; y < 4; y++) {
                // See if we find our space.
                if(String(valid[y]) == String(droppableID)) {
                  prev_spaceID = cur_letterID;      // We did! Save this ID then.
                }
                possible_moves.push(String(valid[y]));
              }
            }
            else {
              for(y = 0; y < 2; y++) {
                // See if we find our space.
                if(String(valid[y]) == String(droppableID)) {
                  prev_spaceID = cur_letterID;      // We did! Save this ID then.
                }
                possible_moves.push(String(valid[y]));
              }
            }
          }
        }

   
        //* Scan for possible moves.
        //---------------------------------------
        for(var i = 0; i < gameboard_length; i++) {
          var cur_letterID = game_board[i].id;
          var coordinates = find_table_position(cur_letterID);    // Get the row / col values.

          /*
              X*X
              *+*
              X*X

              + = current position to look at
              * = valid spots, l/r = row(-1),col & row(+1),col + t/b = row,col(-1) & row,col(+1)
              X = not valid spot
          */
          // Allow both left/right & top/bottom placement.
          if(gameboard_length < 1) {
            valid = [
              "row" + (parseInt(coordinates[0]) - 1) + "_col" + coordinates[1],     // top of space
              "row" + (parseInt(coordinates[0]) + 1) + "_col" + coordinates[1],      // bottom of space
              "row" + (coordinates[0]) + "_col" + (parseInt(coordinates[1]) - 1),   // left of space
              "row" + (coordinates[0]) + "_col" + (parseInt(coordinates[1]) + 1)    // right of space
            ];
          }
          // Only allow left to right spaces.
          else if(gameboard_length >= 1 && left_right == true) {
            valid = [
              "row" + (coordinates[0]) + "_col" + (parseInt(coordinates[1]) - 1),   // left of space
              "row" + (coordinates[0]) + "_col" + (parseInt(coordinates[1]) + 1)    // right of space
            ];
          }
          // Only allow top to bottom spaces.
          else if(gameboard_length >= 1 && left_right == false) {
            valid = [
              "row" + (parseInt(coordinates[0]) - 1) + "_col" + coordinates[1],     // top of space
              "row" + (parseInt(coordinates[0]) + 1) + "_col" + coordinates[1]      // bottom of space
            ];
          }

          // Make sure each space is not disabled, and not in the possible moves array already.
          // URL for the droppable disabled: https://api.jqueryui.com/droppable/#option-disabled
          // URL for the $.inArray function: https://stackoverflow.com/questions/6116474/how-to-find-if-an-array-contains-a-specific-string-in-javascript-jquery
          if(gameboard_length == 0) {
            for(y = 0; y < 4; y++) {
              if(String(valid[y]) == droppableID) { // See if we find our space.
                prev_spaceID = cur_letterID;        // We did! Save this ID then.
              }
              possible_moves.push(String(valid[y]));
            }
          }
          else {
            for(y = 0; y < 2; y++) {
              if(String(valid[y]) == droppableID) { // See if we find our space.
                prev_spaceID = cur_letterID;        // We did! Save this ID then.
              }
              possible_moves.push(String(valid[y]));
            }
          }
        }

        // Now see if the given spot the user tried to drop in is in the valid list.
        // Got the idea for this from Stackoverflow. This little JS code will return -1 if the array does
        // not contain the current droppable target, or the index if it does. We just need to check for -1.
        // https://stackoverflow.com/questions/12623272/how-to-check-if-a-string-array-contains-one-string-in-javascript
        var is_valid = possible_moves.indexOf(droppableID);

        // It is a valid move if is_valid isn't -1.
        if(is_valid != -1) {
          $("#messages").html("");      // Valid move, so erase the last error message.

          var past_row, past_col;       // Need to get last position and current position.
          var new_row, new_col;         // Last is basically the tile immediately next to the tile we placed.
                                        // Say we added an "S" to the end of "Home", the "e" in "Home" would be the last position.
          var tmp_pos = find_table_position(droppableID);
          new_row = parseInt(tmp_pos[0]);
          new_col = parseInt(tmp_pos[1]);

          tmp_pos = find_table_position(prev_spaceID);
          past_row = parseInt(tmp_pos[0]);
          past_col = parseInt(tmp_pos[1]);

          // Determine if we are going left to right or top to bottom.
          if(gameboard_length == 0) {
            if(past_row == new_row) {
              left_right = true;        // Yep the rows are the same, so it's left to right.
            }
            else {
              left_right = false;       // Nope, rows are different, it's top to bottom.
            }
          }

          // Determine if we should insert at the beginning or the end.
          if(left_right == true) {                            // Left to right check.
            if(new_col <= past_col) {                         // YES
              insert_beg = true;
            }
            else if (new_col < past_col) {                    // NO
              insert_beg = false;
            }
          }
          else if (left_right == false) {                     // Must be Up/Down
            if(new_row <= past_row) {                         // YES
              insert_beg = true;
            }
            else if (new_row > past_row) {                    // NO
              insert_beg = false;
            }
          }

          // Determine if the prev space should be added to the game board array.
          if(gameboard_length == 0) {
            // Go up or down to grab the entire previous word.
            // Current space is: droppableID
            if(left_right == true) {         // All the way to the left.
              // Need to go left and see if we find any disabled spaces.
              // We know this row is: new_row

              // Var to determine when to stop checking words.
              var test_word = true;

              // Go all the way to the left or right.
              var col_index = parseInt(new_col);          // Index for the column.

              if(insert_beg != true) {
                col_index = new_col - 1;                  // Start going to the left.
              }
              else {
                col_index = new_col + 1;                  // Start going to the right.
              }

              // While there's a letter to add, keep adding.
              // Once test_word is false, we stop adding letters to the array.
              while(test_word == true) {
                var row_pos = new_row;                  // Row position stays constant.
                var col_pos = col_index;                // Column must change.

                // See if this a valid disabled space.
                var test_cord = "row" + row_pos + "_col" + col_pos;

                // If this is a valid disabled space, sweet! Add it to the array!
                if(find_letter(test_cord) != -1 && test_word == true) {
                  // Create an object to add.
                  var tmp_obj = {};
                  tmp_obj['id'] = test_cord;          // This style works as an object.
                  tmp_obj['tile'] = test_cord;

                  // Do we insert at the beginning or the end?
                  if(insert_beg != true) {          // No! Beginning!
                    game_board.unshift(tmp_obj);
                    col_index--;
                  }
                  else {                            // Yes, the end!
                    game_board.push(tmp_obj);
                    col_index++;
                  }

                  used_letters++;                   // Keep track of used letters.
                }
                else {
                  // Time to break. This prevents reading the entire row and adding silly letters.
                  test_word = false;
                }
              }
            }
            else {                                // Up / Down case
              // Need to go up and see if we find any disabled spaces.
              // We know this col is: new_col

              // Var to determine when to stop checking words.
              var test_word = true;

              // Go all the way to the left or right.
              var row_index = parseInt(new_row);          // Index for the row.

              if(insert_beg != true) {
                row_index = new_row - 1;                  // Start going up.
              }
              else {
                row_index = new_row + 1;                  // Start going down.
              }

              // While there's a letter to add, keep adding.
              // Once test_word is false, we stop adding letters to the array.
              while(test_word == true) {
                var row_pos = row_index;                  // Row must change.
                var col_pos = new_col;                    // Column position stays constant.

                // See if this a valid disabled space.
                var test_cord = "row" + row_pos + "_col" + col_pos;

                // If this is a valid disabled space, sweet! Add it to the array!
                if(find_letter(test_cord) != -1 && test_word == true) {
                  // Create an object to add.
                  var tmp_obj = {};
                  tmp_obj['id'] = test_cord;          // This style works as an object.
                  tmp_obj['tile'] = test_cord;

                  // Do we insert at the beginning or the end?
                  if(insert_beg != true) {            // No! Beginning!
                    game_board.unshift(tmp_obj);
                    row_index--;
                  }
                  else {                              // Yes, the end!
                    game_board.push(tmp_obj);
                    row_index++;
                  }

                  used_letters++;                  // Keep track of used letters.
                }
                else {
                  
                  test_word = false;
                }
              }
            }
          }
        }

        else {
          $("#messages").html("<br><div class='highlight_centered_error'> \
          Sorry, that wasn't a valid move. Tiles must be placed at right angles, as diagonals are not allowed.</div>");

          // Alert users to restrictions on row / columns.
          // If the game board length is 0, then any placement around tiles is fine. So the above message is completely valid.
          // However, when the game board greater than 0, the user must stay in the same column or row.
          if(gameboard_length > 0) {
            // Check for left / right to provide the most accurate error message.
            if(left_right == true) {
              $("#messages").html("<br><div class='highlight_centered_error'> \
              Sorry, that wasn't a valid move. Tiles must be placed on the same row (left / right) after one tile has been placed on a row.</div>");
            }
            // Must be top / down, so provide that error message.
            else {
              $("#messages").html("<br><div class='highlight_centered_error'> \
              Sorry, that wasn't a valid move. Tiles must be placed on the same column (top / down) after one tile has been placed on a column.</div>");
            }
          }

          // Force revert on dragable
          //source: https://stackoverflow.com/questions/6071409/draggable-revert-if-outside-this-div-and-inside-of-other-draggables-using-both
          ui.draggable.draggable('option', 'revert', true);
          return;
        }
      }

      var obj = {};
      obj['id'] = droppableID;          // This style works as an object.
      obj['tile'] = draggableID;

      
      if (duplicate == false) {
        if (insert_beg == false) {
          // Push back to the game board array.
          game_board.push(obj);
        }
        else {
          // Push to the front of the game board array.
          game_board.unshift(obj);    // URL for info: https://stackoverflow.com/questions/8159524/javascript-pushing-element-at-the-beginning-of-an-array
        }

      }

      $(this).append($(ui.draggable));
      ui.draggable.css("top", $(this).css("top"));
      ui.draggable.css("left", $(this).css("left"));
      ui.draggable.css("position", "relative");

      // Update the word as it stands now.
      find_word();
    },
    zIndex: -1
  });
}

