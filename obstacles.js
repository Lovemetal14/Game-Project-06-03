class Obstacle {
    constructor(ctx, gameWidth, playerPosY0, PlayerHeight) {
        this.ctx = ctx;
        this.width = 100;
        this.height = this.width;

        this.posX = gameWidth;
        this.posY = 750; //playerPosY0 + PlayerHeight - this.height;


        //añadir imagen a los obstaculos:

        this.image = new Image()
         this.image.src = "./img/Gorilla5.png"
         this.image.frames = 5;
         this.image.framesIndex = 0;
         this.enemyW= 401
         this.enemyH= 55
         this.spriteWidth = this.enemyW/this.image.frames
        //console.log("ancho sprite: " + this.spriteWidth)
        this.velX = 7;
    }

  /*  draw() {
        this.ctx.fillStyle = 'red'; //obstaculo de color
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height); //rectangulo con las medidas descritas arriba en obstacle
        this.move();
    }*/

//Draw con imagen

    draw(framesCounter) {      
        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
            0,
            Math.floor(this.image.width / this.image.frames),
            this.image.height,
            this.posX,
            this.posY,
            this.width,
            this.height);

        this.animate(framesCounter)
        let spriteWidth = Math.floor(this.image.width / this.image.frames)
        
        console.log("ancho sprite: " + spriteWidth)
        this.move()

    }

    animate(framesCounter) {

        if (framesCounter % 5 == 0) {
            this.image.framesIndex++;
        }
        if (this.image.framesIndex > this.image.frames - 1) {
            this.image.framesIndex = 0;
        }
    }


move() {
        this.posX -= this.velX;
    }
}



// DAYAN MODE:

//for (let i = 0; i < this.enemies.length; i++) {
//         let enemies = this.enemies[i];
//         for (let j = 0; j < this.player.bricks.length; j++) {
//                 let bricks = this.player.bricks[j];
//                 if (enemies.enemiesX + enemies.spriteWidth > bricks.enemiesX &&
//                         enemies.enemiesX < bricks.enemiesX + bricks.playerHeight &&
//                         enemies.enemiesY + enemies.spriteHeight > bricks.enemiesY &&
//                         enemies.enemiesY < bricks.enemiesY + bricks.playerHeight) {
//                         // Remove the enemy
//                         this.enemies.splice(i, 1);
//                         i--;
//                         this.score += 100;
//                         this.player.bricks.splice(j, 1);
//                         break;
//                 }
//         }
// }