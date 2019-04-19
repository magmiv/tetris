// При загрузке создаем изображения
window.addEventListener("load", gameLoop());

function gameLoop() {
   ctx.clearRect(0 , 0, canvas.width, canvas.height)
   ctx2.clearRect(0 , 0, canvas.width, canvas.height)
   
   figureNow.fall()
   drawField()
   drawFallingFigure()

   drawNextFigure()

   nextGameStep(gameLoop)
}

function drawFallingFigure() {
   figureNow.blocks.forEach(function(element) {
      ctx.fillColor = element.color
      ctx.fillRect(element.x*fieldSettings.cellW, element.y*fieldSettings.cellW, fieldSettings.cellW+1, fieldSettings.cellW+1)
   });
}


function drawField() {
   for (var i = 0; i < 10; i++) {
      // Заполняем их
      for (var j = 0; j < 21; j++) {
         
         if ( field[i][j] != '' ) {
            ctx.fillRect(i*fieldSettings.cellW, j*fieldSettings.cellW, fieldSettings.cellW+1,fieldSettings.cellW+1)
         }
   
      }
   }
}



window.onkeydown = function(e) {

   if (e.keyCode == 65) {
      figureNow.move('left')
   }

   if (e.keyCode == 68) {
      figureNow.move('right')
   }

   if (e.keyCode == 87) {
      figureNow.rotate()
   }
   if (e.keyCode == 83) {
      figureNow.fastFall()
   }
}
