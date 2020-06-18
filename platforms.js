class Platform {
    constructor(ctx, gameWidth, playerPosY0, PlayerHeight) {
        this.ctx = ctx;
        this.width = 100;
        this.height = this.width;

        this.posX = gameWidth;
        this.posY = playerPosY0 + PlayerHeight - this.height;


        //añadir imagen a la plataforma:

        this.image = new Image()
        //this.image.src = "./img/Gorilla5.png"   imagen a la plataforma
        this.image.frames = 5;
        this.image.framesIndex = 0;
        //this.spriteWidth = Math.floor(this.image.width / this.image.frames);
        //console.log("ancho sprite: " + this.spriteWidth)
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
        console.log("ancho sprite: " + spriteWidth)
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
 upToPlatform(){                  

 //A simple code that checks for collions with the platform
   let i = -1;
   if (platforms[0].x < this.player.posX && this.player.posX  < platforms[0].x + platforms[0].width &&
       platforms[0].y < this.player.posY && this.player.posY  < platforms[0].y + platforms[0].height) {
       i = 0;
   }
   if (platforms[1].x < this.player.posX  && this.player.posX  < platforms[1].x + platforms[1].width &&
       platforms[1].y < this.player.posY && this.player.posY < platforms[1].y + platforms[1].height) {
       i = 1;
   }
   if (i > -1) {
       player.jump = false;
       this.player.posY = platforms[i].y;
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
