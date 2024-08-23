let sceneManager = new SceneManager();

class Player extends RigidBody{
	constructor(){
		super("p1", 0,0,32,32, "Player");
	}
	update(dt){
		this.input(dt);
		super.update(dt);
	}
	input(dt){
		if(checkKey("KeyA")){
			this.applyImpulse([-20, 0]);
		}
		if(checkKey("KeyD")){
			this.applyImpulse([20, 0]);
		}
		if(checkKey("KeyW")){
			this.applyImpulse([0, -300]);
		}
	}
}

class testScene extends Scene{
	constructor(name, reset=false){
		super(name);
		this.reset = reset;
	}
	enter(){
		if(this.reset){
			this.init();
		}else{
			console.log("this scene will not reset");
		}
	}
	init(){
		this.world = new World();
		let newCollisionRules = {
			"Player": ["Wall", "Box"],
			"Wall": [],
			"Box": ["Wall", "Box"],
		};
		this.world.updateCollisionRules(newCollisionRules);

		let sb = new StaticBody("wall1", 100, 200, 100, 50, "Wall");
		this.world.addEntity(sb);

		sb = new StaticBody("wall2", 200, 300, 100, 50, "Wall");
		this.world.addEntity(sb);

		sb = new StaticBody("wall3", 0, 400, windowW, 50, "Wall");
		this.world.addEntity(sb);

		this.world.addEntity(new Player());

		for(let i = 0; i < 10; i ++){
			let rb = new RigidBody("box" + i, math.random(0,windowW-100), -50*i, 50, 50, "Box");
			this.world.addEntity(rb);
		}
	}
}

sceneManager.addScene(new testScene("test"));
sceneManager.switchTo("test");

sceneManager.addScene(new testScene("test2", true));
sceneManager.switchTo("test2");

function draw(){
	drawRect([0,0,windowW,windowH],"white");
	sceneManager.draw();
}

function update(dt){
	sceneManager.update(dt);

	if(keyPressed("Space")){
		sceneManager.switchTo("test");
	}
	if(keyPressed("KeyL")){
		sceneManager.switchTo("test2");
	}
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
