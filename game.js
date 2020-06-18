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
    score: 0,
    live: 100,
    keys: {
        TOP: 38,
        SPACE: 32,
        LEFT: 37,
        RIGHT:39,
      },
    /*keys: {
        top: false,
        left: false,
        right: false,
        space: 32,
    },*/

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

            
            this.bulletTouchEnemie ();
            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
            
            this.isCollision() ? this.live -= 10 : null
            //this.isCollision() ? this.gameOver() : null
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
        this.drawScore();
        this.drawLive();
       },

    drawScore() {
        /* this.obstacles.forEach(obs => {
             if (obs.posY === this.car.posY) {
                 this.score++
             }
         })*/
         this.ctx.font = "30px sans-serif"
         this.ctx.fillStyle = 'white'
         this.ctx.fillText(`SCORE:${this.score}`, 50, this.height - 55)
     },

     drawLive() {
        /* this.obstacles.forEach(obs => {
             if (obs.posY === this.car.posY) {
                 this.score++
             }
         })*/
         this.ctx.font = "30px sans-serif"
         this.ctx.fillStyle = 'white'
         this.ctx.fillText(`LIVE:${this.live}`, 300, this.height - 55)
     },



    clear() { 
        this.ctx.clearRect(0, 0, this.width, this.height);
    },

    generateObstacles() {
         if (this.framesCounter % 100 === 0) {
             this.obstacles.push(new Obstacle(this.ctx, this.width, this.player.posY0, this.player.height));
         }},

    clearObstacles() {
    this.obstacles = this.obstacles.filter(obs => obs.posX >= 0)
   },


 
    
    
                            //pos -> obstacles 
                            //pos2 -> bullets
                            //pos2.posX     
                            //playerHeight -> this.player.height
// anchura del sprite --> Math.floor(this.image.width / this.image.frames)

     bulletTouchEnemie(){ //this.bullets this.obstacles
        //console.log(this.obstacles)
        //console.log(this.player.bullets)
        for (let i = 0; i < this.obstacles.length; i++) {
            let pos = this.obstacles[i];
            for (let j = 0; j < this.player.bullets.length; j++) {
                let pos2 = this.player.bullets[j];

            console.log("posicion obstacle" + pos.posX)
                
                if (pos.posX + pos.image.width / 5 > pos2.posX &&            
                    pos.posX < pos2.posX + pos2.height &&
                    pos.posY + pos.image.width > pos2.posY &&             
                    pos.posY < pos2.posY + pos2.height) {
                                            

                    // Remove the enemy
                    this.obstacles.splice(i, 1);
                    i--;
                    this.score += 50;
                    console.log(this.score)
                    this.player.bullets.splice(j, 1); 
                    break;
                }
            }
        }

    },
     
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
    },


};





 