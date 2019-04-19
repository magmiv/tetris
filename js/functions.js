// Создаем игровой цикл
var nextGameStep = (function () {
	return requestAnimationFrame || 
	mozRequestAnimationFrame 		 || 
	webkitRequestAnimationFrame  ||
	oRequestAnimationFrame 			 || 
	msRequestAnimationFrame			 ||
	function(callback) {
		setTimeout(callback, 1000/60)
	}
})();

function log(text) {
	console.log(text)
}


function rand(min, max) {
	var rand = min - 0.5 + Math.random() * (max - min + 1)
	rand = Math.round(rand);
	return rand;
}
 

