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

        this.posX = 120;
        this.posY = this.gameHeight - this.height - 180;
        this.posX0 = this.posX;
        this.posY0 = this.posY; //Salto
        this.movement = 10;
        //this.jump = 20;
        //this.jump = true,

        this.velY = 1;
        this.gravity = 0.4;
        this.friction = 0.7;

        this.keys = keys;

        this.bullets = [];

        this.setListeners();
        //this.moveNjump();

    }


    draw(framesCounter) {
        //console.log("frames counter= " + framesCounter)

        //                      146
        //this, (1 * entero de(440/3)), 0, 146, this, this, this, this, this)
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

        this.animate(framesCounter)

        this.bullets.forEach(bullet => bullet.draw())
        this.clearBullets()
        this.move()
        //this.moveNjump()
    }

    animate(framesCounter) {
        //console.log("frames al aumentar: " + framesCounter)
        //console.log("frames index: " + this.image.framesIndex)

        if (framesCounter % 5 == 0) {
            this.image.framesIndex++;
        }
        if (this.image.framesIndex > this.image.frames - 1) {
            this.image.framesIndex = 0;
        }
    }

    move() {
        //Lo devuelve a posicion original despues de jump
        if (this.posY < this.posY0) {
            this.posY += this.velY;
            this.velY += this.gravity;
        } else {
            this.posY = this.posY0;
            this.velY = 1;
        }
    }

    setListeners() {
        //SWITCH FUNCIONES BASICAS
        document.addEventListener("keydown", e => {
        switch (e.keyCode) {
            case this.keys.TOP:
              if (this.posY >= this.posY0) {
                this.jump()
              }
              break;
            case this.keys.SPACE:
              this.shoot();
              break;
            case this.keys.RIGHT:
                //console.log(this.keys.RIGHT)
              this.posX += this.movement
              break;
            case this.keys.LEFT:
              this.posX -= this.movement
              break;
  
          }
        });
    }

        jump() {
            this.posY -= 80;
            this.velY -= 8;
        }

        /*document.addEventListener("keydown", e => {
        switch (e.keyCode) {
            case this.keys.TOP:
              if (this.posY >= this.posY0) {
                this.jump()
              }
              break;
            case this.keys.SPACE:
              this.shoot();
              break;
            case this.keys.RIGHT:
                console.log(this.keys.RIGHT)
              this.advLoR()
              break;
  
          }
        });*/  

        /*document.addEventListener("keydown", e => {
            console.log(e.keyCode)
            // 37 is the code for the left arrow key
            if (e.keyCode == 37) {
                this.keys.left = true;
            }
            // 38 is the code for the up arrow key
            if (e.keyCode == 38) {
                if (this.jump == false) {
                    this.posY0 = -10;
                }
            }
            // 39 is the code for the right arrow key
            if (e.keyCode == 39) {
                this.keys.right = true;
            }

        });

        document.addEventListener("keyup", e => {
            if (e.keyCode == 37) {
                this.keys.left = false;
            }
            if (e.keyCode == 38) {
                if (this.posY0 < -2) {
                    this.posY0 = -3;
                }
            }
            if (e.keyCode == 39) {
                this.keys.right = false;
            }
        });*/

        /*document.addEventListener("keyup", e => {
            switch (e.keyCode) {
              case this.keys.TOP:
                if (this.posY >= this.posY0) {
                  this.jump()
                }
                break;
              case this.keys.SPACE:
                this.shoot();
                break;
              case this.keys.RIGHT:
                  console.log(this.keys.RIGHT)
                this.advLoR()
                break;
  
            }
  
          });*/


    

    /*moveNjump() {
        // If the player is not jumping apply the effect of frictiom
        if (this.jump == false) {
            this.posX0 *= this.friction;
        } else {
            // If the player is in the air then apply the effect of gravity
            this.posY0 += this.gravity;
        }
        this.jump = true;
        // If the left key is pressed increase the relevant horizontal velocity
        if (this.keys.left) {
           this.posX0 = -2.5;
        }
        if (this.keys.right) {
            this.posX0 = 2.5;
        }
        // Updating the y and x coordinates of the player
        this.posY += this.posY0
        this.posX += this.posX0

    }*/



    shoot() {
        this.bullets.push(new Bullets(this.ctx, this.posX, this.posY, this.posY0, this.width, this.height));
      }
    
      clearBullets() {
        this.bullets = this.bullets.filter(bull => bull.posX <= this.gameWidth);
      }
}