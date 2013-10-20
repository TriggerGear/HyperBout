// Power Up Class
var PowerUp = function(xLocation){
	//Type of power up, 0 = health, 1 = shield
	this.type = 0;

	//Set the power up image
	this.powerUpImage = new Image();
	this.powerUpImage.src = '';

	//Create PowerUp Box2d body
	var fixDef = new box2d.b2FixtureDef();
    fixDef.density = 1;
    fixDef.friction = 0.5;
    fixDef.filter.maskBits = 0x0004;
    //Now we need to define the body, static (not affected by gravity), dynamic (affected by grav)
    var bodyDef = new box2d.b2BodyDef();
    bodyDef.type = box2d.b2Body.b2_dynamicBody; //We're setting the ground to static.
    bodyDef.position.x = xLocation / SCALE; //Registration point is in the center for box2d entities.
    bodyDef.position.y = -20 / SCALE;
    bodyDef.fixedRotation = true;
    fixDef.shape = new box2d.b2PolygonShape; //setting the shape of the ground.
    fixDef.shape.SetAsBox((10 / SCALE) / 2, (10 / SCALE)/2);
    fixDef.friction = 4;


    var powerUpFixture = world.CreateBody(bodyDef).CreateFixture(fixDef);
    powerUpFixture.SetUserData('PowerUp'+ this.type);

}

PowerUp.generateSpawnLocation = function(lowerRange, upperRange) { return Math.floor(Math.random()*(upperRange-lowerRange+1)+lowerRange); }