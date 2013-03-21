
var hyperBout = function()
{
    this.width = 1122;
    this.height = 548;
    return new CanvasWrapper('backgroundCanvas', width, height);
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
//Set the frames per second to 
var FPS = 30;
Engine.prototype.start = function()
{
    var self = this;
    setInterval(function()
    {
        self.update();
        self.draw();
    }, 1000/FPS);
};
//Draw text to test updating
Engine.prototype.draw = function()
{
	this.hyperBout.ctx.clearRect(0, 0, this.hyperBout.width, this.hyperBout.height);
	 //Create an image and set the source to the background, add it to HyperBout canvas context
    var backgroundImg = new Image();
    backgroundImg.src = 'images/Background.png';
    this.hyperBout.ctx.drawImage(backgroundImg, 0, 0);
    this.hyperBout.ctx.fillStyle = "#ffffff";
    this.hyperBout.ctx.fillText("TESTING", this.textX, this.textY);
}
//Move the text diagonal
Engine.prototype.update = function()
{
    this.textX += 1;
    this.textY += 1;
}
//Canvas wrapper
function CanvasWrapper(domId, width, height) {
    this.canvas = document.getElementById(domId);
    this.ctx = this.canvas.getContext('2d');
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
    var minx = 0;
    var miny = 0;
    var maxx = 1122;
    var maxy = 548;

    //Player image
    var playerImage = new Image();
    playerImage.src = 'images/playerStationary.png';

};
//Movement function for players
Player.prototype.move = function(args)
{

}
//Sets the location for each player based on the player number.
Player.prototype.setLocation = function(playerList){
    
}
