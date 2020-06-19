class Obstacle {
    constructor(ctx, gameWidth, playerPosY0, PlayerHeight) {
        this.ctx = ctx;
        this.width = 100;
        this.height = this.width;

        this.posX = gameWidth;
        this.posY = 750; 

        this.image = new Image()
        this.image.src = "./img/Gorilla5.png"
        this.image.frames = 5;
        this.image.framesIndex = 0;
        this.enemyW = 401
        this.enemyH = 55
        this.spriteWidth = this.enemyW / this.image.frames
        
        this.velX = 7;
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
        let spriteWidth = Math.floor(this.image.width / this.image.frames)

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
