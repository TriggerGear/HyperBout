
var hyperBout = function()
{
	
    return new CanvasWrapper('backgroundCanvas', 1122, 548);
};

var Engine = function()
{	
	//Test the update and draw methods
	var testX = 0;
	var testY = 0;

	//Create a new hyperBout object.
    this.hyperBout = hyperBout();

    //Create an image and set the source to the background, add it to HyperBout canvas context
    var backgroundImg = new Image();
    backgroundImg.src = 'images/Background.png';
    this.hyperBout.ctx.drawImage(backgroundImg, 0, 0);

    //Create the player
    var player = new Player();
    
    //Start the engine
    this.start(this);
};
//Set the frames per second to 30
var FPS = 30;
Engine.prototype.start = function(engine)
{
	setInterval(function()
	{
		update(engine);
		draw(engine);
	}, 1000/30);
};
//Draw text to test updating
function draw(args){
	args.hyperBout.canvas.fillStyle = "#000";
	//args.hyperBout.canvas.fillText("TESTING", 0, 0);
}
//Move the text diagonal
function update(args){
	args.textX += 1;
	args.textY += 1;
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
	var healthPoints = 5;
	var playerNumber = 1;
	//Movement and location variables
	var xpos = 100;
	var ypos = 100;
	var xspeed = 1;
	var yspeed = 0;

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

