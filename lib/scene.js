class SceneManager{
    constructor(){
        this.currentScene = null;
        this.scenes = {};
    }

    addScene(scene){
        this.scenes[scene.name] = scene;
    }

    switchTo(name){
		if(name == this.currentScene){
			return;
		}
        if (this.scenes[this.currentScene]){
            this.scenes[this.currentScene].exit(); // exit current scene
        }
        this.currentScene = name;
        if (this.scenes[this.currentScene].world){
            this.scenes[this.currentScene].enter(); // start new scene
        }else{
			this.scenes[this.currentScene].init();
		}
    }

    update(dt){
		const scene = this.scenes[this.currentScene];
        if (scene) {
            scene.update(dt);
        }
    }

    draw(){
		const scene = this.scenes[this.currentScene];
        if (scene) {
            scene.draw();
        }
    }
}

class Scene{
	constructor(name){
		this.world = null;
		this.name = name;
	}

	init(){
		console.log("new scene initialized: " + this.name);
	}

	update(dt){
		this.world.update(dt);
	}

	draw(){
		this.world.draw();
	}

	enter(){
		console.log("Entering scene: " + this.name);
	}

	exit(){
		console.log("Exiting scene: " + this.name);
	}
}
