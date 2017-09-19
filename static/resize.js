//(function(){
	var screenW = document.documentElement.offsetWidth||document.body.offsetWidth;
	var oHtml = document.getElementsByTagName("html")[0];
	oHtml.style.fontSize = (100*screenW/750) + "px"; 
//})
 
window.onresize = function(){
	(function(){
		var screenW = document.documentElement.offsetWidth||document.body.offsetWidth;
		var oHtml = document.getElementsByTagName("html")[0];
		oHtml.style.fontSize = (100*screenW/750) + "px";
	})();	
} 

