var canvas = document.querySelector(".tetris")
var ctx = canvas.getContext("2d")

var next_figure = document.querySelector(".next-figure")
var ctx2 = next_figure.getContext("2d")

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
         document.querySelector(".game-over").classList.add('active')
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
   
   next_figure.width = blockW*4
   next_figure.height = blockW*4

   next_figure.style.width = blockW*4 + 'px'
   next_figure.style.height = blockW*4 + 'px';

   next_figure.style.backgroundSize = blockW + 'px'
}
changeSize()

window.onresize = changeSize

var startSpeed = 25
var speed = startSpeed
var timeLeft = 0




document.querySelector('.beginAgain').onclick = function() {
   for (var i = 0; i < fieldSettings.w; i++) {

      for (var j = 0; j < fieldSettings.h; j++) {
         field[i][j] = ''
   
      }
   
   }
   speed = startSpeed

   nextFigure = new Figure()

   score = 0
   scoreBlock.innerHTML = 0
   document.querySelector(".game-over").classList.remove('active')

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

}
