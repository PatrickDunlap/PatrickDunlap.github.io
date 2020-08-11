/* sources used: https://stackoverflow.com/questions/47162534/javascript-function-returning-nan-even-though-value-is-a-number/47162931
                 https://www.geeksforgeeks.org/how-to-append-html-code-to-a-div-using-javascript/#:~:text=How%20to%20append%20HTML%20
                 code%20to%20a%20div%20using%20JavaScript%20%3F,-02%2D07%2D2019&text=Using%20the%20innerHTML%20attribute%3A,the%20%2B%
                 3D%20operator%20on%20innerHTML.
                 https://www.w3schools.com/jsref/dom_obj_table.asp
                 https://www.w3schools.com/jsref/event_onsubmit.asp
                 */
                var tabCounter = 1; // a variable used later
                function validate() {
                          // This source was very useful for the tutorial on jquery plugin -- https://www.sitepoint.com/basic-jquery-form-validation-tutorial/
                          //as well as the readme included in downloading the validator
                       
                          
                  $("#form").validate({
                    // Rules for validating the form.
                    rules: {
                      LowHor: {
                        number: true, //confirm input is number
                        min: -50, //confirm within specified range
                        max: 50,  //confirm within specified range
                        required: true,  //Make the number required
                        
                      },
                      HighHor: {
                        number: true,
                        min: -50,
                        max: 50,
                        required: true
                      },
                      LowVer: {
                        number: true,
                        min: -50,
                        max: 50,
                        required: true
                      },
                      HighVer: {
                        number: true,
                        min: -50,
                        max: 50,
                        required: true
                      }
                    },
                
                    // Error message for invalid input
                    messages: {
                      lowHor: {
                        number: "ERROR: Please enter a number between -50 and 50 for the Low Horizontal Bound",
                        min: "ERROR: Please enter a number > -50 for the Low Horizontal Bound",
                        max: "ERROR: Please enter a number < 50 for the Low Horizontal Bound",
                        required: "ERROR: low horizontal bound was left empty",
                        
                      },
                      HighHor: {
                        number: "ERROR: Please enter a number between -50 and 50 for the High Horizontal Bound",
                        min: "ERROR: Please enter a number > -50 for the High Horizontal Bound",
                        max: "ERROR:Please enter a number < 50 for the Low Horizontal Bound",
                        required: "ERROR: high horizontal bound was left empty"
                      },
                      LowVer: {
                        number: "ERROR: Please enter a number between -50 and 50 for the Low Vertical Bound",
                        min: "ERROR: Please enter a number > -50 for the Low Vertical Bound",
                        max: "ERROR:Please enter a number < 50 for the Low Vertical Bound",
                        required: "ERROR: low vertical bound was left empty",
                      },
                      HighVer: {
                        number: "ERROR: Please enter a number between -50 and 50 for the High Vertical Bound",
                        min: "ERROR: Please enter a number > -50 for the High Vertical Bound",
                        max: "ERROR:Please enter a number < 50 for the High Vertical Bound",
                        required: "ERROR: high vertical bound was left empty"
                      }
                    },
                
                    submitHandler: function(form) {
                      tableCalculation();
                      return false;
                    },
                    //Empty error messages
                    invalidHandler: function() {
                      
                      $("#table").empty();
                    },
                
                   
                    errorElement: "div",
                    errorPlacement: function(error, element) {
                      error.insertAfter(element);
                    },

                   onkeyup: function( element, event ) {
                      // Call the auto submit function on keyup, so the user does not have to
                      // press the enter button.
                      auto_submit();
                    }




                  });
                }
                


function tableCalculation() {
 var lowHor =  Number(document.getElementById('LowHor').value); //get values from documents
 var highHor =  Number(document.getElementById('HighHor').value);
 var lowVer =  Number(document.getElementById('LowVer').value);
 var highVer = Number(document.getElementById('HighVer').value);

 console.log("First horizontal number: ", lowHor, "Last horizontal number: ", highHor); //check the numbers
 console.log("First verticle number: ", lowVer, "last verticle number: ", highVer);

 var error = document.getElementById('error');



 //OLD ERROR MESSAGES
//error messages for invalid input
 /*if (lowHor < -50 || highHor > 50 || lowVer < -50 || highVer > 50) {
    error.innerHTML = ""; // clear message
    error.innerHTML += "Your input must be between -50 and 50, please try again";
    return;
 }

  else if (isNaN(lowHor) || isNaN(highHor) || isNaN(lowVer) || isNaN(highVer)) {
    error.innerHTML = ""; // clear message
    error.innerHTML += "It looks like an input is not a number, please try again";
    return;
  }
  */

 if (lowHor > highHor || lowVer > highVer) {
    error.innerHTML = ""; // clear message
    error.innerHTML += "One of your lower bounds is higher than one of your higher bounds, please try again";
    return;
 } 


var table = {}; //I tried using 2d arrays but I could not get it to work, so Im creating this
//object and filling it with arrays to mimick 2d arrays
var r = Math.abs(highHor - lowHor); //This deals with negatives
var c = Math.abs(highVer - lowVer);

var horIndex = lowHor; //Used for my array
var verIndex = lowVer;
var i; //used for loop
var j;

for (i = 0; i <= c; i+=1)
{
    var array = [];
    for(j = 0; j <= r; j+=1)
    {
        var result = horIndex * verIndex;
        array[j] = result;
        horIndex++;
    }
    table[i] = array;
    horIndex = lowHor //reset the position
    verIndex++;


}

    createTable(table);
    return false;
}

function createTable(table)
{
  var tab = document.getElementById('table');
  tab.innerHTML = ""; //delete currently active table
  error.innerHTML = ""; //delete any errors if program makes it here
    var lowHor =  Number(document.getElementById('LowHor').value); //Number function used to convert to number
    var highHor =  Number(document.getElementById('HighHor').value);
    var lowVer =  Number(document.getElementById('LowVer').value);
    var highVer = Number(document.getElementById('HighVer').value);
   // var table = document.getElementById("table");

    var r = Math.abs(highHor - lowHor); //This deals with negatives
    var c = Math.abs(highVer - lowVer);

    var pageTable = "";
    pageTable += "<table>";
    pageTable += "<tr><td>X</td>";

    for (var i = lowHor; i <= highHor; i+=1) {
        pageTable += "<td>" + i + "</td>";
      }

      pageTable += "</tr>";
      var vertical = lowVer;
   
      //console.log("The verticle number after initializing is", vertical); debugging stuff
     // console.log("The type of verticle is", typeof(vertical)); debugging stuff
     // vertical = parseInt(vertical); debugging stuff
    //  console.log("The type of verticle after conversion is", typeof(vertical)); debugging stuff

      for (var j = 0; j <= c; j+=1) {
       pageTable += "<tr><td>" + parseInt(vertical) + "</td>"; //print for vertical column
     //  console.log("The type of verticle in loop is", typeof(vertical)); debugging stuff
       
       //console.log("The verticle number being printed is", vertical); debugging stuff
        for (var k = 0; k <= r; k+=1) {
            pageTable += "<td>" + table[j][k] + "</td>";
          }
          vertical++;
        
          pageTable += "</tr>";
      }

      pageTable += "</table>";
      
      
    // var tab = document.getElementById('table');
      //div.createElement(pageTable); does not work
      tab.innerHTML += pageTable;
    }
   
        

   
   
    
    function auto_submit() {
      if( $("form#form").valid() == true ) {
        $("form#form").submit();
      }
    }
    
    
    
    function save_tab() { //the function that stores the tabs
      //sources used: https://stackoverflow.com/questions/18572586/append-to-dynamically-created-tab
      
    
      var tabCount = $("#tabs li").length + 1;
      console.log("Current tab count is: " + tabCount);
    
      if(tabCount > 50) {
        error.innerHTML = ""; // clear message before displaying new error message
        error.innerHTML += "Your may only create up to 50 tabs";
        return false;
      }
    
      $( "#tabs" ).tabs(); //create all of the tabs
    
      var LowHor = Number(document.getElementById('LowHor').value); //get the values from the form
      var HighHor = Number(document.getElementById('HighHor').value);
      var LowVer = Number(document.getElementById('LowVer').value);
      var HighVer = Number(document.getElementById('HighVer').value);
    
      tabCounter++;   // Increment the index each time we add a tab.
    
      var title = "<li class='tab'><a href='#tab-" + tabCounter + "'>" + LowHor +
                  "-" + HighHor + " x " + LowVer + "-" + HighVer + "</a>" +
                  "<span class='ui-icon ui-icon-close' role='presentation'></span>" + "</li>"; //The title bar
    
      // Add a new Title bar.
      $( "div#tabs ul" ).append( title )
      $( "div#tabs" ).append('<div id="tab-' + tabCounter + '">' + $("#table").html() + '</div>'); //add to table
      
      $( "#tabs" ).tabs("refresh"); //refresh
  
      $( "#tabs" ).tabs("option", "active", -1); //set to active
    
      // delete button: source: https://jqueryui.com/tabs/#manipulation
      $( "#tabs" ).delegate( "span.ui-icon-close", "click", function() {
          var panelID = $( this ).closest( "li" ).remove().attr( "aria-controls" );
          $( "#" + panelID ).remove();
  
          try {
            $( "#tabs" ).tabs("refresh");
          }
          catch (e) {
            //console.log(e);
          }
    
          //Source: https://api.jqueryui.com/tabs/#method-destroy
          if( $('div#tabs ul li.tab').length == 0) {
            try {
              $("#tabs").tabs("destroy");
            }
            catch (e) {
            }
    
            return false;  
          }
      });
    }
    
   
    function slider() {
    
    //sources used: https://jqueryui.com/slider/
    console.log("The slider is being called");
      //Calling the auto submit function on the various different sliders
      $("#LowHorSlider").slider({
        min: -50,
        max: 50,
        slide: function(event, ui) { //The values will auto update when a slider is moved
          $("#LowHor").val(ui.value);
          auto_submit();  
        }
      });
      $("#LowHor").on("keyup", function() {
        $("#LowHorSlider").slider("value", this.value);
        auto_submit();  
      });
    
     
      $("#HighHorSlider").slider({
        min: -50,
        max: 50,
        slide: function(event, ui) {
          $("#HighHor").val(ui.value);
          auto_submit();  
        }
      });
      $("#HighHor").on("keyup", function() {
        $("#HighHorSlider").slider("value", this.value);
        auto_submit();  
      });
    
     
      $("#LowVerSlider").slider({
        min: -50,
        max: 50,
        slide: function(event, ui) {
          $("#LowVer").val(ui.value);
          auto_submit();  
        }
      });
      $("#LowVer").on("keyup", function() {
        $("#LowVerSlider").slider("value", this.value);
        auto_submit();  
      });
    
  
      $("#HighVerSlider").slider({
        min: -50,
        max: 50,
        slide: function(event, ui) {
          $("#HighVer").val(ui.value);
          auto_submit();  
        }
      });
      $("#HighVer").on("keyup", function() {
        $("#HighVerSlider").slider("value", this.value);
        auto_submit();  
      });
    }