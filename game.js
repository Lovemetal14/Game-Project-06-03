const Game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    FPS: 30, //60¿?
    framesCounter: 0,
    background: undefined,
    player: undefined,
    obstacles:[],
    /*keys: {
        TOP: 38,
        SPACE: 32,
        LEFT: 37,
        RIGHT:39,
      },*/
    keys: {
        top: false,
        left: false,
        right: false,
        space: 32,
    },

    init() {
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        //this.image = this.ctx.drawImage();
        this.setDimensions();
        this.start();
    },

    setDimensions() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    },

    start() {

        this.reset()

        this.interval = setInterval(() => {

            this.clear()
            this.drawAll()
            //this.drawBrick ("./img/brick.png")

            this.generateObstacles();
            this.clearObstacles();


            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
            this.isCollision() ? this.gameOver() : null
                            // ==== true, con el tem colisiones
       }, 1000 / this.FPS)
    },

    reset() {
        this.background = new Background(this.ctx, this.width, this.height, "./img/Fondo0b.png");
        this.player = new Player(this.ctx, this.width, this.height, this.keys);
        this.obstacles = [];

        alert("inicia juego")
        
    },

    drawAll(){
        this.background.draw()
        this.player.draw(this.framesCounter)
        this.obstacles.forEach(obs => obs.draw(this.framesCounter))

        //this.bullets.draw()

    },


    clear() { 
        this.ctx.clearRect(0, 0, this.width, this.height);
    },

    generateObstacles() {
         if (this.framesCounter % 250 === 0) {
             this.obstacles.push(new Obstacle(this.ctx, this.width, this.player.posY0, this.player.height));
         }},

    clearObstacles() {
    this.obstacles = this.obstacles.filter(obs => obs.posX >= 0)
   },

    
                            //pos -> obstacles 
                            //pos2 -> bullets
                            //pos2.posX     
                            //playerHeight -> this.player.height

     bulletTouchEnemie(){ //this.bullets this.obstacles
        for (let i = 0; i < this.obstacles.length; i++) {
            let pos = this.obstacles[i];
            for (let j = 0; j < this.player.bullets.length; j++) {
                let pos2 = this.player.bullets[j];

                if (pos.posX + pos.spriteWidth > pos2.posX &&
                    pos.posX < pos2.posX + pos2.playerHeight &&
                    pos.posY + pos.spriteHeight > pos2.posY &&
                    pos.posY < pos2.posY + pos2.playerHeight) {

                    // Remove the enemy
                    this.obstacles.splice(i, 1);
                    i--;
                    this.score += 100;
                    this.player.bricks.splice(j, 1);
                    break;
                }
            }
        }

    },
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



    isCollision() { //esta misma nos vale tambien para los enemigos
        return this.obstacles.some(obs => {
            return (
                this.player.posX + this.player.width >= obs.posX &&
                this.player.posY + this.player.height >= obs.posY &&
                this.player.posX <= obs.posX + obs.width
            );
        });
    },

    gameOver() {
        clearInterval(this.interval);
    }



};