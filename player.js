class Player {

    constructor(ctx, gameW, gameH, keys) {

        this.ctx = ctx;

        this.gameWidth = gameW; //gameSize : tal y objeto
        this.gameHeight = gameH;

        this.width = 150; //playerSize : tal y objeto con width y height
        this.height = 150;
        //this canvasSize = canvasSize??
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
        this.posY0 = this.posY; //Salto
        this.movement = 5;
        //this.up = 20;
        //this.jump = true;

        //this.movement = false;
        this.walkingR = false;
        this.walkingL = false;

        this.velY = 0.5;
        this.gravity = 0.6;
        this.friction = 0.7;

        this.keys = keys;

        this.bullets = [];

        this.setListeners();
        //setInterval(this.moveNjump, 1000)
    }


    draw(framesCounter) {

       /* this.ctx.drawImage(
            this.image,
            this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
            0,
            Math.floor(this.image.width / this.image.frames),
            this.image.height,
            this.posX,
            this.posY,
            this.width,
            this.height

        );*/
        // Draw sprites a izquierda o derecha, cuando funcionen las keys...
        
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
        document.addEventListener("keydown", e => {
          switch (e.keyCode) {
            case this.keys.TOP:
              if (this.posY >= this.posY0) {
                this.jump()
              }
              break;
           case this.keys.LEFT:
                this.posX -= this.movement;
                break;

           case this.keys.RIGHT:
                this.posX += this.movement;
                break;

            case this.keys.SPACE:
              this.shoot();
              break;
          }
        });
      }

      jump() {
        this.posY -= 80;
        this.velY -= 8;
      }

     /*setListeners() {
        document.addEventListener("keydown", e => {
        switch (e.keyCode) {

            case this.keys.LEFT:
              this.walkingL = true;
              break;

            case this.keys.TOP:
              if (this.jump == false) {
                this.posY0 = -10;
             }
            break;
            
            case this.keys.RIGHT:
            this.walkingR = true;
            break;  

            case this.keys.SPACE:
              this.shoot();
            break;
          }
        });

        document.addEventListener("keyup", e => {
        switch (e.keyCode) {
            case this.keys.LEFT:
              this.walkingL = false;
              break;

            case this.keys.TOP:
                if (this.posY0 < -2) {
                    this.posY0 = -3;
                }
            break;
            
            case this.keys.RIGHT:
            this.walkingR = false;
            break;  

          }
        });
        //console.log(this.walkingR)
        this.moveNjump();
    }

    moveNjump() {

        // If the player is not jumping apply the effect of friction
        if (this.jump == false) {

            this.posX0 *= this.friction;

        } else {
            // If the player is in the air then apply the effect of gravity
            this.posY0 += this.gravity;
           // console.log("pos Y: " + this.posY)
            //console.log("pos Y0: " + this.posY0)
        }
        this.jump = true;

        // If the left key is pressed increase the relevant horizontal velocity
        if (this.walkingL) {
            this.posX0 = -2.5;
        }
        if (this.walkingR) {
            
            this.posX0 = 2.5;
           // console.log("pos x: " + this.posX)
           // console.log("pos x0: " + this.posX0)

        }
        // Updating the y and x coordinates of the player
        this.posY += this.posY0
        this.posX += this.posX0
        this.posY0 = 0;
        this.posY = 700;

    }

    //set listeners para dos teclas a la vez con IFs y true or false    
    /*setListeners() {
        //Keydown 
        //console.log(typeof(this.keys.left))
        document.addEventListener("keydown", e => {

            // 37 is the code for the left arrow key
            if (this.keys.LEFT) {
                this.walkingL = true;
            }
            // 38 is the code for the up arrow key
            if (e.keyCode == 38) {
                if (this.jump == false) {
                    this.posY0 = -80;
                }
            }
            // 39 is the code for the right arrow key
            if (this.keys.RIGHT) {

                this.walkingR = true;
            }

            // 32 is the code for the Space arrow key
            if (e.keyCode == 32) {
                this.shoot();
            }
        });

        //keyup

        document.addEventListener("keyup", e => {
            if (this.keys.LEFT) {
                this.walkingL = false;
            }
            if (e.keyCode == 38) {
                if (this.posY0 < -2) {
                    this.posY0 = -3;
                }
            }
            if (this.keys.RIGHT) {

                this.walkingR = false;
            }
        });


    };*/

    //cierre setlisteners keys true false



    /*upToPlatform(){
             // A simple code that checks for collions with the platform
             let i = -1;
             if(platforms[0].x < player.x && player.x < platforms[0].x + platforms[0].width &&
             platforms[0].y < player.y && player.y < platforms[0].y + platforms[0].height){
                 i = 0;
             }
             if(platforms[1].x < player.x && player.x < platforms[1].x + platforms[1].width &&
             platforms[1].y < player.y && player.y < platforms[1].y + platforms[1].height){
                 i = 1;
             }
             if (i > -1){
                 player.jump = false;
                 player.y = platforms[i].y;    
             }
    }*/

    shoot() {
        //console.log("desde player:" + this.bullets)
        this.bullets.push(new Bullets(this.ctx, this.posX, this.posY, this.posY0, this.width, this.height));
    }

    clearBullets() {
        //console.log("gameh " + this.gameHeight)
        this.bullets = this.bullets.filter(bull => bull.posX <= this.gameWidth);

        //this.bullets = this.bullets.filter(bull => bull.posY + 100 >= this.gameHeight);
    }

}