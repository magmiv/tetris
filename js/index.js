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
      ctx.fillRect(element.x*field.cellW, element.y*field.cellW, field.cellW+1, field.cellW+1)
   });
}

// Закрашивает черным там, где единички
function drawField() {
   for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 21; j++) {
         if ( field.blocks[i][j] != '' ) {
            ctx.fillRect(i*field.cellW, j*field.cellW, field.cellW+1,field.cellW+1)
         }
      }
   }
}


function drawNextFigure() {
   for (var i = 0; i < nextFigure.blocks.length; i++) {
      ctx2.fillRect( (nextFigure.blocks[i].x - 3) * field.cellW, nextFigure.blocks[i].y*field.cellW,  field.cellW,field.cellW)
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
