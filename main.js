class Collider{
	constructor(rect, collisionLayer){
		this.rect = rect;
		this.collisionLayer = collisionLayer;
	}

	checkCollision(otherCollider){
		return AABBCollision(this.rect, otherCollider.rect);
	}
}

class Entity{
	constructor(id, x, y, w, h, collisionLayer){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.collider = new Collider(this.rect, collisionLayer);
		this.id = id
	}

	update(dt){ // to be overriden
		console.log("Update was not overriden! entity_id: " + this.id);
	}
	
	draw(){ // to be overriden
		console.log("Draw was not overriden! entity_id: " + this.id);
	}

	onCollision(otherEntity){ // to be overriden
		console.log("Collided with entity_id:" + otherEntity.id);
	}
	
	get rect(){
		return [x,y,w,h];
	}
}

class RigidBody extends Entity{
	constructor(id, x, y, w, h, collisionLayer){
		super(id, x, y, w, h, collisionLayer);
		this.invMass = 1; // and other various physics attributes
		this.vel = [0,0];
		this.forces = [0,0];
		this.drag = 0.95
	}

	update(dt){
		accel = math.multiply(this.invMass, this.forces);
		this.forces = [0,0];

		this.vel = math.add(this.vel, accel);
		this.vel = math.multiply(this.drag, this.vel);

		this.x += this.vel[0];
		this.y += this.vel[1];
	}

	applyForce(forceVec){
		this.forces = math.add(this.forces, forceVec);
	}

	draw(){
		// drawing can be handled by child classes
		drawRect(this.rect, "black");
	}
}

class StaticBody extends Entity{
	constructor(id, x, y, w, h, collisionLayer){
		super(id, x, y, w, h, collisionLayer);
		this.invMass = 1; // and other various physics attributes
	}

	update(dt){
		// static obj doesnt need to update 
	}

	draw(){
		// drawing can be handled by child classes
		drawRect(this.rect, "black");
	}
}

/*
 * so basically, a world contains a bunch of entities all of which have basic
 * functions like draw, update, onCollision, and a collider obj which
 * contains a collisionLayer, every entity on the same layer is checked for collision
 * maybe change later to handle multiple layers that the obj belongs to
 * then layers the obj collides with
 * to create other entities like a player class
 * class Player extends RigidBody{}
 * then just override draw and update but make sure to call super.update() for physics
 * stuff. Also override on collision funciton if needed, on collision just resolves
 * by moving mtv and other physicsy shit
*/
class World{
	constructor(){
		this.entities = {};
	}

	update(dt){
		for(let [id, entity] in Object.entries(this.entities)){
			entity.update(dt);
		}
	}

	draw(){
		for(let [id, entity] in Object.entries(this.entities)){
			entity.draw();
		}
	}

	addEntity(entity){
		this.entities.push(entity);
	}

	removeEntity(id){
		delete this.entities[id]; // might cause issues idk
	}

	collisions(){
		// well obvs
	}
}

function draw(){
	
}

function update(){

}

function main(){
    update();
    draw();

	oldKeys = {...keys};
	mouseUpdate();
}

setInterval(main, 1000/60)
