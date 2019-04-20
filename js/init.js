var canvas = document.querySelector(".tetris")
var ctx = canvas.getContext("2d")

var next_figure = document.querySelector(".next-figure")
var ctx2 = next_figure.getContext("2d")

var score = 0
var scoreBlock = document.querySelector('.score span')




function Field() {

   var that = this


   // Создаем поле элементов. Если ячейка в массиве пуста - значит элемент в поле пустой
   // Имеет вид матрицы
   // Если элемент в массиве равен 1 - значит в ячейке есть блок 
   this.blocks = []

   this.w = 10
   this.h = 21

   this.createFieldStructure = function() {
      // Создаем структуру массива blocks
      // Из-за человеческой ошибки создал неверную структуру. Идет заполнение не по строкам, а по столбцам. Переделывать долго, оставил как есть
      for (var i = 0; i < this.w; i++) {
         // Делаем подмассивы
         this.blocks.push([])

         // Заполняем их
         for (var j = 0; j < this.h; j++) {
            this.blocks[i].push([''])

         }
      }
   }
   this.createFieldStructure()


   // Проверяет, есть ли заполненные линии. Если есть - убирает их и изменяет score
   this.checkFilledLines = function() {

      // Из-за ошибки с неверным заполнением поля - приходится перебирать именно таким образом
      main: for (var i = 0; i < this.h; i++) {
         for (var j = 0; j < this.w; j++) {
            // Если хоть одна линия пуста - прервать выполнение, перейти на следущую
            if ( this.blocks[j][i] == '') {
               continue main
            }
            
         }

         // Если вполнение дошло до этого момента - значить собран целый ряд
         // Если собран целый ряд - удалить его
         for (var i1 = 0; i1 < this.w; i1++) {
            this.blocks[i1][i] = ''
         }
   
         // Сохраняем старое поле. Оно будет использоваться, чтобы опустить блоки относительно их предыдущих координат
         var oldField = this.blocks
   
         // И переместить все блоки вниз
         for (var j1 = i; j1 > 0; j1--) {
            for (var line = 0; line < this.w; line++) {
               this.blocks[line][j1] = oldField[line][j1-1]
            }
         }
         
         score += 10
         scoreBlock.innerHTML = score
   
      }
   }


   this.isGameOver = function(that) {
      for (var i = 0; i < 4; i++) {
         if ( field.blocks[that.blocks[i].x][that.blocks[i].y] == 1) {
            // Останавливаем игру
            speed = 100000000
            document.querySelector(".game-over").classList.add('active')
            window.onkeydown = function() {
               return
            }
         }
      }
   }


   // Меняет размеры в зависимости от высоты браузера. Ширина не учитывается
   this.changeSize = function() {
      var blockW = document.body.clientHeight/22
   
      if (blockW > 40) {
         blockW = 40
      }
      that.cellW = blockW
   
      
      canvas.width = blockW*10
      canvas.height = blockW*21
      canvas.style.backgroundSize = blockW + 'px'
      
      next_figure.width = blockW*4
      next_figure.height = blockW*4
   
      next_figure.style.width = blockW*4 + 'px'
      next_figure.style.height = blockW*4 + 'px';
   
      next_figure.style.backgroundSize = blockW + 'px'
   }
   this.changeSize()
   

   window.onresize = this.changeSize
   

}

var field = new Field()



var startSpeed = 25
// Раз в сколько кадров будет падать новый блок
var speed = startSpeed
var timeLeft = 0



// При нажатии на кнопку "начать заново" вернуть все настройки по умолчанию
document.querySelector('.beginAgain').onclick = function() {
   for (var i = 0; i < field.w; i++) {
      for (var j = 0; j < field.h; j++) {
         field.blocks[i][j] = ''
      }
   }
   speed = startSpeed

   nextFigure = new Figure()

   score = 0
   scoreBlock.innerHTML = 0
   document.querySelector(".game-over").classList.remove('active')

   // Так как при проигрыше сбрасывается управление (а иначе можно двигать блок даже если ты проиграл) - восстанавливаем уравление
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
