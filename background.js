class Background {

    constructor(ctx, w, h, imgSource) {
        this.ctx = ctx;
        this.width = w;
        this.height = h;

        this.image = new Image();
        this.image.src = imgSource;

        this.posX = 0;   //german en el video: this.canvas.posX
        this.posY = 0;   //german en el video: this.canvas.posY

        this.velX = 1;   //german en el video: this.canvas.velX
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
        this.ctx.drawImage(this.image, this.posX + this.width, this.posY, this.width, this.height);
        this.move()
    }

    move() {
        if (this.posX <= -this.width) {
            this.posX = 0;
        }
        this.posX -= this.velX;
    }
}