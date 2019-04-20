var nextFigure = new Figure()
var figureNow = new Figure()


function Figure() {

   var that = this


   // При каждом новом создании фигуры ускоряем игру
   speed -= 0.2

   if ( speed < 15 ) {
      speed = 15
   }

   figureNow = nextFigure
   
   field.checkFilledLines()
   
   
   //var colors = ['#4169E1', "#FF003E", '#00FFED', "#0047FF", "#FFFF4A", "#FF9400", "#62D847"]
   //this.color = colors[rand()]

   
   var types = 
   [
      // Молния влево
      [new Block(4,0), new Block(4,1), new Block(5,1, 'main'), new Block(5,2) ],
      // Молния вправо
      [new Block(5,0), new Block(4,1, 'main'), new Block(5,1), new Block(4,2) ],
      // Г влево
      [new Block(4,0), new Block(4,1, 'main'), new Block(4,2), new Block(5,2) ],
      // Г вправо
      [new Block(5,0), new Block(5,1, 'main'), new Block(5,2), new Block(4,2) ],
      // Куб
      [new Block(4,0, 'unrotateble'), new Block(5,0), new Block(4,1), new Block(5,1) ],
      // Палка
      [new Block(3,0), new Block(4,0), new Block(5,0, 'main'), new Block(6,0)],
      // Палка с ответвлением по центру
      [new Block(5,0), new Block(5,1, 'main'), new Block(4,1), new Block(5,2) ]
   ]
   
   this.blocks = types[rand(0,6)]
   
   // Проверяет, нет ли фигуры на месте только что созданной
   field.isGameOver(that)




   this.fall = function() {

      // Опускать раз в несколько кадров
      timeLeft++
      if(timeLeft >= speed) {
         timeLeft = 0

         // Сначала проверяем, столкнулся какой-либо из блоков
         for (var i = 0; i < that.blocks.length; i++) {

            if (field.blocks[that.blocks[i].x][that.blocks[i].y+1] == undefined || field.blocks[that.blocks[i].x][that.blocks[i].y+1] == 1) {
               that.stopFalling()
               nextFigure = new Figure();
               return
            }
            
         };

         // Если не один не столкнулся - опускаем все
         this.blocks.forEach(function(element) {
            element.y++
         })
         


      }
   }
   
   // Быстро опустить блок при нажатии на s
   this.fastFall = function() {

      canBeFallen = true
      while (canBeFallen) {
         // Сначала проверяем, столкнулся какой-либо из блоков
         for (var i = 0; i < that.blocks.length; i++) {

            if (field.blocks[that.blocks[i].x][that.blocks[i].y+1] == undefined || field.blocks[that.blocks[i].x][that.blocks[i].y+1] == 1) {
               canBeFallen = false
               return
            }
            
         };

         // Если не один не столкнулся - опускаем все
         this.blocks.forEach(function(element) {
            element.y++
         })
      }

   }



   this.move = function(side) {

      if (side == 'left') {
         if ( this.checkCollision('left')) {
            this.blocks.forEach(function(element) {
               element.x--
            })
         }
      }

      if (side == 'right') {
         if ( this.checkCollision('right')) {
            this.blocks.forEach(function(element) {
               element.x++
            })
         }
      }

   }



   // Проверяет столкновения по бокам
   this.checkCollision = function(side) {

      if (side == 'left') {
         var offset = -1
      }
      if (side == 'right') {
         var offset = 1
      }

      // Так как нужно возращать значение - true или  false - заводим переменную
      var canBeMoved = true

      that.blocks.forEach(function(element) {
         // Проверяем, есть ли закрашеный блок в новом месте 
         if (element.x+offset < 0 || element.x+offset >= field.w || field.blocks[element.x+offset][element.y] == 1) {
            canBeMoved = false
            return
         }
         
      });
      
      return canBeMoved
   }



   // Если блок столкнулся с окружением - преобразовать блок в единички. (Заполнить массив field.blocks)
   this.stopFalling = function() {
      this.blocks.forEach(function(block) {
         // Заполняем массив field новыми блоками
         field.blocks[block.x][block.y] = 1
      })
   }



   this.rotate = function() {

      // Перебираем все блоки, находим гланый

      var mainBlock = 0
      for (var i = 0; i < this.blocks.length; i++) {
         if (this.blocks[i].isMain == 'main') {
            mainBlock = this.blocks[i]
            break
         }
         if (this.blocks[i].isMain == 'unrotateble') {
            return
         }
      }

      // Новые координаты блока
      var absoluteCords = []

      for (var i = 0; i < this.blocks.length; i++) {

         // Для читабельности
         var block = this.blocks[i]

         // За объяснением работы слудующего кода - сюда https://www.youtube.com/watch?v=Atlr5vvdchY
         // Код получает координаты блока после поворота
         var newRelativeCords = {}
         newRelativeCords.x = block.x - mainBlock.x
         newRelativeCords.y = block.y - mainBlock.y

         var transformedCords = {}
         transformedCords.x = (0 * newRelativeCords.x) + (-1 * newRelativeCords.y)
         transformedCords.y = (1 * newRelativeCords.x) + (0 * newRelativeCords.y)

         absoluteCords.push({
            'x': mainBlock.x + transformedCords.x,
            'y' :mainBlock.y + transformedCords.y
         })


         // Проверяем, не оказался ли какой-нибудь блок вне поля
         if (absoluteCords[i].x < 0 || absoluteCords[i].x >= field.w || 
             absoluteCords[i].y < 0 || absoluteCords[i].y >= field.h) {
            return
         }
         if (field.blocks[absoluteCords[i].x][absoluteCords[i].y] == 1) {
            return
         }

      }

      // Если все блоки могут  существовать после поворота - присваиваем координаты
      this.blocks.forEach(function(block, i) {
         block.x = absoluteCords[i].x
         block.y = absoluteCords[i].y
      })

   }




}


function Block(x, y, isMain) {

   this.x = x
   this.y = y
   if (isMain) {
      this.isMain = isMain
   }
}




var nextFigure = new Figure();
