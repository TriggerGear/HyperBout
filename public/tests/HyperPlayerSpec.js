describe("Hyper Player", function(){
	var player;
	beforeEach (function(){
		player = new HyperPlayer();
		player.setX(68);
		player.setY(68);
	});

	it("should be able to set position X correctly", function(){
		player.setX(89);
		expect(player.getX()).toEqual(89);
	});

	it("should be able to get position X correctly", function(){
		expect(player.getX()).toEqual(68);
	});

	it("should be able to set position Y correctly", function(){
		player.setY(89);
		expect(player.getY()).toEqual(89);
	});

	it("should be able to get position Y correctly", function(){
		expect(player.getY()).toEqual(68);
	});
});