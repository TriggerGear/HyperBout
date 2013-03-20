var hyperBout = function()
{
    return new CanvasWrapper('backgroundCanvas', 600, 700);
};

var Engine = function()
{
    this.hyperBout = hyperBout();
    var backgroundImg = new Image();
    backgroundImg.src = 'images/Background.png';
    this.hyperBout.ctx.drawImage(backgroundImg,0,0);
};

Engine.prototype.start = function(args)
{
    
};

function CanvasWrapper(domId, width, height) {
    this.canvas = document.getElementById(domId);
    this.ctx = this.canvas.getContext('2d');
    this.width = width;
    this.height = height;
}