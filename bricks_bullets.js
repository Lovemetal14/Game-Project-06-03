class Bullets {

    constructor(ctx, playerPosX, playerPosY, playerPosY0, playerWidth, playerHeight) {
        this.ctx = ctx;
        this.posX = playerPosX + playerWidth;
        this.posY = playerPosY + playerHeight / 2;
        this.playerPosY0 = playerPosY0;
        this.playerHeight = playerHeight;

        this.velX = 10;
        this.velY = 1;

        this.gravity = 0.5;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.posX, this.posY, 40, 20, 15, 5);
        //new image drow imge ne vezde lo de abajo
        this.ctx.fill(),
        this.ctx.closePath(),
        this.move()
        //ojo insertar imagen de ladrillo!
    }

    move() {
        this.posX += this.velX;
        this.posY += this.velY;

        this.velY += this.gravity;

        if (this.posY >= this.playerPosY0 + this.playerHeight) {
            this.velY *= -1;
        }
    }
}
