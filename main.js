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
