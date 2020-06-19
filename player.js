class Player {

    constructor(ctx, gameW, gameH, keys) {

        this.ctx = ctx;

        this.gameWidth = gameW; 
        this.gameHeight = gameH;

        this.width = 150; 
        this.height = 150;
        this.image = new Image();
        this.image.src = "./img/peter2.png";
        this.image.frames = 3;
        this.image.framesIndex = 0;

        this.imageL = new Image();
        this.imageL.src = "./img/peterLeft.png";
        this.imageL.frames = 3;
        this.imageL.framesIndex = 0;

        this.posX = 50;
        this.posY = this.gameHeight - this.height - 180;

        this.posX0 = 0;
        this.posY0 = this.posY; 
        this.movement = 10;
    
        this.walkingR = false;
        this.walkingL = false;

        this.velY = 0.5;
        this.gravity = 0.8;
        this.friction = 0.7;

        this.keys = keys;

        this.bullets = [];

        this.setListeners();
        
    }


    draw(framesCounter) {

     if (this.walkingL) {
        this.ctx.drawImage(
        this.imageL,
        this.imageL.framesIndex * Math.floor(this.imageL.width / this.imageL.frames),
        0,
        Math.floor(this.imageL.width / this.imageL.frames),
        this.imageL.height,
        this.posX,
        this.posY,
        this.width,
        this.height
        ); 
        this.animateL(framesCounter)
      } else {
            
        this.ctx.drawImage(
        this.image,
        this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
        0,
        Math.floor(this.image.width / this.image.frames),
        this.image.height,
        this.posX,
        this.posY,
        this.width,
        this.height
        );
        this.animateR(framesCounter)
        } 

        this.bullets.forEach(bullet => bullet.draw())
        this.clearBullets()

        this.move()
       
    }

    animateL(framesCounter) {

        if (framesCounter % 5 == 0) {
        this.imageL.framesIndex++;
        }
        if (this.imageL.framesIndex > this.imageL.frames - 1) {
        this.imageL.framesIndex = 0;
        }
    }

    animateR(framesCounter) {

        if (framesCounter % 5 == 0) {
        this.image.framesIndex++;
        }
        if (this.image.framesIndex > this.image.frames - 1) {
        this.image.framesIndex = 0;
        }
    }

    move() {
        if (this.posY < this.posY0) {
        this.posY += this.velY;
        this.velY += this.gravity;
        } else {
        this.posY = this.posY0;
        this.velY = 1;
        }
    }

    setListeners() {
        document.addEventListener("keydown", e => {
          switch (e.keyCode) {
            case this.keys.TOP:
            if (this.posY >= this.posY0) {
            this.jump()
            }
            break;
            case this.keys.LEFT:
                this.walkingR = false;
                this.walkingL = true;
            this.posX -= this.movement;
            break;

            case this.keys.RIGHT:
                this.walkingL = false;
                this.walkingR = true;
            this.posX += this.movement;
            break;

            case this.keys.SPACE:
            this.shoot();
            break;
        }
    });
    }

    jump() {
        this.posY -= 100;
        this.velY -= 15;
      }


    shoot() {
        this.bullets.push(new Bullets(this.ctx, this.posX, this.posY, this.posY0, this.width, this.height));
    }

    clearBullets() {
      
        this.bullets = this.bullets.filter(bull => bull.posX <= this.gameWidth);

        
    }

}