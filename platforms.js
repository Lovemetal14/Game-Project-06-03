class Platform {
    constructor(ctx, gameWidth, playerPosY0, PlayerHeight) {
        this.ctx = ctx;
        this.width = 100;
        this.height = this.width;

        this.posX = gameWidth;
        this.posY = 700; //playerPosY0 + PlayerHeight - this.height;
              
        this.image = new Image()
        this.image.src =  "./img/platform-game.png"   //imagen a la plataforma
        this.image.frames = 1;
        this.image.framesIndex = 0;
        this.velX = 2;
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

        //this.animate(framesCounter)
        //let spriteWidth = Math.floor(this.image.width / this.image.frames)
        //alert("plataforma!")
        
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

   
        
    upToPlatform() {

    //A simple code that checks for collions with the platform
    let i = -1;
    if (this.platform[0].x < this.player.posX && this.player.posX < this.platform[0].x + this.platform[0].width &&
        this.platform[0].y < this.player.posY && this.player.posY < this.platform[0].y + this.platform[0].height) {
        i = 0;
    }
    if (this.platform[1].x < this.player.posX && this.player.posX < this.platform[1].x + this.platform[1].width &&
        this.platform[1].y < this.player.posY && this.player.posY < this.platform[1].y + this.platform[1].height) {
        i = 1;
    }
    if (i > -1) {
        this.player.jump = false;
        this.player.posY = this.platform[i].y;
    }
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
}