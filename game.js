const Game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    FPS: 30,
    framesCounter: 0,
    background: undefined,
    player: undefined,
    //obstacles:[],
    keys: {
        TOP: 38,
        SPACE: 32,
        LEFT: 37,
        RIGHT:39,
      },
    /*keys: {
        RIGHT: false,
        LEFT: false,
        RIGHT: false, 
    },*/

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


            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++

       }, 1000 / this.FPS)
    },

    reset() {
        this.background = new Background(this.ctx, this.width, this.height, "./img/Fondo0b.png");
        this.player = new Player(this.ctx, this.width, this.height, this.keys);
        
        alert("inicia juego")
        //this.obstacles[];
    },

    drawAll(){
        this.background.draw()
        this.player.draw(this.framesCounter)
      //  this.obstacles.forEach(obs => obs.draw())

    },

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    },

};