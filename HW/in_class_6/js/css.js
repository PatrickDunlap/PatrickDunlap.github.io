$(function() {
var $backgroundColor = $("li:first-child").css("background-color"); //store background color
$("ul").append($backgroundColor); //write it into the file
$("li").css({"background-color": "#c5a996", "border-style" : "solid", "border-width" : "1px", "border-color" : "white", "color" : "black", "font-family" : "Georgia"});
}); //update the rules at once