$(function() {
	
$("ul").before("Just updated"); //add text before ul list
$("li.hot").prepend("+"); //add the plus sign before hot list items
var $new = "<li> glutten-free soy sauce </li>"; //create new variable for new item
$("li:last-child").after($new); //add it to the end

});