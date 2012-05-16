var world	= tQuery.createWorld().boilerplate().start();
world.renderer().setClearColorHex( 0x000000, world.renderer().getClearAlpha() );
tQuery.createAmbientLight().addTo(world).color(0x444444);
tQuery.createDirectionalLight().addTo(world).position(-1,1,1).color(0xFF88BB).intensity(3);
tQuery.createDirectionalLight().addTo(world).position( 1,1,-1).color(0x4444FF).intensity(2);
world.addFogExp2({density : 0.1});

var material	= new THREE.MeshLambertMaterial({
	ambient	: 0xFFFFFF,
	color	: 0xFFAAAA,
	map	: THREE.ImageUtils.loadTexture('assets/images/water.jpg')
});

// ### Build 15 Columns

// loop over each column
for(var i = 0; i < 15; i++ ){
	var column	= tQuery.createCylinder(0.2,0.2,2, material).addTo(world);
	column.translateX(i%2 ? +1 : -1).translateY(1).translateZ(15/2 + -1*i);
}

// # The Ground

tQuery.createCheckerboard({
	segmentsW	: 100,	// number of segment in width
	segmentsH	: 100	// number of segment in Height
}).addTo(world).scaleBy(100);
var character	= new tQuery.RatamahattaMD2Character().attach(world).hookKeyboard();
character.bind("loaded", function(){
	console.log("list animmation", Object.keys(character._meshBody.geometry.animations))
});
world.setCameraControls(new tQuery.MD2Character.CameraControls(character));
world.loop().hook(function(){
	var keyboard	= tQuery.keyboard();	// get keyboard instance
	if( keyboard.pressed("q") ){		// if the key 's' is pressed, change the skin
		character.setSkin(Math.floor(Math.random()*5));
	}
});
