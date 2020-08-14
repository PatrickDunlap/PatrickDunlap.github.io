

/**
 *      This loads up the inital game board and makes
 *      the game playable on the first load of the web page.
 *
 **/
$( document ).ready(function() {
  load_pieces_array();        // Load up the default pieces array.
  load_scrabble_pieces();     // Load up the 7 random Scrabble pieces.
  load_droppable_targets();   // Load up the targets for the Scrabble pieces.   // Update the Letters Remaining table.
  fill_in_table();            // Add special items to the table.
});

