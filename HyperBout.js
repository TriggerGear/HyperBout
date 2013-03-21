

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
    var self = this;
    $(document).ready(function() { self.start(); });
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
    $(document).keydown(Engine.HandleInput);
    $(document).keyup(Engine.HandleInput);

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
    this.direction = 0;
    //Movement and location variables
    this.xpos = 68;
    this.ypos = 68;
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
            if (event.type == 'keydown') {
                self.onKeyDown(event);
            }
            else if (event.type == 'keyup') {
                self.onKeyUp(event);
            }
        }
    }));

};

Player.IsMovementKey = function(keyCode) {
    return keyCode == HyperKeys.Codes['a'] ||
           keyCode == HyperKeys.Codes['s'] || // 's'
           keyCode == HyperKeys.Codes['w'] || // 'w'
           keyCode == HyperKeys.Codes['d'];   // 'd'
};

Player.prototype.onKeyDown = function(event) {
    this.direction = this.combineKey(event.which, this.direction);
};

Player.prototype.onKeyUp = function(event) {
    this.direction = this.removeKey(event.which, this.direction);
};

Player.prototype.draw = function(canvasctx)
{
    canvasctx.drawImage(this.playerImage, this.xpos, this.ypos);
};
//Movement function for players
Player.prototype.move = function(args)
{
    var vec = this.getMoveVector();
    this.xpos += vec.x;
    this.ypos += vec.y;

    this.xpos = Math.max(this.minx, this.xpos);
    this.ypos = Math.max(this.miny, this.ypos);
    this.xpos = Math.min(this.maxx, this.xpos);
    this.ypos = Math.min(this.maxy, this.ypos);
};

Player.prototype.getMoveVector = function() {
    var direction = this.direction;

    if (direction == 0) {
        return { x: 0, y: 0 };
    }

    switch(direction) {
        case Player.MoveLeft: return {
            x: -2, y: 0
        };
        case Player.MoveUp: return {
            x: 0, y: -2
        };
        case Player.MoveRight: return {
            x: 2, y: 0
        };
        case Player.MoveDown: return {
            x: 0, y: 2
        };
        case Player.MoveLeft | Player.MoveUp : return {
            x: -Player.DiagLength, y: -Player.DiagLength
        };
        case Player.MoveLeft | Player.MoveDown: return {
            x: -Player.DiagLength, y: Player.DiagLength
        };
        case Player.MoveRight | Player.MoveUp: return {
            x: Player.DiagLength, y: -Player.DiagLength
        };
        case Player.MoveRight | Player.MoveDown: return {
            x: Player.DiagLength, y: Player.DiagLength
        };
    }
    return { x: 0, y: 0 };
};

//Sets the location for each player based on the player number.
Player.prototype.setLocation = function(playerList){
    
}

Player.prototype.combineKey = function(keyCode, direction) {
    switch(keyCode) {
        case HyperKeys.Codes['a']: direction |= 1; break;
        case HyperKeys.Codes['s']: direction |= 2; break;
        case HyperKeys.Codes['w']: direction |= 4; break;
        case HyperKeys.Codes['d']: direction |= 8; break;
    }
    return direction;
}

Player.prototype.removeKey = function(keyCode, direction) {
    switch(keyCode) {
        case HyperKeys.Codes['a']: direction ^= 1; break;
        case HyperKeys.Codes['s']: direction ^= 2; break;
        case HyperKeys.Codes['w']: direction ^= 4; break;
        case HyperKeys.Codes['d']: direction ^= 8; break;
    }
    return direction;
}

Player.MoveLeft  = 1;
Player.MoveDown  = 2;
Player.MoveUp    = 4;
Player.MoveRight = 8;

Player.DiagLength = Math.sqrt(2);

HyperKeys = {};
HyperKeys.Codes = {
    'backspace': 8,
    'tab': 9,
    'enter': 13,
    'shift': 16,
    'ctrl': 17,
    'alt': 18,
    'pause': 19,
    'caps': 20,
    'escape': 27,
    'page_up': 33,
    'page_down': 34,
    'end': 35,
    'home': 36,
    'left_arrow': 37,
    'up_arrow': 38,
    'right_arrow': 39,
    'down_arrow': 40,
    'insert': 45,
    'delete': 46,
    '0': 48,
    '1': 49,
    '2': 50,
    '3': 51,
    '4': 52,
    '5': 53,
    '6': 54,
    '7': 55,
    '8': 56,
    '9': 57,
    'a': 65,
    'b': 66,
    'c': 67,
    'd': 68,
    'e': 69,
    'f': 70,
    'g': 71,
    'h': 72,
    'i': 73,
    'j': 74,
    'k': 75,
    'l': 76,
    'm': 77,
    'n': 78,
    'o': 79,
    'p': 80,
    'q': 81,
    'r': 82,
    's': 83,
    't': 84,
    'u': 85,
    'v': 86,
    'w': 87,
    'x': 88,
    'y': 89,
    'z': 90,
    'left_window_key': 91,
    'right_window_key': 92,
    'select': 93,
    'numpad_0': 96,
    'numpad_1': 97,
    'numpad_2': 98,
    'numpad_3': 99,
    'numpad_4': 100,
    'numpad_5': 101,
    'numpad_6': 102,
    'numpad_7': 103,
    'numpad_8': 104,
    'numpad_9': 105,
    'numpad_*': 106,
    'numpad_+': 107,
    'numpad_-': 109,
    'numpad_.': 110,
    'numpad_/': 111,
    'f1': 112,
    'f2': 113,
    'f3': 114,
    'f4': 115,
    'f5': 116,
    'f6': 117,
    'f7': 118,
    'f8': 119,
    'f9': 120,
    'f10': 121,
    'f11': 122,
    'f12': 123,
    'num_lock': 144,
    'scroll_lock': 145,
    ';': 186,
    '=': 187,
    ',': 188,
    '-': 189,
    '.': 190,
    '/': 191,
    '`': 192,
    '[': 219,
    '\\': 220,
    ']': 221,
    "'": 222
};

HyperKeys.ReverseCodes = (function(codes) {
    var reverse = {};
    for (var prop in codes) {
        if (codes.hasOwnProperty(prop)) {
            reverse[codes[prop]] = prop;
        }
    }
    return reverse;
})(HyperKeys.Codes);