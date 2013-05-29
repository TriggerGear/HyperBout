//Creating a box2d namespace, so we can call the instances
//by just doing box2d.b2Vec2 etc.
var box2d = {
   b2Vec2 : Box2D.Common.Math.b2Vec2,
   b2BodyDef : Box2D.Dynamics.b2BodyDef,
   b2Body : Box2D.Dynamics.b2Body,
   b2FixtureDef : Box2D.Dynamics.b2FixtureDef,
   b2Fixture : Box2D.Dynamics.b2Fixture,
   b2World : Box2D.Dynamics.b2World,
   b2MassData : Box2D.Collision.Shapes.b2MassData,
   b2PolygonShape : Box2D.Collision.Shapes.b2PolygonShape,
   b2CircleShape : Box2D.Collision.Shapes.b2CircleShape,
   b2DebugDraw : Box2D.Dynamics.b2DebugDraw
};
//Box2d measures things in meters, to compensate
//we are going to be converting it to pixels. Scale to convert
//is 30. 
var SCALE = 30;
var world;


var hyperBout = function()
{
    this.width = 1122;
    this.height = 548;
    return new CanvasWrapper('backgroundCanvas', 'entityCanvas', width, height);
};

var Engine = function()
{   
    //Create a new hyperBout object.
    this.hyperBout = hyperBout();

    //Create an image and set the source to the background, add it to HyperBout canvas context
    var backgroundImg = new Image();
    backgroundImg.src = 'images/Background.png';
    this.hyperBout.ctx.drawImage(backgroundImg, 0, 0);

   

    //Variable reference to this engine
    var self = this;
    //Set dem physics
    self.setupPhysics();
    //Create the player
    this.player = new Player();

    entityCanvas.onclick = function()
    {
        var slash = Engine.prototype.MuteUnmuteAudio('audiofiles/stab.wav', false);

        var fixDef = new box2d.b2FixtureDef();
        fixDef.density = 1;
        fixDef.friction = 0.5;
        fixDef.restiution = 0.5;

        var bodyDef = new box2d.b2BodyDef();
        bodyDef.type = box2d.b2Body.b2_dynamicBody; //We're setting the ground to static.
        bodyDef.position.x =Math.random()*1122 / SCALE; //Registration point is in the center for box2d entities.
        bodyDef.position.y = 0;
        fixDef.shape = new box2d.b2CircleShape(Math.random()*100 / SCALE); //setting the shape of the ground.
        
        world.CreateBody(bodyDef).CreateFixture(fixDef);
    }

    //Start the engine, vroom!
    $(document).ready(function() { self.start(); });
};
//Awe yeah sweeet physaks
Engine.prototype.setupPhysics = function()
{
    //The b2Vec2 require 2 variables, gravity for X and Y axis. Since we don't want
    //any gravity on the X axis, we set it to 0 and we'll set Y to 50 for now.
    //true at the end means we're allowing bodies to sleep, this improves performance
    //when entities come to a halt.
    world = new box2d.b2World(new box2d.b2Vec2(0,50), true);

    //Create ground
    var fixDef = new box2d.b2FixtureDef();
    fixDef.density = 1;
    fixDef.friction = 0.5;

    //Now we need to define the body, static (not affected by gravity), dynamic (affected by grav)
    var bodyDef = new box2d.b2BodyDef();
    bodyDef.type = box2d.b2Body.b2_staticBody; //We're setting the ground to static.
    bodyDef.position.x = 1122 / 2 / SCALE; //Registration point is in the center for box2d entities.
    bodyDef.position.y = 548 / SCALE;
    fixDef.shape = new box2d.b2PolygonShape; //setting the shape of the ground.
    fixDef.shape.SetAsBox((1122 / SCALE) / 2, (20 / SCALE)/2);
    //Add the ground to the world, yeah!
    world.CreateBody(bodyDef).CreateFixture(fixDef);

    var testFix = new box2d.b2FixtureDef();
    testFix.density = 1;
    testFix.friction = 0.5;
    var testDef = new box2d.b2BodyDef();
    testDef.type = box2d.b2Body.b2_staticBody;
    testDef.position.x = 200 / 2 / SCALE;
    testDef.position.y = 200 / 2 / SCALE;
    testFix.shape = new box2d.b2PolygonShape;
    testFix.shape.SetAsBox((300/SCALE)/2, (20 / SCALE) / 2);
    world.CreateBody(testDef).CreateFixture(testFix);

    //Box2d has some nice default drawing, so let's draw the ground.
    var debugDraw = new box2d.b2DebugDraw();
    debugDraw.SetSprite(document.getElementById("entityCanvas").getContext("2d"));
    debugDraw.SetDrawScale(SCALE);
    debugDraw.SetFillAlpha(0.3);
    debugDraw.SetLineThickness(1.0);
    //Says what we want to draw
    debugDraw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);
}
//Array of input handlers
Engine.InputHandlers = [ ];

Engine.InputHandler = function(tag, handler) {
    this.tag = tag;
    this.handler = handler;
};

Engine.UpdateState = function(){
    //Stores all of the current powerups on the field
    var powerUps = new Array();
    //Stores the time left inside the game.
    var timeLeft;
    //STores the number of players currently inside the game.
    var players;
    //Top player stores the current player with the most points
    var topPlayer;

}

//play music without loop if bool sets to false
//returns the audio object.
Engine.prototype.MusicPlayer = function(soundFile, bool)
{
    //create a new audio
    var myAudio = document.createElement('audio');
    //set the source to soundfile
    myAudio.setAttribute('src', soundFile);
    myAudio.loop = bool;
    //audio is not muted at first.
    myAudio.muted = false;
    myAudio.play();
    return myAudio;
}

//mainly for sound effects. For a check if the mute button is pressed or not.
Engine.prototype.MuteUnmuteAudio = function(soundFile, bool)
{
    if(mute == false)
    {
        var slash = Engine.prototype.MusicPlayer(soundFile, bool);
    }
}

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

//Set the frames per second to 30
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
    world.Step(
        1 / FPS
        , 10
        , 10
        );
    world.DrawDebugData();
    world.ClearForces();
}
//Move the text diagonal
Engine.prototype.update = function()
{
    

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

    var fixDef = new box2d.b2FixtureDef();
    fixDef.density = 1;
    fixDef.friction = 0.5;

    //Now we need to define the body, static (not affected by gravity), dynamic (affected by grav)
    var bodyDef = new box2d.b2BodyDef();
    bodyDef.type = box2d.b2Body.b2_dynamicBody; //We're setting the ground to static.
    bodyDef.position.x = this.xpos  / SCALE; //Registration point is in the center for box2d entities.
    bodyDef.position.y = this.ypos / SCALE;
    bodyDef.fixedRotation = true;
    fixDef.shape = new box2d.b2PolygonShape; //setting the shape of the ground.
    fixDef.shape.SetAsBox((30 / SCALE) / 2, (40 / SCALE)/2);
    //Add the ground to the world, yeah!
    playerFixture = world.CreateBody(bodyDef).CreateFixture(fixDef);


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
    canvasctx.drawImage(this.playerImage, (playerFixture.GetBody().GetPosition().x * SCALE) - 15, (playerFixture.GetBody().GetPosition().y * SCALE) - 20);
};
//Movement function for players
Player.prototype.move = function(args)
{
    var vec = this.getMoveVector();
    //playerFixture.GetBody().GetPosition().x += vec.x / SCALE;
    //playerFixture.GetBody().GetPosition().y += vec.y / SCALE;

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
        case Player.MoveLeft:
         {
            playerFixture.GetBody().ApplyForce(new box2d.b2Vec2(-3 * SCALE, 0), playerFixture.GetBody().GetPosition());
            break;
        };
        case Player.MoveUp: return {
            x: 0, y: -2
        };
        case Player.MoveRight:{
            playerFixture.GetBody().ApplyForce(new box2d.b2Vec2(+3 * SCALE, 0), playerFixture.GetBody().GetPosition());
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
        //case HyperKeys.Codes['s']: direction |= 2; break;
        //case HyperKeys.Codes['w']: direction |= 4; break;
        case HyperKeys.Codes['d']: direction |= 8; break;
    }
    return direction;
}

Player.prototype.removeKey = function(keyCode, direction) {
    switch(keyCode) {
        case HyperKeys.Codes['a']: direction ^= 1; break;
        //case HyperKeys.Codes['s']: direction ^= 2; break;
        //case HyperKeys.Codes['w']: direction ^= 4; break;
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