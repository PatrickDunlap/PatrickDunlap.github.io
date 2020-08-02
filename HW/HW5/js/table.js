/* sources used: https://stackoverflow.com/questions/47162534/javascript-function-returning-nan-even-though-value-is-a-number/47162931
                 https://www.geeksforgeeks.org/how-to-append-html-code-to-a-div-using-javascript/#:~:text=How%20to%20append%20HTML%20
                 code%20to%20a%20div%20using%20JavaScript%20%3F,-02%2D07%2D2019&text=Using%20the%20innerHTML%20attribute%3A,the%20%2B%
                 3D%20operator%20on%20innerHTML.
                 https://www.w3schools.com/jsref/dom_obj_table.asp
                 https://www.w3schools.com/jsref/event_onsubmit.asp
                 */




function tableCalculation() {
 var lowHor =  Number(document.getElementById('LowHor').value); //get values from documents
 var highHor =  Number(document.getElementById('HighHor').value);
 var lowVer =  Number(document.getElementById('LowVer').value);
 var highVer = Number(document.getElementById('HighVer').value);

 console.log("First horizontal number: ", lowHor, "Last horizontal number: ", highHor); //check the numbers
 console.log("First verticle number: ", lowVer, "last verticle number: ", highVer);

 var error = document.getElementById('error');

//error messages for invalid input
 if (lowHor < -50 || highHor > 50 || lowVer < -50 || highVer > 50) {
    error.innerHTML = ""; // clear message
    error.innerHTML += "Your input must be between -50 and 50, please try again";
    return;
 }

  else if (isNaN(lowHor) || isNaN(highHor) || isNaN(lowVer) || isNaN(highVer)) {
    error.innerHTML = ""; // clear message
    error.innerHTML += "It looks like an input is not a number, please try again";
    return;
  }

  else if (lowHor > highHor || lowVer > highVer) {
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
      
      
     var tab = document.getElementById('table');
      //div.createElement(pageTable); does not work
      tab.innerHTML += pageTable;
    }
   
        
