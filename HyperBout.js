

var hyperBout = function()
{
    this.width = 1122;
    this.height = 548;
    return new CanvasWrapper('backgroundCanvas', 'entityCanvas', width, height);
};

var Engine = function()
{   
    //Test the update and draw methods
    this.textX = 0;
    this.textY = 0;

    //Create a new hyperBout object.
    this.hyperBout = hyperBout();

    //Create an image and set the source to the background, add it to HyperBout canvas context
    var backgroundImg = new Image();
    backgroundImg.src = 'images/Background.png';
    this.hyperBout.ctx.drawImage(backgroundImg, 0, 0);

    //Create the player
    this.player = new Player();
    
    //Start the engine
    this.start();
};

Engine.InputHandlers = [ ];

Engine.InputHandler = function(tag, handler) {
    this.tag = tag;
    this.handler = handler;
};

Engine.RegisterInputHandler = function(inputHandler) {
    if (!(inputHandler instanceof Engine.InputHandler)) {
        throw "Error, I only accept Engine.InputHandler types";
    } 
    Engine.InputHandlers.push(inputHandler);
};

Engine.HandleInput = function(event) {
    for (var i = 0; i < Engine.InputHandlers.length; i++) {
        Engine.InputHandlers[i].handler(event);
    }
};

Engine.RemoveInputHandler = function(tag) {
    for (var i = 0; i < Engine.InputHandlers.length; i++) {
        if (Engine.InputHandlers[i].tag == tag) {
            // an array in javascript is just a list
            // splice(startIndex, numElementsToRemove, [elementsToAdd])
            // the following line just removes the element at i
            Engine.InputHandlers.splice(i, 1);
        }
    }
}

//Set the frames per second to 
var FPS = 30;
Engine.prototype.start = function()
{
    // use jQuery to bind to all key press events
    $(window).keypress(Event.HandleInput);

    var self = this;
    setInterval(function()
    {
        self.update();
        self.draw();
        self.player.draw(self.hyperBout.entityctx);
        self.player.move();
    }, 1000/FPS);
};
//Draw text to test updating
Engine.prototype.draw = function()
{
    //Clear the canvas
    this.hyperBout.entityctx.clearRect(0, 0, this.hyperBout.width, this.hyperBout.height);
    
    //Test text drawing
    this.hyperBout.entityctx.fillStyle = "#ffffff";
    this.hyperBout.entityctx.fillText("TESTING", this.textX, this.textY);
    this.hyperBout.entityctx.fillText(this.textX, 50,50);


}
//Move the text diagonal
Engine.prototype.update = function()
{
    this.textX += 1;
    this.textY += 1;
}
//Canvas wrapper
function CanvasWrapper(backCanvasId, entityCanvasId, width, height) {
    //Canvas for storing the background image
    this.canvas = document.getElementById(backCanvasId);
    this.ctx = this.canvas.getContext('2d');
    //Canvas for drawing entities such as players and projectiles.
    this.entityCanvas = document.getElementById(entityCanvasId);
    this.entityctx = this.entityCanvas.getContext('2d');
    this.width = width;
    this.height = height;
}

//Player class
var Player = function(){
    this.healthPoints = 5;
    this.playerNumber = 1;
    //Movement and location variables
    this.xpos = 100;
    this.ypos = 100;
    this.xspeed = 1;
    this.yspeed = 0;
    //Maximum Boundary Variables
    this.minx = 0;
    this.miny = 0;
    this.maxx = 1122;
    this.maxy = 548;

    //Player image
    this.playerImage = new Image();
    this.playerImage.src = 'images/playerStationary.png';
    var self = this;
    Engine.RegisterInputHandler(new Engine.InputHandler('player', function(event) {
        if (Player.IsMovementKey(event.which)) {
            self.move(event);
        }
    }));

};

Player.IsMovementKey = function(keyCode) {
    return keyCode == 97  || // 'a'
           keyCode == 115 || // 's'
           keyCode == 119 || // 'w'
           keyCode == 100;   // 'd'
};

Player.prototype.draw = function(canvasctx)
{
    canvasctx.drawImage(this.playerImage, this.xpos, this.ypos);
}
//Movement function for players
Player.prototype.move = function(args)
{
    
}
//Sets the location for each player based on the player number.
Player.prototype.setLocation = function(playerList){
    
}
