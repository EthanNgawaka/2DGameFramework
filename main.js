class Player extends RigidBody{
	constructor(){
		super('player', 500,windowH*0.65,32,32);
		this.speed = 2000;
		this.vel = [0, 1000];
	}

	update(dt){
		this.input();
		super.update(dt);
	}

	input(){
		let movementVec = [0,0];
		if(keyPressed("KeyW")){
			this.vel[1] = -1000;
		}
		if(checkKey("KeyA")){
			movementVec[0] = -1;
		}
		if(checkKey("KeyS")){
			movementVec[1] = 1;
		}
		if(checkKey("KeyD")){
			movementVec[0] = 1;
		}
		this.applyForce(math.multiply(normalize(movementVec), this.speed));
	}
	
	draw(){
		drawRect(this.rect, "blue");
	}
}
class Wall extends StaticBody{
	constructor(x, y, w, h){
		super("wall", x, y, w, h);
	}
}
class Box extends RigidBody{
	constructor(x, y, w, h, mass = 1){
		super("box", x, y, w, h,  1/mass);
		this.vel = [0,100];
	}
	update(dt){
		super.update(dt);
	}
}
const world = new World();

world.addEntity(new Player(), "player", ["boxes", "walls"]);
world.addEntity(new Wall(0,windowH-100,windowW,100), "walls", ["boxes", "player"]);
world.addEntity(new Box(windowW/2,0,64,64,10), "boxes", ["boxes", "walls", "player"]);

function draw(){
	drawRect([0,0,windowW,windowH],"white");
	world.draw();
}

function update(dt){
	world.update(dt);
	world.collisions();
}

let previousTime = 0
function main(currentTime){ // requestAnimationFrame passes in a timestamp
	if(previousTime < 150){previousTime=currentTime;} // prevents skipping at startup
	const dt = (currentTime-previousTime)/1000; // in seconds
	previousTime = currentTime;

    update(dt);
    draw();

	oldKeys = {...keys};
	mouseUpdate();

	// recursive loop
	requestAnimationFrame(main);
}

requestAnimationFrame(main);
