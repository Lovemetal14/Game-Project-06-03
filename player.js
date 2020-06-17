class Player {

    constructor(ctx, gameW, gameH, keys) {

        this.ctx = ctx;

        this.gameWidth = gameW; //gameSize : tal y objeto
        this.gameHeight = gameH;

        this.width = 150;     //playerSize : tal y objeto con width y height
        this.height = 150;
       //this canvasSize = canvasSize??
        this.image = new Image();
        this.image.src = "./img/peter2.png";
        this.image.frames = 3;
        this.image.framesIndex = 0;

        this.posX = 120;
        this.posY = this.gameHeight - this.height - 180;
        this.posX0 = this.posX;
        this.posY0 = this.posY; //Salto
        this.movement = 10;
        //this.up = 20;
        this.jump = true,

        this.velY = 0.5;
        this.gravity = 0.5;
        this.friction = 0.7;

        this.keys = keys;

        this.bullets = [];

        this.setListeners();
        setInterval(this.moveNjump,1000)
        
        //this.moveNjump();

    }


    draw(framesCounter) {

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
        //Lo devuelve a posicion original despues de jump
        if (this.posY < this.posY0) {
            this.posY += this.velY;
            this.velY += this.gravity;
        } else {
            this.posY = this.posY0;
            this.velY = 1;
        }
    }

   /* setListeners() {
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
        }*/

   //set listeners para dos teclas a la vez - true or false    
   setListeners(){
        //Keydown 
    console.log(typeof(this.keys.left))

        document.addEventListener("keydown", e => {
            
            // 37 is the code for the left arrow key
            if (e.keyCode == 37) {
                this.keys.left = true;
            }
            // 38 is the code for the up arrow key
            if (e.keyCode == 38) {
                if (this.jump == false) {
                    this.posY0 = -80;
                }
            }
              // 39 is the code for the right arrow key
            if (e.keyCode == 39) {
                this.keys.right = true;
            }

             // 32 is the code for the Space arrow key
            if(e.keyCode == 32){
                this.shoot();
            }
        });

    //keyup

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
        });
        
  
    };

  //cierre setlisteners keys true false

    moveNjump() {
        
        // If the player is not jumping apply the effect of friction
        if (this.jump == false) {
            alert('llega a move n jump')
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

    }

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
        this.bullets.push(new Bullets(this.ctx, this.posX, this.posY, this.posY0, this.width, this.height));
      }
    
      clearBullets() {
        //console.log("gameh " + this.gameHeight)
        this.bullets = this.bullets.filter(bull => bull.posX <= this.gameWidth);  

        //this.bullets = this.bullets.filter(bull => bull.posY + 100 >= this.gameHeight);
}

}