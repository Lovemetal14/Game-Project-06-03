class Bullets {

    constructor(ctx, playerPosX, playerPosY, playerPosY0, playerWidth, playerHeight) {
        this.ctx = ctx;

        this.posX = playerPosX + playerWidth;
        this.posY = playerPosY + playerHeight / 2;

        this.playerPosY0 = playerPosY0;
        this.playerHeight = playerHeight;

        this.width = 50;
        this.height = 50;

        this.image = new Image()
        this.image.src = "./img/ladrillo_gira.png"
        this.image.frames = 3;
        this.image.framesIndex = 0;

        this.velX = 30;
        this.velY = 1;

        this.gravity = 1;
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
            this.height);

        this.animate(framesCounter)

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
        this.posX += this.velX;
        this.posY += this.velY;
        this.velY += this.gravity;
        
        if (this.posY >= this.playerPosY0 + this.playerHeight) {
            this.velY = -1 ;
        }
               
    }


}