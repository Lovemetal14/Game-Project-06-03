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
        this.posY0 = this.posY; //Salto
        this.movement = 10;
        this.up = false,

        this.velY = 1;
        this.gravity = 0.4;


        this.keys = keys;

        //this.bullets = [];

        this.setListeners();

    }


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
            this.height
        );

        this.animate(framesCounter)

        //this.bullets.forEach(bullet => bullet.draw())
        //this.clearBullets()
        this.move()
        //this.moveLoR()
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
        // If the player is not jumping apply the effect of frictiom
        if(this.up == false) {
            console.log("aqui iria la fricción")
            //player.x_v *= friction;
        } else {
            // If the player is in the air then apply the effect of gravity
            this.posY0 += this.gravity
            //player.y_v += gravity;
        }
        this.up = true;
        // If the left key is pressed increase the relevant horizontal velocity
        if(this.keys.left) {
            this.posX -= this.movement
            //player.x_v = -2.5;
        }
        if(this.keys.right) {
            this.posX += this.movement
            //player.x_v = 2.5;
        }
        // Updating the y and x coordinates of the player
        //player.y += player.y_v;
        //player.x += player.x_v;
    }

    setListeners() {

        document.addEventListener("keydown", e => {
            // 37 is the code for the left arrow key
            if (e.keyCode == 37) {
                this.keys.LEFT = true;
            }
            // 38 is the code for the up arrow key
            if (e.keyCode == 38) {
                if (this.keys.TOP == false) {
                    this.posY = -10;
                }
            }
            // 39 is the code for the right arrow key
            if (e.keyCode == 39) {
                this.keys.RIGHT = true;
            }
        });


        // This function is called when the pressed key is released
        document.addEventListener("keyup", e => {
                if (e.keyCode == 37) {
                    this.keys.LEFT = false;
                }
                if (e.keyCode == 38) {
                    if (this.posY < -2) {
                        this.posY = -3;
                    }
                }
                if (e.keyCode == 39) {
                    this.keys.RIGHT = false;
                }
            });
    }


    /*jump() {
        this.posY -= 80;
        this.velY -= 8;
    }

    jumpD() {
        this.posX += this.movement;
        this.posY -= 80;
        this.velY -= 8;

    }*/
}