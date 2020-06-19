const Game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    FPS: 60,
    framesCounter: 0,
    background: undefined,
    player: undefined,
    obstacles:[],
    platform:[],
    score: 0,
    live: 200,
    sound: document.getElementById('zasSound'),
    keys: {
        TOP: 38,
        SPACE: 32,
        LEFT: 37,
        RIGHT:39,
      },

    init() {
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
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
            
            this.generateObstacles();
            this.clearObstacles();

            //this.generatePlatform(); //Sin platamormas
            //this.clearPlatform();
           
           
            this.bulletTouchEnemie ();
            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
            
            this.isCollision() ? this.live -= 10 : null
           
       }, 1000 / this.FPS)
    },

    reset() {
        this.background = new Background(this.ctx, this.width, this.height, "./img/Fondo definitivo.png");
        this.player = new Player(this.ctx, this.width, this.height, this.keys);
        this.obstacles = [];

        alert("inicia juego")
        
    },

    drawAll(){
        this.background.draw()
        this.player.draw(this.framesCounter)
        this.platform.forEach(plat => plat.draw(this.framesCounter))
        this.obstacles.forEach(obs => obs.draw(this.framesCounter))

        this.drawScore();
        this.drawLive();
       },

    drawScore() {
         this.ctx.font = "40px arial"
         this.ctx.fillStyle = 'white'
         this.ctx.fillText(`SCORE:${this.score}`, 50, this.height - 55)
     },

     drawLive() {
      
         this.ctx.font = "40px sans-serif" 
         this.ctx.fillStyle = 'white'
         this.ctx.fillText(`LIVE:${this.live}`, 300, this.height - 55)
     },

     drawGameOver() {
        this.ctx.font = "150px sans-serif"
        this.ctx.fillStyle = 'red'
         this.ctx.fillText("¡¡GAME OVER!!", 200, this.height - 500)
    },


    clear() { 
        this.ctx.clearRect(0, 0, this.width, this.height);
    },

    generateObstacles() {
         if (this.framesCounter % 100 === 0) {
             this.obstacles.push(new Obstacle(this.ctx, this.width, this.player.posY0, this.player.height));
         }},

    clearObstacles() {
    this.obstacles = this.obstacles.filter(obs => obs.posX >= -100)
   },

    generatePlatform() {
        if (this.framesCounter % 300 === 0) {
            this.platform.push(new Platform(this.ctx, this.width, this.player.posY0, this.player.height));
            
        } 
    },

    clearPlatform() {
        this.platform = this.platform.filter(plat => plat.posX >= -100) 
    },                                                      


     bulletTouchEnemie(){ 
     
        for (let i = 0; i < this.obstacles.length; i++) {
        let pos = this.obstacles[i];
        for (let j = 0; j < this.player.bullets.length; j++) {
        let pos2 = this.player.bullets[j];
                
        if (pos.posX + pos.image.width > pos2.posX &&            
        pos.posX < pos2.posX + pos2.height &&
        pos.posY + pos.image.width > pos2.posY &&             
        pos.posY < pos2.posY + pos2.height) {

                    
        this.obstacles.splice(i, 1);
        i--;
        this.sound.volume = 0.1
        this.sound.play()
        
        this.score += 50;
                  
        this.player.bullets.splice(j, 1); 
        break;
                   
         }
        }}
       },
     
    isCollision() { 
        this.obstacles.some(obs => {
        if (
        this.player.posX + this.player.width >= obs.posX &&
        this.player.posY + this.player.height >= obs.posY &&
        this.player.posX <= obs.posX + obs.width
        ){
        this.obstacles = this.obstacles.filter(cv => cv !== obs)
        this.live -= 10
        if (this.live == 0){

        this.drawGameOver();  
        this.gameOver();
                 
        }}             
           
    });},

    gameOver() {
        clearInterval(this.interval);
    },
};






 