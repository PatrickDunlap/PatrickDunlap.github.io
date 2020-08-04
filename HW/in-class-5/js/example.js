// ADD NEW ITEM TO END OF LIST
  
var el = document.createElement('li');
el.setAttribute('class', 'cool');
var node = document.createTextNode('Cream');
el.appendChild(node);
var element = document.getElementById('four');
 element.appendChild(el);
 


// ADD NEW ITEM START OF LIST
var el = document.createElement('li');
el.setAttribute('class', 'cool');
var node = document.createTextNode('Kale');
el.appendChild(node);
var element = document.getElementById('one');
 element.insertBefore(el, element.childNodes[0]);

// ADD A CLASS OF COOL TO ALL LIST ITEMS

var el = document.getElementById('one');
el.className += "cool";
var el2 = document.getElementById('two');
el2.className += "cool";
var el3 = document.getElementById('three');
el3.className += "cool";
var el4 = document.getElementById('four');
el4.className += "cool";
//if (el.hasAttribute('class') {
  //  el.setAttribute('class', 'cool');
//}    


// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING

var list = document.getElementsByTagName('li');
    var listLen = list.length;
    console.log("List length", listLen);


   // var para = document.createElement("h2");
    var node = document.createTextNode(listLen);
  //  para.appendChild(node);
    var element = document.getElementsByTagName("h2")[0].innerHTML += listLen;
    //element.appendChild(para);