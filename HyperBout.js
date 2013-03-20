var hyperBout = function()
{
	var background = document.getElementById('backgroundCanvas').getContext('2d');
	var hyperHeight = 700;
	var hyperWidth = 600;
	return{
		backgroundCanvas : backgroundC,
		height : hyperHeight,
		width : hyperWidth
	};

};

var Engine = function()
{
	this.hyperBout = hyperBout();
	backgroundImg = new Image();
	backgroundImg.src = 'images/Background.png';
	this.hyperBout.backgroundC.drawImage(backGroundImg,0,0);


}

Engine.prototype.start = function(args)
{
	
}