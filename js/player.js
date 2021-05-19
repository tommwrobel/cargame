import { Colors, Dimensions } from './globals.js';

export var player;
var playerBox;
var mousePos = { x: 0, y: 0 };

var Player = function() {
	this.mesh = new THREE.Object3D();
	
	// Create the cabin
	var geomCockpit = new THREE.BoxGeometry(30, 10, 10, 1, 1, 1);
	var matCockpit = new THREE.MeshPhongMaterial({ color:Colors.red, flatShading: true });
	var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
	cockpit.receiveShadow = true;

	var geomRoof = new THREE.BoxGeometry(2, 8, 9, 1, 1, 1);
	var matRoof = new THREE.MeshPhongMaterial({ color:Colors.white, flatShading: true });
	var roof = new THREE.Mesh(geomRoof, matRoof);
	roof.position.set(4, 8, 0);
	roof.rotation.z = 0.2;
	roof.receiveShadow = true;

	var geomWheel = new THREE.CylinderGeometry(4, 4, 1, 16);
	var matWheel = new THREE.MeshPhongMaterial({ color:Colors.black, flatShading: true });
	var wheel01 = new THREE.Mesh(geomWheel, matWheel);
	var wheel02 = new THREE.Mesh(geomWheel, matWheel);
	var wheel03 = new THREE.Mesh(geomWheel, matWheel);
	var wheel04 = new THREE.Mesh(geomWheel, matWheel);

	wheel01.position.set(8, -6, 5);
	wheel02.position.set(8, -6, -5);
	wheel03.position.set(-8, -6, -5);
	wheel04.position.set(-8, -6, 5);

	wheel01.rotation.x = Math.PI / 2;
	wheel02.rotation.x = Math.PI / 2;
	wheel03.rotation.x = Math.PI / 2;
	wheel04.rotation.x = Math.PI / 2;

	this.mesh.add(cockpit);
	this.mesh.add(roof);
	this.mesh.add(wheel01);
	this.mesh.add(wheel02);
	this.mesh.add(wheel03);
	this.mesh.add(wheel04);
};

export function createPlayer(scene){ 
	player = new Player(Colors);
	playerBox = new THREE.Box3().setFromObject(player.mesh);
    player.mesh.position.x -= 100;
	scene.add(player.mesh);
}

export function updatePlayer() {
	var targetY = mousePos.y;

    // Move the car at each frame by adding a fraction of the remaining distance
	player.mesh.position.y += (targetY - player.mesh.position.y) * 0.1;

	//Rotate the car proportionally to the remaining distance
	player.mesh.rotation.z = (targetY - player.mesh.position.y) * 0.0128;
	player.mesh.rotation.x = (player.mesh.position.y - targetY) * 0.0064;

	//updating player collision box
	playerBox.setFromObject(player.mesh);
}

export function handleMouseClick(event) {
    let clickHeightPercentage = ((event.offsetY) / Dimensions.height) * 100;

    if (clickHeightPercentage <= 50 && player.mesh.position.y <  45) {
        mousePos.y += 40;
    }

    if (clickHeightPercentage > 50 && player.mesh.position.y > -45) {
        mousePos.y -= 40;
    };
}

export function checkCollisions(objects, scene) {
	objects.forEach((object, index, objects) => {
		if (object != null) {
			let objectBox = new THREE.Box3().setFromObject(object.mesh);
			console.log(object);

			if (playerBox.intersectsBox(objectBox)) {
				document.getElementById(object.type).innerHTML = parseInt(document.getElementById(object.type).innerHTML) + 1;
				scene.remove(object.mesh);
	
				objects[index] = null;
				console.log(index);
			}
		}
    });
}