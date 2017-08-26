console.log('Loaded!');
//change the inner text
var element=document.getElementById("main-text");
element.innerHTML="newvalue";

var img=document.getElementById("madi");
img.onclick=function() {
  img.style.marginLeft = "100px" ;
};