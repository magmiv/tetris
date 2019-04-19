var canvas = document.querySelector(".tetris")
var ctx = canvas.getContext("2d")

var nextFigure = document.querySelector(".nextFigure")
var ctx2 = nextFigure.getContext("2d")

var score = 0
var scoreBlock = document.querySelector('.score span')





// Создаем поле элементов. Если ячейка в массиве пуста - значит элемент в поле пустой
var field = []

var fieldSettings = {
   w: 10,
   h: 21
}

// Создаем структуру массива field
// Из-за человеческой ошибки создал неверную структуру. Идет заполнение не по строкам, а по столбцам
for (var i = 0; i < fieldSettings.w; i++) {

   // Делаем подмассивы
   field.push([])

   // Заполняем их
   for (var j = 0; j < fieldSettings.h; j++) {
      field[i].push([''])

   }

}


function checkFilledLines() {

   outer: for (var i = 0; i < fieldSettings.h; i++) {
      for (var j = 0; j < fieldSettings.w; j++) {
         
         // Если хоть одна линия пуста - прервать выполнение, перейти на следущую
         if ( field[j][i] == '') {
            continue outer
         }
         
      }
      // Если собран целый ряд - удалить его
      for (var i1 = 0; i1 < fieldSettings.w; i1++) {
         field[i1][i] = ''
      }

      var oldField = field

      // И переместить все блоки вниз
      for (var j1 = i; j1 > 0; j1--) {
         for (var line = 0; line < fieldSettings.w; line++) {
            field[line][j1] = oldField[line][j1-1]
         }
      }
      
      score += 10
      scoreBlock.innerHTML = score

   }
}


function isGameOver(that) {

   for (var i = 0; i < 4; i++) {
      if ( field[that.blocks[i].x][that.blocks[i].y] == 1) {
         speed = 10000000
         window.onkeydown = function() {
            return
         }
      }
   }
}



function changeSize() {
   var blockW = document.body.clientHeight/22

   if (blockW > 40) {
      blockW = 40
   }
   fieldSettings.cellW = blockW

   canvas.width = blockW*10
   canvas.height = blockW*21

   canvas.style.backgroundSize = blockW + 'px'
}
changeSize()

window.onresize = changeSize


var speed = 10
var timeLeft = 0




document.querySelector('.beginAgain').onclick = function() {
   for (var i = 0; i < fieldSettings.w; i++) {

      for (var j = 0; j < fieldSettings.h; j++) {
         field[i][j] = ''
   
      }
   
   }
   speed = 10

   nextFigure = new Figure()

   score = 0
   scoreBlock.innerHTML = 0
}